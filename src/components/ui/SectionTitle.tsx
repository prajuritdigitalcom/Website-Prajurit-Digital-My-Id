import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center"
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3.5 max-w-4xl mb-12 ${alignClass} font-sans`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#202124] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-lg text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
