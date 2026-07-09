import React from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import FadeIn from "../effects/FadeIn";
import { BookOpen, Award, Users, Star } from "lucide-react";

export default function Classes() {
  const courses = [
    {
      title: "Masterclass Prajurit SEO",
      rating: "4.9",
      students: "1,240 Alumni",
      badge: "Terpopuler",
      description: "Strategi komprehensif menguasai algoritma Google, riset keyword, audit teknikal, on-page, off-page link building dari nol sampai mahir.",
      price: "Rp 499.000"
    },
    {
      title: "Google Ads Bootcamp Pemula",
      rating: "4.8",
      students: "850 Alumni",
      badge: "Intensif",
      description: "Langkah taktis menyusun struktur campaign, riset biaya per klik (CPC), menulis headline persuasif, hingga scaling profit berkali lipat.",
      price: "Rp 399.000"
    },
    {
      title: "AI Copywriting & Content Writer",
      rating: "4.9",
      students: "2,100 Alumni",
      badge: "Teknologi",
      description: "Tips meramu prompts premium ChatGPT & Gemini untuk menghasilkan ratusan artikel unik, naskah iklan, dan deskripsi produk dalam hitungan menit.",
      price: "Rp 249.000"
    }
  ];

  return (
    <section id="classes" className="py-20 bg-white">
      <Container>
        <FadeIn direction="up">
          <SectionTitle
            title="Kelas Online Prajurit Digital"
            subtitle="Tingkatkan keterampilan digital marketing Anda dan tim melalui kurikulum video berbasis praktik, diskusi grup, dan bimbingan mentor berpengalaman."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.1}>
              <Card className="flex flex-col justify-between h-full hover:border-[#FF4F7B] transition-all p-7">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      E-Course
                    </span>
                    <Badge variant={course.badge === "Terpopuler" ? "primary" : "accent"}>
                      {course.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-[#202124]">{course.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {course.students}
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Investasi</p>
                    <p className="text-sm font-bold text-[#FF4F7B] mt-1">{course.price}</p>
                  </div>
                  <a
                    href="https://wa.me/6281555459716?text=Halo%20Prajurit%20Digital,%20saya%20tertarik%20dengan%20kelas%20online%20Anda."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FFF6F8] hover:bg-[#FF4F7B] hover:text-white border border-[#FF4F7B]/10 rounded-full text-xs font-bold text-[#FF4F7B] transition-colors"
                  >
                    Daftar Kelas
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
