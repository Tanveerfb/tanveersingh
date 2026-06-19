import type { JSX } from "react";

export default function CircuitBoard(): JSX.Element {
  return (
    <svg
      className="circuit-svg"
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Secondary traces (dim — depth layer) */}
      <path className="trace trace--secondary" d="M 160,60 V 120" />
      <path className="trace trace--secondary" d="M 300,200 V 320 H 360" />
      <path className="trace trace--secondary" d="M 30,240 H 80 V 320" />
      <path className="trace trace--secondary" d="M 360,380 V 460" />

      {/* Primary traces (cyan glow) */}
      <path
        className="trace trace--primary"
        d="M 30,120 H 160 V 200 H 300 V 140 H 380"
      />
      <path
        className="trace trace--primary trace--flicker"
        d="M 80,320 H 240 V 380 H 360"
      />

      {/* Data packet — same path as Trace A, short animated dash */}
      <path
        className="trace trace--primary trace--animated"
        d="M 30,120 H 160 V 200 H 300 V 140 H 380"
      />

      {/* Nodes */}
      <circle className="node node--pulse-1" cx="160" cy="120" r="5" />
      <circle className="node node--pulse-2" cx="300" cy="200" r="5" />
      <circle className="node" cx="160" cy="200" r="3" />
      <circle className="node" cx="300" cy="140" r="3" />
      <circle className="node" cx="80" cy="320" r="4" />
      <circle className="node" cx="240" cy="320" r="4" />
      <circle className="node node--pulse-3" cx="360" cy="380" r="5" />
    </svg>
  );
}
