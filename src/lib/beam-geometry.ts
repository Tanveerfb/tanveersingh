/** Where the beam starts and ends in its 600 × 200 drawing. */
export const BEAM_START_X = 50;
export const BEAM_END_X = 560;
const CENTRE_Y = 100;
const LENGTH = BEAM_END_X - BEAM_START_X;

const round = (value: number) => Math.round(value * 100) / 100;

/** The points of one beam layer: a taper from the orb, with rippling edges. */
export function beamEdge(half: number, amplitude: number, frequency: number, phase: number): string {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = BEAM_START_X; x <= BEAM_END_X; x += 10) {
    const k = (x - BEAM_START_X) / LENGTH;
    const offset = half * (0.55 + 0.45 * k) + Math.sin(x / frequency + phase) * amplitude;
    top.push(`${x},${round(CENTRE_Y - offset)}`);
    bottom.unshift(`${x},${round(CENTRE_Y + offset)}`);
  }
  return [...top, ...bottom].join(" ");
}

/** The spiral that runs through the beam's core, as an SVG path. */
export function beamSpiral(): string {
  let path = `M${BEAM_START_X} ${CENTRE_Y}`;
  for (let x = BEAM_START_X; x <= BEAM_END_X; x += 6) {
    path += ` L${x} ${round(CENTRE_Y + Math.sin(x / 12) * 14 * ((x - BEAM_START_X) / LENGTH + 0.3))}`;
  }
  return path;
}
