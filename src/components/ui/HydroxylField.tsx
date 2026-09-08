import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Ambient illustration of how nature actually makes hydroxyls, and what they
 * then do. It follows the real tropospheric mechanism rather than inventing
 * a look:
 *
 *   1. Sunlight in a narrow UV band (~290–310 nm) splits ozone,
 *      leaving an excited oxygen atom:   O₃ + UV → O₂ + O(¹D)
 *   2. That excited atom meets water vapour and yields *two* hydroxyls:
 *                                        O(¹D) + H₂O → 2 •OH
 *   3. The hydroxyls attack reduced trace gases and break them apart.
 *   4. They survive on the order of a second, so the process only holds
 *      while the light keeps making more of them.
 *
 * So: light shafts sweep, precursor molecules drift, a crossing spawns a
 * *pair* of hydroxyls, those hunt down contaminants, and then expire — which
 * is precisely the argument for a system that never switches off.
 *
 * Decorative, so it is hidden from assistive technology and removed entirely
 * under prefers-reduced-motion. It also stops when scrolled out of view or
 * when the tab is hidden.
 */

interface Shaft {
  x0: number; // x where the beam crosses y = 0
  tan: number; // horizontal drift per unit y
  half: number; // half-width in px
  phase: number;
  speed: number;
}

interface Precursor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  cooldown: number; // seconds before it can react again
}

interface Hydroxyl {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
  age: number;
  life: number;
}

interface Contaminant {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number; // 1 = intact; falls to 0 while breaking down
}

interface Flash {
  x: number;
  y: number;
  r: number;
  a: number;
}

const SENSE_RADIUS = 170;
const CAPTURE_RADIUS = 30;
const DISSOLVE_SECONDS = 0.7;
const FADE_IN = 0.7;
const FADE_OUT = 1.4;

export function HydroxylField({
  className,
  density = 1,
  opacity = 1,
}: {
  className?: string;
  density?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = new Image();
    let spriteReady = false;
    sprite.onload = () => {
      spriteReady = true;
    };
    sprite.src = "/assets/tech/hydroxyl.png";

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const shafts: Shaft[] = [];
    const precursors: Precursor[] = [];
    const hydroxyls: Hydroxyl[] = [];
    const contaminants: Contaminant[] = [];
    const flashes: Flash[] = [];
    let maxHydroxyls = 7;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    /** Horizontal centre of a beam at a given height. */
    const shaftX = (s: Shaft, y: number, t: number) =>
      s.x0 + s.tan * y + Math.sin(t * s.speed + s.phase) * (w * 0.06);

    function respawnPrecursor(p: Precursor) {
      p.x = rand(0, w);
      p.y = rand(0, h);
      p.vx = rand(-9, 9);
      p.vy = rand(-7, 7);
      p.r = rand(1.1, 2.1);
      p.cooldown = rand(0, 3);
    }

    function respawnContaminant(c: Contaminant) {
      c.x = rand(0, w);
      c.y = rand(0, h);
      c.vx = rand(-14, 14);
      c.vy = rand(-10, 10);
      c.r = rand(1.6, 3.4);
      c.life = 1;
    }

    function seed() {
      const area = w * h;
      maxHydroxyls = Math.round(Math.min(8, Math.max(3, area / 150000)) * density);

      shafts.length = 0;
      const shaftCount = w < 640 ? 2 : 3;
      for (let i = 0; i < shaftCount; i++) {
        shafts.push({
          x0: (w * (i + 0.5)) / shaftCount + rand(-w * 0.08, w * 0.08),
          tan: rand(0.16, 0.34),
          half: rand(w * 0.045, w * 0.075),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.05, 0.11),
        });
      }

      precursors.length = 0;
      const pCount = Math.round(Math.min(16, Math.max(6, area / 60000)) * density);
      for (let i = 0; i < pCount; i++) {
        const p: Precursor = { x: 0, y: 0, vx: 0, vy: 0, r: 0, cooldown: 0 };
        respawnPrecursor(p);
        precursors.push(p);
      }

      contaminants.length = 0;
      const cCount = Math.round(Math.min(22, Math.max(7, area / 30000)) * density);
      for (let i = 0; i < cCount; i++) {
        const c: Contaminant = { x: 0, y: 0, vx: 0, vy: 0, r: 0, life: 1 };
        respawnContaminant(c);
        contaminants.push(c);
      }

      hydroxyls.length = 0;
      flashes.length = 0;
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function wrap(p: { x: number; y: number }, pad: number) {
      if (p.x < -pad) p.x = w + pad;
      if (p.x > w + pad) p.x = -pad;
      if (p.y < -pad) p.y = h + pad;
      if (p.y > h + pad) p.y = -pad;
    }

    /** O(¹D) + H₂O → 2 •OH — always a pair, sent in opposite directions. */
    function createPair(x: number, y: number) {
      const angle = rand(0, Math.PI * 2);
      for (const dir of [1, -1]) {
        if (hydroxyls.length >= maxHydroxyls) break;
        hydroxyls.push({
          x,
          y,
          vx: Math.cos(angle) * 18 * dir,
          vy: Math.sin(angle) * 18 * dir,
          size: rand(34, 58),
          pulse: rand(0, Math.PI * 2),
          age: 0,
          life: rand(6.5, 10),
        });
      }
      flashes.push({ x, y, r: 3, a: 0.55 });
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      ctx!.clearRect(0, 0, w, h);

      // ---- 1. Light shafts (the UV that drives the whole reaction) --------
      ctx!.globalCompositeOperation = "lighter";
      for (const s of shafts) {
        const topX = shaftX(s, 0, t);
        const botX = shaftX(s, h, t);
        const grad = ctx!.createLinearGradient(topX, 0, botX, h);
        grad.addColorStop(0, "rgba(190, 240, 205, 0.055)");
        grad.addColorStop(0.55, "rgba(160, 230, 190, 0.028)");
        grad.addColorStop(1, "rgba(160, 230, 190, 0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.moveTo(topX - s.half, 0);
        ctx!.lineTo(topX + s.half, 0);
        ctx!.lineTo(botX + s.half * 1.5, h);
        ctx!.lineTo(botX - s.half * 1.5, h);
        ctx!.closePath();
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";

      // ---- 2. Precursors: water vapour and ozone awaiting a photon -------
      for (const p of precursors) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.cooldown -= dt;
        wrap(p, 10);

        let lit = false;
        for (const s of shafts) {
          const cx = shaftX(s, p.y, t);
          if (Math.abs(p.x - cx) < s.half) {
            lit = true;
            break;
          }
        }

        if (lit && p.cooldown <= 0 && hydroxyls.length < maxHydroxyls - 1) {
          createPair(p.x, p.y);
          p.cooldown = rand(6, 12);
          respawnPrecursor(p);
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = lit ? "rgba(200, 245, 215, 0.5)" : "rgba(160, 195, 175, 0.22)";
        ctx!.fill();
      }

      // ---- 3. Contaminants ------------------------------------------------
      for (const c of contaminants) {
        if (c.life < 1) {
          c.life -= dt / DISSOLVE_SECONDS;
          if (c.life <= 0) respawnContaminant(c);
        }
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        wrap(c, 12);

        const r = c.r * (c.life < 1 ? Math.max(c.life, 0) : 1);
        if (r > 0.1) {
          ctx!.beginPath();
          ctx!.arc(c.x, c.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(232, 163, 61, ${c.life * 0.7})`;
          ctx!.fill();
        }
      }

      // ---- 4. Hydroxyls: seek, break down, then expire --------------------
      for (let i = hydroxyls.length - 1; i >= 0; i--) {
        const hx = hydroxyls[i];
        hx.age += dt;
        if (hx.age >= hx.life) {
          hydroxyls.splice(i, 1);
          continue;
        }

        let target: Contaminant | null = null;
        let best = SENSE_RADIUS;
        for (const c of contaminants) {
          if (c.life < 1) continue;
          const d = Math.hypot(c.x - hx.x, c.y - hx.y);
          if (d < best) {
            best = d;
            target = c;
          }
        }

        if (target) {
          const dx = target.x - hx.x;
          const dy = target.y - hx.y;
          const d = Math.hypot(dx, dy) || 1;
          hx.vx += (dx / d) * 26 * dt;
          hx.vy += (dy / d) * 26 * dt;
          if (d < CAPTURE_RADIUS) {
            target.life = 0.999;
            flashes.push({ x: target.x, y: target.y, r: 4, a: 0.45 });
          }
        }

        const speed = Math.hypot(hx.vx, hx.vy);
        if (speed > 34) {
          hx.vx = (hx.vx / speed) * 34;
          hx.vy = (hx.vy / speed) * 34;
        }

        hx.x += hx.vx * dt;
        hx.y += hx.vy * dt;
        hx.pulse += dt * 1.4;
        wrap(hx, hx.size);

        // Fade in on creation, fade out as the radical is spent.
        const fadeIn = Math.min(hx.age / FADE_IN, 1);
        const remaining = hx.life - hx.age;
        const fadeOut = Math.min(remaining / FADE_OUT, 1);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut));

        const s = hx.size * (1 + Math.sin(hx.pulse) * 0.08) * (0.55 + 0.45 * fadeIn);

        ctx!.globalCompositeOperation = "lighter";
        if (spriteReady) {
          ctx!.globalAlpha = 0.85 * alpha;
          ctx!.drawImage(sprite, hx.x - s / 2, hx.y - s / 2, s, s);
          ctx!.globalAlpha = 1;
        } else {
          const g = ctx!.createRadialGradient(hx.x, hx.y, 0, hx.x, hx.y, s / 2);
          g.addColorStop(0, `rgba(190, 240, 255, ${0.5 * alpha})`);
          g.addColorStop(0.4, `rgba(120, 220, 245, ${0.22 * alpha})`);
          g.addColorStop(1, "rgba(120, 220, 245, 0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(hx.x, hx.y, s / 2, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalCompositeOperation = "source-over";
      }

      // ---- 5. Reaction rings ---------------------------------------------
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.r += dt * 70;
        f.a -= dt * 1.5;
        if (f.a <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(74, 222, 128, ${f.a})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) visible = false;
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, density]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
