"use client";

import { useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import siteData from "@/content/siteData.json";
import { getCSSVar } from "@/lib/utils";
import "@/styles/features/skills-radar.scss";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function SkillsRadar() {
  const chartRef = useRef(null);

  // Calculate skill scores based on number of items in each category
  const skillCategories = {
    "Web Dev": siteData.skills.web.length + siteData.skills.frameworks.length,
    Backend: siteData.skills.backend.length + siteData.skills.databases.length,
    Cloud: 8,
    "Microsoft 365": siteData.skills.microsoft365.length,
    "Content Creation": siteData.skills["Content Creation"].length,
  };

  // Normalize scores to 0-100 scale
  const maxScore = Math.max(...Object.values(skillCategories));
  const normalizedData = Object.values(skillCategories).map(
    (score) => (score / maxScore) * 100,
  );

  const accentAlt = getCSSVar("--accent-alt", "#00eaff");
  const accent = getCSSVar("--accent", "#ffe600");
  const textMuted = getCSSVar("--text-muted", "#9aa0a6");
  const text = getCSSVar("--text", "#e8e8e8");
  const border = getCSSVar("--border", "#2a2a2d");
  const panel = getCSSVar("--panel", "#1a1a1c");
  const glowStrong = getCSSVar("--glow-strong", "rgba(0, 234, 255, 0.45)");

  const data = {
    labels: Object.keys(skillCategories),
    datasets: [
      {
        label: "Skill Level",
        data: normalizedData,
        backgroundColor: glowStrong,
        borderColor: accentAlt,
        borderWidth: 2,
        pointBackgroundColor: accent,
        pointBorderColor: text,
        pointHoverBackgroundColor: text,
        pointHoverBorderColor: accentAlt,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: textMuted,
          backdropColor: "transparent",
        },
        grid: {
          color: border,
        },
        pointLabels: {
          color: text,
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: panel,
        borderColor: border,
        borderWidth: 1,
        titleColor: accent,
        bodyColor: text,
        padding: 12,
        displayColors: false,
      },
    },
  };

  return (
    <div className="skills-radar-container">
      <h2 className="skills-radar-title">Skills Overview</h2>
      <div
        className="skills-radar-chart"
        role="img"
        aria-label="Radar chart showing skill levels across Web Dev, Backend, Cloud, Microsoft 365, and Content Creation"
      >
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
