import React from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import FadeIn from "../effects/FadeIn";
import { ExternalLink, Star, ShieldCheck, Award } from "lucide-react";

export default function Portfolio() {
  const portfolios = [
    {
      title: "Optimasi SEO Toko Online Kosmetik Malang",
      metrics: "Naik 300% Trafik Organik",
      desc: "Menaikkan kata kunci 'kosmetik malang murah', 'grosir kecantikan malang' ke ranking #1 Google dalam 4 bulan pengerjaan.",
      platform: "SEO Google"
    },
    {
      title: "Landing Page & Web App SaaS Agensi Digital",
      metrics: "Kecepatan Loading 99%",
      desc: "Membangun sistem interaksi landing page modern minim JavaScript menggunakan React + Vite, menghasilkan conversion rate 8.4%.",
      platform: "Web Development"
    },
    {
      title: "Campaign Google Ads Jasa Sedot WC Surabaya",
      metrics: "Conversion Cost Turun 45%",
      desc: "Menyusun strategi bidding cerdas dan landing page adaptif berkecepatan tinggi, memotong cost-per-lead Google Ads secara masif.",
      platform: "Google Search Ads"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50/40 border-b border-[#ECECEC]">
      <Container>
        <FadeIn direction="up">
          <SectionTitle
            title="Karya & Hasil Nyata Kami"
            subtitle="Prajurit Digital mendampingi puluhan bisnis kecil hingga menengah bersaing di ranah digital dengan implementasi strategi teknis yang presisi."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((port, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.1}>
              <Card className="flex flex-col justify-between h-full hover:border-[#FF4F7B] transition-all p-7">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#FF4F7B] tracking-widest uppercase bg-[#FFF6F8] px-2 py-0.5 rounded border border-[#FF4F7B]/5">
                      {port.platform}
                    </span>
                    <Award className="w-4 h-4 text-gray-400" />
                  </div>

                  <h3 className="text-sm font-bold text-[#202124] leading-tight">{port.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{port.desc}</p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Pencapaian</p>
                    <p className="text-xs font-bold text-green-600 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      {port.metrics}
                    </p>
                  </div>
                  <a
                    href="https://wa.me/6281555459716"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[#ECECEC] hover:border-[#FF4F7B] hover:text-[#FF4F7B] text-gray-400 transition-all cursor-pointer"
                    title="Konsultasikan Kebutuhan Serupa"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
