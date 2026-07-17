import React from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import FadeIn from "../effects/FadeIn";
import { TOOLS_DATA, MEMBER_TOOLS_DATA } from "../../data/tools";
import { Tool } from "../../types";

// Import Lucide Icons
import { 
  Image as ImageIcon, 
  Shuffle, 
  Combine, 
  TrendingUp, 
  Palette, 
  PenTool, 
  Globe,
  Map,
  Link,
  Keyboard,
  Brain,
  ArrowRight,
  Sparkles,
  Play
} from "lucide-react";

export default function Tools() {
  // Map icon name to Lucide Icon component
  const getIcon = (name: string) => {
    switch (name) {
      case "Image":
        return <ImageIcon className="w-6 h-6" />;
      case "Shuffle":
        return <Shuffle className="w-6 h-6" />;
      case "Combine":
        return <Combine className="w-6 h-6" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6" />;
      case "Palette":
        return <Palette className="w-6 h-6" />;
      case "PenTool":
        return <PenTool className="w-6 h-6" />;
      case "Globe":
        return <Globe className="w-6 h-6" />;
      case "Map":
        return <Map className="w-6 h-6" />;
      case "Link":
        return <Link className="w-6 h-6" />;
      case "Keyboard":
        return <Keyboard className="w-6 h-6" />;
      case "Brain":
        return <Brain className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      default:
        return <ImageIcon className="w-6 h-6" />;
    }
  };

  const selectTool = (externalUrl?: string) => {
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* SECTION 1: Tools Praktis */}
      <section id="tools" className="relative py-20 md:py-24 bg-gradient-to-b from-white to-[#FFF6F8]/35 overflow-hidden border-b border-[#ECECEC]/30">
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <SectionTitle
              title="Tools Praktis untuk Berbagai Kebutuhan"
              subtitle="Nikmati berbagai tools online yang cepat, ringan, dan siap membantu berbagai kebutuhan tanpa proses yang rumit."
            />
          </FadeIn>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
            {TOOLS_DATA.map((tool, index) => (
              <FadeIn key={tool.id} direction="up" delay={0.05 * index}>
                <Card 
                  onClick={() => selectTool(tool.externalUrl)}
                  className="flex flex-col justify-between h-full group cursor-pointer border-2 transition-all duration-300 border-[#ECECEC] hover:border-[#FF4F7B]"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[#FFF6F8] text-[#FF4F7B] group-hover:bg-[#FF4F7B] group-hover:text-white">
                        {getIcon(tool.icon)}
                      </div>
                      {tool.badge && (
                        <Badge variant="primary">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#202124] group-hover:text-[#FF4F7B] transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <a 
                    href={tool.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#FF4F7B] hover:text-[#F33967] w-fit cursor-pointer group/btn"
                  >
                    <span>Buka Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover:translate-x-1" />
                  </a>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 2: Member Tools */}
      <section id="member-tools" className="relative py-20 md:py-24 bg-gradient-to-b from-[#FFF6F8]/35 to-white overflow-hidden">
        <Container>
          {/* Header */}
          <FadeIn direction="up">
            <SectionTitle
              title="Tools Khusus untuk Member Kelas Online"
              subtitle="Berbagai tools eksklusif untuk mendukung pembelajaran, praktik, dan produktivitas member Kelas Online Prajurit Digital."
            />
          </FadeIn>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
            {MEMBER_TOOLS_DATA.map((tool, index) => (
              <FadeIn key={tool.id} direction="up" delay={0.05 * index}>
                <Card 
                  onClick={() => selectTool(tool.externalUrl)}
                  className="flex flex-col justify-between h-full group cursor-pointer border-2 transition-all duration-300 border-[#ECECEC] hover:border-[#FF4F7B]"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[#FFF6F8] text-[#FF4F7B] group-hover:bg-[#FF4F7B] group-hover:text-white">
                        {getIcon(tool.icon)}
                      </div>
                      {tool.badge && (
                        <Badge variant="success">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#202124] group-hover:text-[#FF4F7B] transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <a 
                    href={tool.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#FF4F7B] hover:text-[#F33967] w-fit cursor-pointer group/btn"
                  >
                    <span>Buka Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover:translate-x-1" />
                  </a>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
