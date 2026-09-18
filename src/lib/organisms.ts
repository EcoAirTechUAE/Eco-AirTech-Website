/**
 * The three contaminants, drawn as canvas paths.
 *
 * Shared by the hero field and the airflow diagram so a virus looks like the
 * same virus in both places. Artwork would have to be keyed off its own
 * background, would go soft on a high-DPR screen, and could not be torn apart
 * on contact; paths scale, take the palette, and animate.
 *
 * Each is drawn in a local space centred on the origin with the body radius
 * as the unit, so the caller owns position, rotation and scale.
 */

export type Species = "virus" | "bacterium" | "spore";

export const SPECIES: Species[] = ["virus", "bacterium", "spore"];

/**
 * Contaminants are drawn in a warm sand, and deliberately not in the brand
 * greens.
 *
 * The whole argument of the site is green = the answer, warm = the problem,
 * and that reading collapses if the thing being destroyed is the same colour
 * as the thing destroying it.
 */
export const CONTAMINANT = "226, 178, 118";

/** Base opacity of an intact organism. */
export const CONTAMINANT_ALPHA = 0.9;

export function drawVirus(ctx: CanvasRenderingContext2D, r: number, seed: number, a: number) {
  const spikes = 11;
  ctx.strokeStyle = `rgba(${CONTAMINANT}, ${a * 0.75})`;
  ctx.lineWidth = Math.max(1.1, r * 0.13);
  ctx.lineCap = "round";

  for (let i = 0; i < spikes; i++) {
    const ang = (i / spikes) * Math.PI * 2 + seed;
    const x0 = Math.cos(ang) * r;
    const y0 = Math.sin(ang) * r;
    const x1 = Math.cos(ang) * r * 1.42;
    const y1 = Math.sin(ang) * r * 1.42;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    // Knobbed tip, the detail that makes it read as a virus rather than a sun.
    ctx.beginPath();
    ctx.arc(x1, y1, r * 0.17, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.8})`;
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.2})`;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-r * 0.3, -r * 0.28, r * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.32})`;
  ctx.fill();
}

export function drawBacterium(ctx: CanvasRenderingContext2D, r: number, seed: number, a: number) {
  const len = r * 1.7;
  ctx.strokeStyle = `rgba(${CONTAMINANT}, ${a * 0.78})`;
  ctx.lineWidth = Math.max(1.1, r * 0.13);
  ctx.lineCap = "round";

  // Capsule body.
  ctx.beginPath();
  ctx.moveTo(-len, -r * 0.62);
  ctx.arcTo(len + r * 0.62, -r * 0.62, len + r * 0.62, 0, r * 0.62);
  ctx.arcTo(len + r * 0.62, r * 0.62, len, r * 0.62, r * 0.62);
  ctx.lineTo(-len, r * 0.62);
  ctx.arcTo(-len - r * 0.62, r * 0.62, -len - r * 0.62, 0, r * 0.62);
  ctx.arcTo(-len - r * 0.62, -r * 0.62, -len, -r * 0.62, r * 0.62);
  ctx.closePath();
  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.2})`;
  ctx.fill();
  ctx.stroke();

  // Flagella, trailing from one end.
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(-len - r * 0.6, side * r * 0.2);
    for (let i = 1; i <= 10; i++) {
      const p = i / 10;
      const x = -len - r * 0.6 - p * r * 2.1;
      const y = side * r * 0.2 + Math.sin(p * 7 + seed) * r * 0.42 * p;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${CONTAMINANT}, ${a * 0.42})`;
    ctx.stroke();
  }

  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.5})`;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc((i - 1) * r * 0.75, Math.sin(i * 2 + seed) * r * 0.22, r * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawSpore(ctx: CanvasRenderingContext2D, r: number, seed: number, a: number) {
  ctx.strokeStyle = `rgba(${CONTAMINANT}, ${a * 0.72})`;
  ctx.lineWidth = Math.max(1.1, r * 0.12);

  // Lobed, slightly irregular body: a spore is not a neat circle.
  ctx.beginPath();
  const steps = 26;
  for (let i = 0; i <= steps; i++) {
    const ang = (i / steps) * Math.PI * 2;
    const wob = 1 + Math.sin(ang * 5 + seed) * 0.11 + Math.sin(ang * 3 - seed) * 0.06;
    const x = Math.cos(ang) * r * wob;
    const y = Math.sin(ang) * r * wob;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.22})`;
  ctx.fill();
  ctx.stroke();

  // Granules inside, the giveaway that it is a spore and not a cell.
  ctx.fillStyle = `rgba(${CONTAMINANT}, ${a * 0.45})`;
  for (let i = 0; i < 5; i++) {
    const ang = seed + i * 2.4;
    const rad = r * (0.2 + ((i * 37) % 10) / 22);
    ctx.beginPath();
    ctx.arc(Math.cos(ang) * rad, Math.sin(ang) * rad, r * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Dispatches to the right drawing for a species. */
export function drawOrganism(
  ctx: CanvasRenderingContext2D,
  species: Species,
  r: number,
  seed: number,
  a: number,
) {
  if (species === "virus") drawVirus(ctx, r, seed, a);
  else if (species === "bacterium") drawBacterium(ctx, r, seed, a);
  else drawSpore(ctx, r, seed, a);
}
