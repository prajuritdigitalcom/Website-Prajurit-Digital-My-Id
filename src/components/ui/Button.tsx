import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-bold font-sans transition-all duration-250 cursor-pointer focus:outline-none rounded-full";

  const variants = {
    primary: "bg-[#FF4F7B] hover:bg-[#F33967] text-white shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-[#FFF6F8] hover:bg-[#FFEBF0] text-[#FF4F7B] border border-[#FF4F7B]/10 active:scale-[0.98]",
    outline: "bg-white hover:bg-gray-50 text-[#202124] border border-[#ECECEC] hover:border-gray-300 active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-[#FFF6F8] text-[#6B7280] hover:text-[#FF4F7B]"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
