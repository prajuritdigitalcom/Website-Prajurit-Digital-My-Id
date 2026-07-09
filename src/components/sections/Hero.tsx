import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import GradientBlob from "../effects/GradientBlob";
import Floating from "../effects/Floating";
import FadeIn from "../effects/FadeIn";
import { Sparkles, ArrowRight, Zap, Target, Star } from "lucide-react";

export default function Hero() {
  const scrollToTools = () => {
    const el = document.getElementById("tools");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 md:pt-36 pb-16 overflow-hidden bg-white">
      {/* Background blobs */}
      <GradientBlob color="pink" size="xl" className="-top-20 -left-20 opacity-70" />
      <GradientBlob color="blue" size="xl" className="top-40 -right-20 opacity-60" />
      <GradientBlob color="purple" size="lg" className="-bottom-20 left-1/3 opacity-40" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Descs, CTAs (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-start text-left">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF6F8] rounded-full border border-[#FF4F7B]/10 text-xs text-[#FF4F7B] font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Prajurit Digital Tools v2.0</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-[46px] font-bold font-sans tracking-tight text-[#202124] leading-[1.15]">
                Selesaikan Pekerjaan dengan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F7B] to-purple-600">
                  Lebih Cepat
                </span>{" "}
                dan Mudah
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-sm md:text-base text-[#6B7280] leading-relaxed max-w-[450px]">
                Hemat waktu dan tingkatkan produktivitas pemasaran digital Anda dengan kumpulan tools online yang praktis, cepat, ringan, serta mudah digunakan.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={scrollToTools} variant="primary" size="lg" className="group">
                  Lihat Semua Tools
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#ECECEC] text-[#202124] hover:bg-[#FFF6F8]/30 text-xs font-bold rounded-full transition-colors"
                >
                  Pelajari Layanan
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Middle Column: Premium floating illustrations (lg:col-span-4) */}
          <div className="lg:col-span-4 flex items-center justify-center relative min-h-[300px]">
            <Floating duration={4.5} yOffset={20}>
              <div className="relative w-72 md:w-80 aspect-square rounded-[36px] bg-gradient-to-tr from-[#FFF6F8] to-white border border-[#ECECEC] shadow-md p-6 flex flex-col justify-between overflow-hidden">
                {/* Decorative mesh */}
                <div className="absolute inset-0 bg-radial from-[#FF4F7B]/5 via-transparent to-transparent opacity-40 pointer-events-none" />

                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F7B] bg-[#FFF6F8] px-2 py-0.5 rounded-md border border-[#FF4F7B]/5">
                    Produktivitas
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F7B]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                </div>

                {/* Simulated charts and dashboard mockups */}
                <div className="space-y-3.5 relative z-10 py-4">
                  <div className="flex items-center gap-3 bg-white p-3 border border-[#ECECEC]/70 rounded-2xl shadow-sm transform -rotate-1">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF6F8] flex items-center justify-center shrink-0 text-[#FF4F7B]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="w-16 h-2 bg-gray-200 rounded mb-1.5" />
                      <div className="w-24 h-1.5 bg-gray-100 rounded" />
                    </div>
                    <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                      +124%
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 border border-[#ECECEC]/70 rounded-2xl shadow-sm transform rotate-2 translate-x-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="w-20 h-2 bg-gray-200 rounded mb-1.5" />
                      <div className="w-12 h-1.5 bg-gray-100 rounded" />
                    </div>
                    <span className="text-[10px] font-bold text-[#FF4F7B] bg-[#FFF6F8] px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 border border-[#ECECEC]/70 rounded-2xl shadow-sm transform -rotate-2 -translate-x-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="w-14 h-2 bg-gray-200 rounded mb-1.5" />
                      <div className="w-28 h-1.5 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>

                <div className="text-left relative z-10 pt-1 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6B7280]">Prajurit Panel</span>
                  <span className="text-xs font-bold text-[#202124]">v2.0 PRO</span>
                </div>
              </div>
            </Floating>
          </div>

          {/* Right Column: Title GRATIS (lg:col-span-3) */}
          <div className="lg:col-span-3 flex lg:flex-col items-center justify-center text-center lg:text-right lg:items-end gap-3 lg:gap-1.5 py-6">
            <FadeIn direction="right" delay={0.4}>
              <div className="space-y-1">
                <p className="font-mono text-xs font-bold tracking-widest text-[#FF4F7B] uppercase">
                  LISENSI SEUMUR HIDUP
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#202124] leading-none tracking-tight uppercase">
                  100% GRATIS
                </h3>
                <p className="text-[11px] md:text-xs text-[#6B7280] font-semibold">
                  UNTUK SEMUA PENGGUNA TANPA BATAS
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}
