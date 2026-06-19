"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  return (
    <section className="hero" aria-label="Introduction">
      <motion.div
        className="hero-identity"
        variants={container}
        initial="hidden"
        animate="show"
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

      <div className="hero-circuit-panel" aria-hidden="true">
        <CircuitBoard />
      </div>
    </section>
  );
}
