import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "success" | "secondary";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className = ""
}: BadgeProps) {
  const baseStyle = "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-sans";

  const variants = {
    primary: "bg-[#FFF6F8] text-[#FF4F7B] border border-[#FF4F7B]/10",
    accent: "bg-blue-50 text-[#2563EB] border border-blue-100",
    success: "bg-green-50 text-green-600 border border-green-100",
    secondary: "bg-gray-100 text-gray-600 border border-gray-200"
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
