/**
 * One layer of the card crest: smooth flame tongues from base to tip, as an SVG path.
 * Seeded, so the server and the client draw the same flames.
 */
export function flamePath(width: number, height: number, tongues: number, heightScale: number, seed: number): string {
  let state = seed;
  const next = () => (state = (state * 9301 + 49297) % 233280) / 233280;
  const round = (value: number) => Math.round(value * 100) / 100;

  const step = width / tongues;
  let path = `M0 ${height}`;
  for (let i = 0; i < tongues; i++) {
    const x0 = i * step;
    const x1 = x0 + step;
    const tipX = x0 + step * (0.35 + next() * 0.3);
    const tipY = height - height * heightScale * (0.45 + next() * 0.55);
    path += ` C ${round(x0 + step * 0.1)} ${round(height * 0.55)}, ${round(tipX - step * 0.25)} ${round(tipY + height * 0.25)}, ${round(tipX)} ${round(tipY)}`;
    path += ` C ${round(tipX + step * 0.2)} ${round(tipY + height * 0.3)}, ${round(x1 - step * 0.1)} ${round(height * 0.6)}, ${round(x1)} ${height}`;
  }
  return `${path} Z`;
}
