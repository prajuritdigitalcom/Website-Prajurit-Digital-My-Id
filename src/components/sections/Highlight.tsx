import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function Highlight() {
  return (
    <section className="relative w-full bg-[#FF4F7B] py-7 md:py-9 overflow-hidden shadow-sm">
      {/* Shimmer gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex items-center justify-center gap-3 text-white text-center">
        <Sparkles className="w-5 h-5 animate-pulse text-white/90 shrink-0" />
        <span className="font-sans font-extrabold text-base md:text-xl lg:text-2xl tracking-wide uppercase">
          Lebih Banyak Tools, Lebih Banyak Kemudahan.
        </span>
        <Sparkles className="w-5 h-5 animate-pulse text-white/90 shrink-0" />
      </div>
    </section>
  );
}
