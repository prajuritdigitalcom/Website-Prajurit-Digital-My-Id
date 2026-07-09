import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-500 py-8 border-t border-[#ECECEC] font-sans">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center justify-center text-center text-xs">
        <p>
          &copy; {currentYear} <strong>Prajurit Digital</strong>. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
}

