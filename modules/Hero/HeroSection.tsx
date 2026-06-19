"use client";

import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import profile from "@/content/profile.json";

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
  const location = profile.location.split("/")[0].trim();

  return (
    <section className="hero" aria-label="Introduction">
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero-eyebrow" variants={rise}>
          {profile.role}&ensp;&mdash;&ensp;{location}
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
    </section>
  );
}
