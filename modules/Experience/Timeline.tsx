"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import siteData from "@/content/siteData.json";
import "@/styles/features/timeline.scss";

export default function Timeline() {
  return (
    <div className="timeline-container">
      <h2 className="section-heading">Professional Journey</h2>
      <div className="timeline">
        {siteData.experience.map((exp, index) => (
          <TimelineItem key={index} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  experience: {
    company?: string;
    role: string;
    date: string;
    location: string;
    responsibilities: string[];
  };
  index: number;
}

function TimelineItem({ experience, index }: TimelineItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${isLeft ? "left" : "right"} ${
        inView ? "visible" : ""
      }`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="timeline-marker">
        <div className="timeline-dot" />
      </div>
      <div className="timeline-content">
        <div className="timeline-date">{experience.date}</div>
        {experience.company && (
          <h3 className="timeline-company">{experience.company}</h3>
        )}
        <h4 className="timeline-role">{experience.role}</h4>
        <p className="timeline-location">{experience.location}</p>
        <ul className="timeline-responsibilities">
          {experience.responsibilities.slice(0, 3).map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
