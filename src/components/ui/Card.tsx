import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Card({
  children,
  hoverEffect = true,
  className = "",
  ...props
}: CardProps) {
  const baseStyle = "bg-white border border-[#ECECEC] rounded-[24px] p-8 shadow-sm transition-all duration-300";
  const hoverStyle = hoverEffect 
    ? "hover:-translate-y-1.5 hover:shadow-md hover:border-[#FF4F7B]" 
    : "";

  return (
    <div
      className={`${baseStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
