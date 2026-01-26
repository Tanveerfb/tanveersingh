"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-KONAMI_CODE.length);
        
        if (newKeys.join(",") === KONAMI_CODE.join(",")) {
          callback();
          return [];
        }
        
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}

export default function KonamiCode() {
  const [activated, setActivated] = useState(false);

  const activate = () => {
    if (activated) return;
    
    setActivated(true);
    toast.success("🎮 Konami Code Activated! Duke Senior Mode Unlocked!", {
      duration: 5000,
    });
    
    // Switch to Duke Senior theme
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", "dukesenior");
      localStorage.setItem("theme", "dukesenior");
    }
    
    // Show special console message
    console.log(
      "%c🎮 KONAMI CODE ACTIVATED! 🎮",
      "font-size: 24px; color: #ff00ff; font-weight: bold; text-shadow: 0 0 10px #ff00ff;"
    );
    console.log(
      "%cWelcome to Duke Senior Mode - The secret gaming theme!",
      "font-size: 16px; color: #ffaa00;"
    );
  };

  useKonamiCode(activate);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="konami-message"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="konami-icon">��</div>
            <h2>Duke Senior Mode</h2>
            <p>Unlocked!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
