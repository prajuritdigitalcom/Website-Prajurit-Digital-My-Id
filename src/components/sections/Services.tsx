import React from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import FadeIn from "../effects/FadeIn";
import { Laptop, Compass, TrendingUp, Sparkles, MessageSquare } from "lucide-react";

export default function Services() {
  const serviceList = [
    {
      icon: <Laptop className="w-5 h-5" />,
      title: "Jasa Pembuatan Website & Landing Page",
      description: "Desain custom premium, loading cepat kilat, responsive mobile-first, dan dioptimasi SEO dasar untuk meningkatkan kredibilitas bisnis Anda."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Jasa Manajemen Iklan Google Ads",
      description: "Optimasi budget iklan dengan riset kata kunci pencarian tertarget demi mendatangkan calon pembeli siap transaksi setiap harinya."
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Jasa Optimasi SEO Bulanan",
      description: "Menaikkan peringkat website Anda ke halaman satu pencarian Google secara organik untuk trafik gratis berkelanjutan jangka panjang."
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Jasa Kelola Media Sosial",
      description: "Pembuatan konten visual kreatif harian, penulisan caption persuasif, dan pengelolaan interaksi akun Instagram & TikTok Anda."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50/40 border-t border-[#ECECEC]">
      <Container>
        <FadeIn direction="up">
          <SectionTitle
            title="Layanan Profesional Prajurit Digital"
            subtitle="Selain menyediakan tools gratis, kami juga membantu mengakselerasi pertumbuhan bisnis online Anda lewat layanan digital marketing berorientasi hasil."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {serviceList.map((srv, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.1}>
              <Card className="flex gap-5 p-6 hover:border-[#FF4F7B] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FFF6F8] text-[#FF4F7B] flex items-center justify-center shrink-0">
                  {srv.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-[#202124]">{srv.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{srv.description}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
