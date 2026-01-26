"use client";

import "@/styles/components/loading-spinner.scss";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function LoadingSpinner({
  size = "medium",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner ${size} ${className}`}>
      <div className="spinner-ring">
        <div className="spinner-inner" />
      </div>
    </div>
  );
}
