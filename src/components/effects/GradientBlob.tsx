import React from "react";

interface GradientBlobProps {
  color?: "pink" | "blue" | "white" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function GradientBlob({
  color = "pink",
  size = "md",
  className = ""
}: GradientBlobProps) {
  const sizes = {
    sm: "w-40 h-40 blur-2xl",
    md: "w-72 h-72 blur-3xl",
    lg: "w-96 h-96 blur-[100px]",
    xl: "w-[450px] h-[450px] blur-[130px]"
  };

  const colors = {
    pink: "bg-radial from-[#FF4F7B]/15 via-[#FF4F7B]/5 to-transparent",
    blue: "bg-radial from-[#2563EB]/15 via-[#2563EB]/5 to-transparent",
    purple: "bg-radial from-purple-500/15 via-purple-500/5 to-transparent",
    white: "bg-radial from-white/30 via-white/10 to-transparent"
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none select-none mix-blend-multiply ${sizes[size]} ${colors[color]} ${className}`}
    />
  );
}
