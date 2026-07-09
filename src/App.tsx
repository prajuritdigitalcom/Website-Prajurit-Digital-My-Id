import React from "react";
import Navbar from "./components/layout/Navbar";
import Tools from "./components/sections/Tools";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#202124] antialiased selection:bg-[#FF4F7B]/10 selection:text-[#FF4F7B]">
      {/* Premium Minimal Header */}
      <Navbar />

      {/* Kategori & Live Interactive Workspace Tools (Free Tools Only) */}
      <Tools />

      {/* Premium Simple Footer */}
      <Footer />
    </div>
  );
}


