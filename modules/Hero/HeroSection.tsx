"use client";

import type { JSX, PointerEvent } from "react";
import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import CircuitBoard from "@/modules/Hero/CircuitBoard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function HeroSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>): void {
    if (prefersReducedMotion) return;
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--tx", `${(x * 6).toFixed(2)}px`);
    el.style.setProperty("--ty", `${(y * 6).toFixed(2)}px`);
  }

  function handlePointerLeave(): void {
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  }

  return (
    <section className="hero" aria-label="Introduction">
      <motion.div
        className="hero-identity"
        variants={container}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? false : "show"}
      >
        <div className="hero-accent-rule" aria-hidden="true" />

        <motion.p className="hero-eyebrow" variants={rise}>
          tsingh&ensp;&middot;&ensp;Sydney, AU
        </motion.p>

        <motion.h1 className="hero-name" variants={rise}>
          Tanveer Singh
        </motion.h1>

        <motion.p className="hero-tagline" variants={rise}>
          Building reliable systems and web applications — end to end.
        </motion.p>

        <motion.div className="hero-actions" variants={rise}>
          <Link href="/portfolio" className="btn-primary">
            View My Work
          </Link>
          <Link href="/contact" className="btn-ghost">
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      <div
        ref={panelRef}
        className="hero-circuit-panel"
        aria-hidden="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <CircuitBoard />
      </div>
    </section>
  );
}
