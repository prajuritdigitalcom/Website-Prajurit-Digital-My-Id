import React from "react";
import Container from "../ui/Container";
import FadeIn from "../effects/FadeIn";
import { MessageSquare, ArrowUpRight, Sparkles, Star } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative py-20 bg-white overflow-hidden">
      <Container>
        <FadeIn direction="up">
          <div className="relative rounded-[40px] bg-gradient-to-tr from-[#FF4F7B] to-purple-600 text-white px-8 py-14 md:py-20 md:px-16 text-center overflow-hidden shadow-xl">
            {/* Background design ornaments */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-spin" />
                <span>Konsultasi Gratis</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Semua Tools yang Anda Butuhkan dalam Satu Tempat
              </h2>

              <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
                Masih memiliki pertanyaan tentang cara penggunaan tools, ingin bekerja sama dalam pembuatan software kustom, atau tertarik mendaftar Kelas Online Prajurit Digital?
              </p>

              <div className="pt-4">
                <a
                  href="https://wa.me/6281555459716?text=Halo%20Prajurit%20Digital,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20dan%20tools."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-gray-50 text-[#FF4F7B] text-sm font-extrabold rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  Chat via WhatsApp
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
