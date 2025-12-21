import React, { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["var(--accent)", "var(--accent-alt)", "var(--accent)"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {showBorder && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundSize: "300% 100%",
            animationName: "gradientShift",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            ...gradientStyle,
            opacity: 0.35,
          }}
        />
      )}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: "transparent",
          backgroundSize: "300% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          animationName: "gradientShift",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          ...gradientStyle,
        }}
      >
        {children}
      </span>
    </span>
  );
}
