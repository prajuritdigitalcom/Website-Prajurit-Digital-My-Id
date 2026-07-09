import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-[#ECECEC] py-4">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo left */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#ECECEC] shadow-sm shrink-0">
            <img
              src="https://i.ibb.co.com/wr0x733r/prajurit-digital.jpg"
              alt="Prajurit Digital Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-base md:text-lg tracking-tight text-[#202124] leading-tight">
              Prajurit Digital
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF6F8] rounded-full border border-[#FF4F7B]/10 text-[10px] font-bold text-[#FF4F7B] tracking-wider uppercase">
          <span>100% Gratis!</span>
        </div>
      </div>
    </nav>
  );
}

