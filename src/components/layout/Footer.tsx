import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-500 py-8 border-t border-[#ECECEC] font-sans">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center justify-center text-center text-xs">
        <p>
          &copy; {currentYear}{" "}
          <a
            href="https://prajuritdigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-700 hover:text-[#00897B] transition-colors underline-offset-2 hover:underline"
          >
            Prajurit Digital
          </a>
          . Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
}

