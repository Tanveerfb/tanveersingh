import type { JSX } from "react";

const domains = [
  {
    name: "Web Applications",
    desc: "Next.js, Node.js, full-stack from DB to deploy",
  },
  {
    name: "Cloud & Firebase",
    desc: "Auth, Firestore, storage, Vercel hosting",
  },
  {
    name: "AI Integration",
    desc: "Local LLMs, RAG pipelines, vector embeddings",
  },
  {
    name: "Microsoft 365",
    desc: "Administration, automation, internal tooling",
  },
] as const;

export default function WhatIBuild(): JSX.Element {
  return (
    <section className="what-i-build" aria-labelledby="wib-heading">
      <p className="wib-label" id="wib-heading">
        // what i build
      </p>
      <div className="wib-grid">
        {domains.map((d) => (
          <div key={d.name} className="wib-tile">
            <span className="wib-prefix" aria-hidden="true">
              //
            </span>
            <span className="wib-name">{d.name}</span>
            <span className="wib-desc">{d.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
