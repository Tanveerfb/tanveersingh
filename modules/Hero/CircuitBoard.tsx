import type { JSX } from "react";

/*
 * Live PCB: a central die with data packets flowing along radiating traces.
 * Animated traces use pathLength="100" so the dash loop is seamless regardless
 * of real geometry. Only a subset of traces carry a moving packet (perf).
 */

const PRIMARY = [
  { d: "M 188,190 V 110 H 70 V 50", node: [70, 50], dur: 3.4, delay: 0, packet: true },
  { d: "M 260,228 H 340 V 110", node: [340, 110], dur: 4.0, delay: 0.7, packet: true },
  { d: "M 208,310 V 400 H 80 V 460", node: [80, 460], dur: 3.8, delay: 1.3, packet: true },
  { d: "M 260,268 H 310 V 430 H 360", node: [360, 430], dur: 4.6, delay: 0, packet: false },
  { d: "M 140,238 H 50 V 150", node: [50, 150], dur: 4.2, delay: 0, packet: false },
] as const;

const SECONDARY = [
  "M 228,190 V 140 H 300 V 90",
  "M 140,258 H 100 V 330",
  "M 208,310 V 352 H 356",
  "M 260,248 H 292 V 204",
] as const;

// Chip pin stubs (top, bottom, left, right) — short connector legs.
const PIN_X = [165, 185, 205, 225];
const PIN_Y = [218, 238, 258, 278];

export default function CircuitBoard(): JSX.Element {
  return (
    <svg
      className="circuit-svg"
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* HUD corner brackets */}
      <g className="circuit-corners">
        <path d="M 8,28 V 8 H 28" />
        <path d="M 372,8 H 392 V 28" />
        <path d="M 392,472 V 492 H 372" />
        <path d="M 28,492 H 8 V 472" />
      </g>

      {/* Secondary traces (dim depth layer) */}
      {SECONDARY.map((d) => (
        <path key={d} className="trace trace--secondary" d={d} />
      ))}

      {/* Primary traces + flowing packets */}
      {PRIMARY.map((t) => (
        <g key={t.d}>
          <path className="trace trace--primary" d={t.d} />
          {t.packet && (
            <path
              className="trace trace--packet"
              d={t.d}
              pathLength={100}
              style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
            />
          )}
          <circle
            className={t.packet ? "node node--endpoint" : "node node--static"}
            cx={t.node[0]}
            cy={t.node[1]}
            r={4.5}
            style={t.packet ? { animationDelay: `${t.delay}s` } : undefined}
          />
        </g>
      ))}

      {/* Chip pin legs */}
      <g className="chip-pins">
        {PIN_X.map((x) => (
          <line key={`pt-${x}`} x1={x} y1={200} x2={x} y2={190} />
        ))}
        {PIN_X.map((x) => (
          <line key={`pb-${x}`} x1={x} y1={300} x2={x} y2={310} />
        ))}
        {PIN_Y.map((y) => (
          <line key={`pl-${y}`} x1={150} y1={y} x2={140} y2={y} />
        ))}
        {PIN_Y.map((y) => (
          <line key={`pr-${y}`} x1={250} y1={y} x2={260} y2={y} />
        ))}
      </g>

      {/* Central die */}
      <rect className="chip-body" x={150} y={200} width={100} height={100} rx={4} />
      <rect className="chip-die" x={168} y={218} width={64} height={64} rx={2} />
      <circle className="chip-core" cx={200} cy={236} r={5} />
      <text className="chip-label" x={200} y={266} textAnchor="middle">
        TS//01
      </text>
    </svg>
  );
}
