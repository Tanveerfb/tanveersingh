/** The ellipse an aura burns around, in canvas pixels. */
export type FlameBox = { cx: number; cy: number; rx: number; ry: number };

const TONGUES = 14;
const BASE_STEPS = 20;

/**
 * Draws one layer of the flowing aura: smooth flame tongues whose heights follow sine waves
 * (`t` in seconds), leaning by `lean` (-1 to 1) toward the cursor.
 */
export function drawFlowingFlame(
  ctx: CanvasRenderingContext2D,
  box: FlameBox,
  scale: number,
  color: string,
  t: number,
  phase: number,
  lean: number,
): void {
  ctx.beginPath();

  // Base: the lower half of the ellipse, left to right.
  for (let i = 0; i <= BASE_STEPS; i++) {
    const angle = Math.PI - (i / BASE_STEPS) * Math.PI;
    const x = box.cx + Math.cos(angle) * box.rx * scale;
    const y = box.cy + Math.sin(angle) * box.ry * scale * 0.55;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Tongues across the top, right to left, each a smooth curve to a swaying tip.
  for (let i = 0; i < TONGUES; i++) {
    const a0 = (i / TONGUES) * Math.PI;
    const a1 = ((i + 1) / TONGUES) * Math.PI;
    const mid = (a0 + a1) / 2;
    const up = Math.sin(mid);
    const wave = 0.55 + 0.45 * Math.sin(t * 2.2 + i * 1.7 + phase);
    const x0 = box.cx + Math.cos(a0) * box.rx * scale;
    const y0 = box.cy - Math.sin(a0) * box.ry * scale;
    const x1 = box.cx + Math.cos(a1) * box.rx * scale;
    const y1 = box.cy - Math.sin(a1) * box.ry * scale;
    const tipX = box.cx + Math.cos(mid) * box.rx * scale * 1.05 + (lean + Math.sin(t * 1.3 + i) * 0.25) * up * box.ry * 0.6;
    const tipY = box.cy - Math.sin(mid) * box.ry * scale - up * box.ry * scale * (0.5 + 1.1 * wave);
    ctx.bezierCurveTo(x0, y0 - box.ry * 0.35 * up, tipX + (x0 - tipX) * 0.2, tipY + box.ry * 0.3, tipX, tipY);
    ctx.bezierCurveTo(tipX + (x1 - tipX) * 0.2, tipY + box.ry * 0.3, x1, y1 - box.ry * 0.35 * up, x1, y1);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
