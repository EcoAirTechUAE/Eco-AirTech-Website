import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  CONTAMINANT,
  CONTAMINANT_ALPHA,
  drawOrganism,
  SPECIES,
  type Species,
} from "@/lib/organisms";

/**
 * Ambient illustration of what the unit actually does, in one loop:
 *
 *   1. Ambient humidity and oxygen drift in the room and are drawn toward the
 *      unit.                                    (intake)
 *   2. Inside, UV energy across the ARC® catalytic cell converts them:
 *        O₃ + UV → O₂ + O(¹D),  then  O(¹D) + H₂O → 2 •OH
 *      so hydroxyls always leave as a *pair*.   (reaction)
 *   3. They leave the outlet as a plume and travel out into the space.
 *   4. They find contaminants and break them apart.
 *   5. They expire after a second or so, which is the entire argument for a
 *      system that never switches off.
 *
 * The emission point is measured from the real device element rather than
 * hardcoded, so it stays on the unit when the layout reflows and when the
 * columns stack on a phone.
 *
 * Decorative, so it is hidden from assistive technology and removed entirely
 * under prefers-reduced-motion. It also stops when scrolled out of view or
 * when the tab is hidden.
 */

interface Precursor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0 = drifting, 1 = being drawn in. */
  drawn: number;
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
  /** Seconds spent in the outlet stream before it starts hunting. */
  streaming: number;
}

interface Contaminant {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // body radius
  rot: number;
  spin: number; // radians per second
  species: Species;
  seed: number; // stable per-instance shape variation
  life: number; // 1 = intact; falls to 0 while breaking down
}

/** Debris thrown off when one is broken apart. */
interface Fragment {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

interface Flash {
  x: number;
  y: number;
  r: number;
  a: number;
  /** Tints the ring: intake is green, a kill is brighter. */
  kind: "intake" | "kill";
}

const SENSE_RADIUS = 300;
const DISSOLVE_SECONDS = 1.1;

const FADE_IN = 0.5;
const FADE_OUT = 1.4;

/** How close a precursor must get before the cell consumes it. */
const INTAKE_RADIUS = 34;
/** Distance over which the intake starts to pull. */
const INTAKE_REACH = 230;

/** Seconds the pair travels with the outlet stream before it starts hunting. */
const STREAM_SECONDS = 0.55;

export function HydroxylField({
  className,
  density = 1,
  opacity = 1,
  sourceRef,
}: {
  className?: string;
  density?: number;
  opacity?: number;
  /**
   * The element the hydroxyls should stream out of, normally the product
   * render. Falls back to the right-hand side of the canvas if absent, so the
   * component still works anywhere it is dropped in.
   */
  sourceRef?: RefObject<HTMLElement | null>;
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

    const precursors: Precursor[] = [];
    const hydroxyls: Hydroxyl[] = [];
    const contaminants: Contaminant[] = [];
    const fragments: Fragment[] = [];
    const flashes: Flash[] = [];
    let maxHydroxyls = 8;
    /** Hydroxyls kept alive out in the room, independent of the plume. */
    let ambientFloor = 3;

    /* The outlet: where the plume starts and which way it points. */
    let srcX = 0;
    let srcY = 0;
    let dirX = -1;
    let dirY = 0.18;
    let plumeLen = 240;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    /**
     * Locates the outlet on the device element.
     *
     * The render is a long horizontal unit, so the plume should leave from its
     * inboard end and blow across the page rather than from dead centre. If
     * the device sits on the right of the canvas the stream runs left, and
     * vice versa, which keeps it pointing into the open part of the layout
     * however the columns are arranged.
     */
    function locateSource() {
      const el = sourceRef?.current;
      if (!el) {
        srcX = w * 0.78;
        srcY = h * 0.52;
        dirX = -1;
        dirY = 0.18;
        plumeLen = Math.min(w * 0.42, 320);
        return;
      }

      const pr = parent!.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const cx = er.left - pr.left + er.width / 2;
      const cy = er.top - pr.top + er.height / 2;

      // Blow toward whichever side has more room.
      const toLeft = cx > w / 2;
      srcX = cx + (toLeft ? -er.width * 0.3 : er.width * 0.3);
      srcY = cy + er.height * 0.06;
      dirX = toLeft ? -1 : 1;
      dirY = 0.18;

      const span = Math.hypot(dirX, dirY) || 1;
      dirX /= span;
      dirY /= span;

      plumeLen = Math.min(toLeft ? srcX : w - srcX, 340);
    }

    function respawnPrecursor(p: Precursor) {
      p.x = rand(0, w);
      p.y = rand(0, h);
      p.vx = rand(-9, 9);
      p.vy = rand(-7, 7);
      p.r = rand(1.1, 2.1);
      p.drawn = 0;
    }

    function respawnContaminant(c: Contaminant) {
      // Keep them out in the room rather than on top of the outlet, so there
      // is somewhere for the hydroxyls to travel to.
      do {
        c.x = rand(0, w);
        c.y = rand(0, h);
      } while (Math.hypot(c.x - srcX, c.y - srcY) < INTAKE_RADIUS * 3);
      c.vx = rand(-11, 11);
      c.vy = rand(-8, 8);
      c.r = rand(8, 13);
      c.rot = rand(0, Math.PI * 2);
      c.spin = rand(-0.34, 0.34);
      c.species = SPECIES[Math.floor(Math.random() * SPECIES.length)];
      c.seed = rand(0, Math.PI * 2);
      c.life = 1;
    }

    /**
     * A hydroxyl already out in the room rather than one just emitted.
     *
     * The unit is not the only thing on the page and the plume cannot reach
     * every corner of it, so without these the far side of the hero had
     * contaminants drifting untouched. Spawned mid-life and already hunting,
     * so they read as part of the same continuous population.
     */
    function spawnAmbient() {
      if (hydroxyls.length >= maxHydroxyls) return;
      const life = rand(7, 10.5);
      hydroxyls.push({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-16, 16),
        vy: rand(-12, 12),
        size: rand(34, 58),
        pulse: rand(0, Math.PI * 2),
        age: rand(0.6, life * 0.5),
        life,
        streaming: 0,
      });
    }

    /** Tears one apart: debris spun off in a ring from the point of contact. */
    function shatter(c: Contaminant) {
      const n = c.species === "bacterium" ? 7 : 6;
      for (let i = 0; i < n; i++) {
        const ang = rand(0, Math.PI * 2);
        const speed = rand(18, 52);
        fragments.push({
          x: c.x,
          y: c.y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          r: rand(0.7, 1.9),
          a: rand(0.35, 0.6),
        });
      }
    }

    function seed() {
      const area = w * h;
      maxHydroxyls = Math.round(Math.min(26, Math.max(12, area / 46000)) * density);
      // Roughly half the population is ambient, leaving room for the plume to
      // keep emitting without immediately hitting the ceiling.
      ambientFloor = Math.max(5, Math.round(maxHydroxyls * 0.6));

      precursors.length = 0;
      const pCount = Math.round(Math.min(18, Math.max(7, area / 55000)) * density);
      for (let i = 0; i < pCount; i++) {
        const p: Precursor = { x: 0, y: 0, vx: 0, vy: 0, r: 0, drawn: 0 };
        respawnPrecursor(p);
        precursors.push(p);
      }

      contaminants.length = 0;
      // Fewer than the old dots: these are far larger, and the section has to
      // stay a background behind a headline rather than become a diagram.
      const cCount = Math.round(Math.min(20, Math.max(9, area / 46000)) * density);
      for (let i = 0; i < cCount; i++) {
        const c: Contaminant = {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          r: 0,
          rot: 0,
          spin: 0,
          species: "virus",
          seed: 0,
          life: 1,
        };
        respawnContaminant(c);
        contaminants.push(c);
      }

      hydroxyls.length = 0;
      fragments.length = 0;
      flashes.length = 0;

      // Start with the room already populated and the outlet already running.
      //
      // Seeding empty meant the first seconds of the page showed contaminants
      // and nothing acting on them, and the plume only appeared once a
      // precursor happened to reach the cell. The claim is that this runs
      // continuously, so it should be mid-cycle the moment the page paints.
      for (let i = 0; i < ambientFloor; i++) spawnAmbient();
      emitPair();
      sinceEmit = 0;
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
      locateSource();
      seed();
    }

    function wrap(p: { x: number; y: number }, pad: number) {
      if (p.x < -pad) p.x = w + pad;
      if (p.x > w + pad) p.x = -pad;
      if (p.y < -pad) p.y = h + pad;
      if (p.y > h + pad) p.y = -pad;
    }

    /**
     * O(¹D) + H₂O → 2 •OH. Always a pair, and both leave along the outlet
     * stream rather than in opposite directions: they are being carried out
     * by the airflow, not scattering from a collision in open air.
     */
    function emitPair() {
      for (let i = 0; i < 2; i++) {
        if (hydroxyls.length >= maxHydroxyls) break;
        const spread = rand(-0.42, 0.42);
        const cos = Math.cos(spread);
        const sin = Math.sin(spread);
        const vx = (dirX * cos - dirY * sin) * rand(52, 76);
        const vy = (dirX * sin + dirY * cos) * rand(52, 76);
        hydroxyls.push({
          x: srcX + rand(-7, 7),
          y: srcY + rand(-9, 9),
          vx,
          vy,
          size: rand(34, 58),
          pulse: rand(0, Math.PI * 2),
          age: 0,
          life: rand(7, 10.5),
          streaming: STREAM_SECONDS * rand(0.75, 1.25),
        });
      }
      flashes.push({ x: srcX, y: srcY, r: 3, a: 0.5, kind: "intake" });
    }

    /** Soft cone at the outlet, so the stream reads as coming out of the unit. */
    function drawPlume(t: number) {
      const breathe = 0.82 + Math.sin(t * 1.25) * 0.18;
      const nx = -dirY;
      const ny = dirX;
      const tipX = srcX + dirX * plumeLen * breathe;
      const tipY = srcY + dirY * plumeLen * breathe;
      const halfAt = plumeLen * 0.3 * breathe;

      const grad = ctx!.createLinearGradient(srcX, srcY, tipX, tipY);
      grad.addColorStop(0, "rgba(120, 225, 200, 0.20)");
      grad.addColorStop(0.35, "rgba(120, 225, 200, 0.085)");
      grad.addColorStop(1, "rgba(120, 225, 200, 0)");

      ctx!.globalCompositeOperation = "lighter";
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.moveTo(srcX + nx * 5, srcY + ny * 5);
      ctx!.lineTo(tipX + nx * halfAt, tipY + ny * halfAt);
      ctx!.lineTo(tipX - nx * halfAt, tipY - ny * halfAt);
      ctx!.lineTo(srcX - nx * 5, srcY - ny * 5);
      ctx!.closePath();
      ctx!.fill();

      // The cell itself, glowing behind the plume.
      const core = ctx!.createRadialGradient(srcX, srcY, 0, srcX, srcY, 34 * breathe);
      core.addColorStop(0, "rgba(180, 245, 220, 0.30)");
      core.addColorStop(1, "rgba(150, 235, 205, 0)");
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(srcX, srcY, 34 * breathe, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalCompositeOperation = "source-over";
    }

    let sinceEmit = 0;

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

      // ---- 1. The outlet plume -------------------------------------------
      drawPlume(t);

      // ---- 2. Precursors: humidity and oxygen drawn into the cell ---------
      for (const p of precursors) {
        const dx = srcX - p.x;
        const dy = srcY - p.y;
        const d = Math.hypot(dx, dy) || 1;

        if (d < INTAKE_REACH) {
          // Pull hardest closest in, so the intake reads as suction rather
          // than as a uniform drift toward a point.
          const pull = (1 - d / INTAKE_REACH) ** 2 * 190;
          p.vx += (dx / d) * pull * dt;
          p.vy += (dy / d) * pull * dt;
          p.drawn = Math.min(1, p.drawn + dt * 2.2);
        } else {
          p.drawn = Math.max(0, p.drawn - dt);
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Consumed by the cell: this is the reaction that makes the pair.
        if (d < INTAKE_RADIUS) {
          if (hydroxyls.length < maxHydroxyls - 1 && sinceEmit > 0.32) {
            emitPair();
            sinceEmit = 0;
          }
          respawnPrecursor(p);
          continue;
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 120) {
          p.vx = (p.vx / speed) * 120;
          p.vy = (p.vy / speed) * 120;
        }

        wrap(p, 10);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${170 + p.drawn * 40}, ${205 + p.drawn * 40}, ${185 + p.drawn * 35}, ${0.22 + p.drawn * 0.42})`;
        ctx!.fill();
      }

      sinceEmit += dt;
      // Keep the stream going even if no precursor happens to arrive.
      if (sinceEmit > 0.75 && hydroxyls.length < maxHydroxyls - 1) {
        emitPair();
        sinceEmit = 0;
      }

      // Top the room back up as they expire, so the far side of the hero
      // never runs empty while the plume is busy near the unit.
      if (hydroxyls.length < ambientFloor) spawnAmbient();

      // ---- 3. Contaminants: virus, bacterium, mould spore -----------------
      for (const c of contaminants) {
        if (c.life < 1) {
          c.life -= dt / DISSOLVE_SECONDS;
          if (c.life <= 0) {
            respawnContaminant(c);
            continue;
          }
        }
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.rot += c.spin * dt;
        wrap(c, c.r * 3);

        // Dying: shrinks a little, spins up as it comes apart, and fades.
        const dying = c.life < 1;
        const scale = dying ? 0.72 + c.life * 0.28 : 1;
        const alpha = dying ? c.life * CONTAMINANT_ALPHA : CONTAMINANT_ALPHA;
        if (dying) c.rot += dt * (1 - c.life) * 2.6;

        ctx!.save();
        ctx!.translate(c.x, c.y);
        ctx!.rotate(c.rot);
        const r = c.r * scale;
        drawOrganism(ctx!, c.species, r, c.seed, alpha);
        ctx!.restore();
      }

      // ---- 3b. Debris from the ones that have been broken apart -----------
      for (let i = fragments.length - 1; i >= 0; i--) {
        const f = fragments[i];
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.vx *= 1 - 1.7 * dt;
        f.vy *= 1 - 1.7 * dt;
        f.a -= dt * 0.75;
        if (f.a <= 0) {
          fragments.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${CONTAMINANT}, ${f.a})`;
        ctx!.fill();
      }

      // ---- 4. Hydroxyls: stream out, then seek, break down and expire ------
      for (let i = hydroxyls.length - 1; i >= 0; i--) {
        const hx = hydroxyls[i];
        hx.age += dt;
        if (hx.age >= hx.life) {
          hydroxyls.splice(i, 1);
          continue;
        }

        if (hx.streaming > 0) {
          // Still being carried by the airflow: coast, and bleed off speed so
          // the hand-off into hunting is not an abrupt change of pace.
          hx.streaming -= dt;
          hx.vx *= 1 - 0.9 * dt;
          hx.vy *= 1 - 0.9 * dt;
        } else {
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
            hx.vx += (dx / d) * 62 * dt;
            hx.vy += (dy / d) * 62 * dt;
            // Contact is measured against the organism's own body, not a
            // fixed radius: a bacterium is nearly twice the reach of a spore,
            // and a shared number made the hit land visibly short on one and
            // late on the other.
            const reach = target.r * (target.species === "bacterium" ? 2.4 : 1.6) + 8;
            if (d < reach) {
              target.life = 0.999;
              shatter(target);
              flashes.push({ x: target.x, y: target.y, r: target.r, a: 0.55, kind: "kill" });
            }
          }

          const speed = Math.hypot(hx.vx, hx.vy);
          if (speed > 58) {
            hx.vx = (hx.vx / speed) * 58;
            hx.vy = (hx.vy / speed) * 58;
          }
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

      // ---- 5. Reaction rings ----------------------------------------------
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.r += dt * (f.kind === "kill" ? 70 : 46);
        f.a -= dt * 1.5;
        if (f.a <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.strokeStyle =
          f.kind === "kill" ? `rgba(74, 222, 128, ${f.a})` : `rgba(140, 235, 210, ${f.a * 0.8})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    // The render loads after first paint and changes height when it does, so
    // watch it too rather than measuring the outlet once against a gap.
    if (sourceRef?.current) ro.observe(sourceRef.current);

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
  }, [reduced, density, sourceRef]);

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
