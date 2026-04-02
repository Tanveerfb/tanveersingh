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

  const data = {
    labels: Object.keys(skillCategories),
    datasets: [
      {
        label: "Skill Level",
        data: normalizedData,
        backgroundColor: "rgba(0, 234, 255, 0.2)",
        borderColor: "rgba(0, 234, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 230, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 234, 255, 1)",
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
          color: "#9aa0a6",
          backdropColor: "transparent",
        },
        grid: {
          color: "#2a2a2d",
        },
        pointLabels: {
          color: "#e8e8e8",
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
        backgroundColor: "#1a1a1c",
        borderColor: "#2a2a2d",
        borderWidth: 1,
        titleColor: "#ffe600",
        bodyColor: "#e8e8e8",
        padding: 12,
        displayColors: false,
      },
    },
  };

  return (
    <div className="skills-radar-container">
      <h2 className="skills-radar-title">Skills Overview</h2>
      <div className="skills-radar-chart">
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
