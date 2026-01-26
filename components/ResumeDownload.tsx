"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import "@/styles/components/resume-download.scss";

export default function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would download a real PDF
      toast.success("Resume downloaded successfully!");
      
      // For demo, we'll just show a message
      console.log("Resume download initiated");
    } catch (error) {
      toast.error("Failed to download resume");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.button
      className="resume-download-btn"
      onClick={handleDownload}
      disabled={isDownloading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaDownload className="download-icon" />
      <span>{isDownloading ? "Downloading..." : "Download Resume"}</span>
      <div className="btn-glow" />
    </motion.button>
  );
}
