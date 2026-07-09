import React from "react";
import { motion } from "motion/react";

interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function Floating({
  children,
  duration = 4,
  yOffset = 15,
  className = ""
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
