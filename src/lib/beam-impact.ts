export type BeamColors = { ink: string; paper: string; ki: string; pale: string; white: string; hi: string; orange: string };

export type BeamTiming = { charge: number; travel: number; end: number; impactFrame: number };

type BeamFrame = {
  width: number;
  height: number;
  /** Milliseconds since firing began. */
  t: number;
  timing: BeamTiming;
  colors: BeamColors;
  /** The sound effect's font family. */
  sfxFont: string;
};

const SPEED_LINES = 34;
const GATHER_SPECKS = 16;
const SFX = "ドン!";

const easeOut = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number, inner: number, rotation: number): void {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = rotation + (i * Math.PI) / points;
    const r = i % 2 ? radius * inner : radius;
    ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
  }
  ctx.closePath();
}

/**
 * One frame of the impact-frame beam: specks gather into the orb, two single inverted frames as it
 * fires, then hard cel bands, radiating speed lines and a ドン. The frame at `timing.end` is the
 * final still, drawn alone under reduced motion.
 */
export function drawImpactBeam(ctx: CanvasRenderingContext2D, { width, height, t, timing, colors, sfxFont }: BeamFrame): void {
  const cy = height / 2;
  const originX = Math.max(height * 0.3, 44);
  const tipX = width - height * 0.42;
  const orbRadius = height * 0.19;
  const progress = easeOut((t - timing.charge) / timing.travel);
  const headX = originX + (tipX - originX) * progress;
  const sinceFire = t - timing.charge;

  // 1: black frame, white beam. 2: paper frame, black beam. 0: the normal drawing.
  const flash = sinceFire >= 0 && sinceFire < timing.impactFrame ? 1 : sinceFire >= timing.impactFrame && sinceFire < timing.impactFrame * 2 ? 2 : 0;
  if (flash) {
    ctx.fillStyle = flash === 1 ? colors.ink : colors.paper;
    ctx.fillRect(0, 0, width, height);
  }

  if (sinceFire > 0) {
    ctx.fillStyle = flash === 2 ? colors.ink : colors.paper;
    ctx.globalAlpha = flash ? 1 : 0.22;
    const reach = width * 1.3;
    for (let i = 0; i < SPEED_LINES; i++) {
      const angle = (i / SPEED_LINES) * Math.PI * 2 + 0.08;
      const spread = 0.022 + (i % 3) * 0.01;
      ctx.beginPath();
      ctx.moveTo(originX + Math.cos(angle) * orbRadius * 1.5, cy + Math.sin(angle) * orbRadius * 1.5);
      ctx.lineTo(originX + Math.cos(angle - spread) * reach, cy + Math.sin(angle - spread) * reach);
      ctx.lineTo(originX + Math.cos(angle + spread) * reach, cy + Math.sin(angle + spread) * reach);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  const charging = t / timing.charge;
  if (charging < 1) {
    for (let i = 0; i < GATHER_SPECKS; i++) {
      const angle = i * 2.399;
      const distance = (1 - ((charging * 1.6 + i * 0.13) % 1)) * height * 0.6 + orbRadius * 0.6;
      ctx.beginPath();
      ctx.arc(originX + Math.cos(angle) * distance, cy + Math.sin(angle) * distance * 0.7, 2.2 + (i % 3), 0, Math.PI * 2);
      ctx.fillStyle = i % 2 ? colors.pale : colors.white;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = colors.ink;
      ctx.stroke();
    }
  }

  if (progress > 0) {
    const jitter = t < timing.end - 300 ? Math.sin(t * 0.05) * 1.2 : 0;
    const bands: Array<[number, string]> =
      flash === 1 ? [[0.23, colors.white]] : flash === 2 ? [[0.23, colors.ink]] : [[0.23, colors.ki], [0.16, colors.pale], [0.08, colors.white]];

    bands.forEach(([scale, color], index) => {
      const half = height * scale + jitter;
      const headHalf = half * (0.62 + 0.38 * ((headX - originX) / (tipX - originX)));
      ctx.beginPath();
      ctx.moveTo(originX, cy - half * 0.62);
      ctx.lineTo(headX, cy - headHalf);
      ctx.arc(headX, cy, headHalf, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(originX, cy + half * 0.62);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      if (index === 0 && !flash) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = colors.ink;
        ctx.stroke();
      }
    });

    if (!flash) {
      drawStar(ctx, headX + height * 0.06, cy, height * 0.36, 11, 0.42, 0.3);
      ctx.fillStyle = colors.hi;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = colors.ink;
      ctx.stroke();

      const fontSize = Math.round(height * 0.24 * easeOut((sinceFire - 200) / 160));
      if (fontSize > 3) {
        ctx.save();
        ctx.font = `900 ${fontSize}px ${sfxFont}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(3, fontSize * 0.12);
        ctx.strokeStyle = colors.ink;
        ctx.translate(tipX - height * 0.55, height * 0.19);
        ctx.rotate(-0.1);
        ctx.strokeText(SFX, 0, 0);
        ctx.fillStyle = colors.orange;
        ctx.fillText(SFX, 0, 0);
        ctx.restore();
      }
    }
  }

  // Inverted frames show only the beam; the orb returns with the normal drawing.
  if (!flash) {
    const radius = orbRadius * 1.1 * easeOut(charging);
    ([[1, colors.ki], [0.66, colors.pale], [0.36, colors.white]] as Array<[number, string]>).forEach(([scale, color], index) => {
      ctx.beginPath();
      ctx.arc(originX, cy, radius * scale, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (index === 0) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = colors.ink;
        ctx.stroke();
      }
    });
  }
}
