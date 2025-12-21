"use client";

import type { JSX } from "react";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <FuzzyText
        fontSize={"clamp(2rem, 8vw, 8rem)"}
        fontFamily="inherit"
        baseIntensity={0.2}
        hoverIntensity={1}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        fontSize={"clamp(2rem, 8vw, 8rem)"}
        fontFamily="inherit"
        baseIntensity={0.2}
        hoverIntensity={1}
        enableHover={true}
      >
        Not Found
      </FuzzyText>
    </div>
  );
}
