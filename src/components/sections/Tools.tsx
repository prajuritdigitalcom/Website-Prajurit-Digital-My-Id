import React, { useState, useEffect, useRef } from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import FadeIn from "../effects/FadeIn";
import { TOOLS_DATA } from "../../data/tools";
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
  ArrowRight,
  Sparkles,
  Play
} from "lucide-react";

// Import Tool Components
import WebpConverter from "../tools/WebpConverter";
import SpintaxGenerator from "../tools/SpintaxGenerator";
import KeywordMerger from "../tools/KeywordMerger";
import KeywordSuggest from "../tools/KeywordSuggest";
import UniqueImageGen from "../tools/UniqueImageGen";
import ProductRewriter from "../tools/ProductRewriter";

export default function Tools() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

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
      default:
        return <ImageIcon className="w-6 h-6" />;
    }
  };

  const selectTool = (id: string) => {
    // Check if tool has a local workspace
    const localWorkspaces = [
      "webp-converter",
      "spintax-generator",
      "keyword-merger",
      "keyword-suggest",
      "unique-image",
      "product-rewriter"
    ];
    
    if (!localWorkspaces.includes(id)) {
      const tool = TOOLS_DATA.find(t => t.id === id);
      if (tool?.externalUrl) {
        window.open(tool.externalUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    setActiveToolId(id);
    // Smooth scroll to workspace
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  // Render the selected interactive tool workspace
  const renderActiveToolWorkspace = () => {
    switch (activeToolId) {
      case "webp-converter":
        return <WebpConverter />;
      case "spintax-generator":
        return <SpintaxGenerator />;
      case "keyword-merger":
        return <KeywordMerger />;
      case "keyword-suggest":
        return <KeywordSuggest />;
      case "unique-image":
        return <UniqueImageGen />;
      case "product-rewriter":
        return <ProductRewriter />;
      default:
        return null;
    }
  };

  return (
    <section id="tools" className="relative py-20 md:py-24 bg-gradient-to-b from-white to-[#FFF6F8]/35 overflow-hidden">
      <Container>
        {/* Header */}
        <FadeIn direction="up">
          <SectionTitle
            title="Tools Praktis untuk Berbagai Kebutuhan"
            subtitle="Nikmati berbagai tools online yang cepat, ringan, dan siap membantu berbagai kebutuhan tanpa proses yang rumit."
          />
        </FadeIn>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TOOLS_DATA.map((tool, index) => (
            <FadeIn key={tool.id} direction="up" delay={0.05 * index}>
              <Card 
                onClick={() => selectTool(tool.id)}
                className={`flex flex-col justify-between h-full group cursor-pointer border-2 transition-all duration-300 ${
                  activeToolId === tool.id 
                    ? "border-[#FF4F7B] shadow-md bg-[#FFF6F8]/30 -translate-y-1" 
                    : "border-[#ECECEC] hover:border-[#FF4F7B]"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      activeToolId === tool.id 
                        ? "bg-[#FF4F7B] text-white" 
                        : "bg-[#FFF6F8] text-[#FF4F7B] group-hover:bg-[#FF4F7B] group-hover:text-white"
                    }`}>
                      {getIcon(tool.icon)}
                    </div>
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

        {/* Workspace Focus Anchor */}
        <div ref={workspaceRef} className="scroll-mt-24 pt-2">
          {activeToolId && (
            <FadeIn direction="up" duration={0.6}>
              <div className="border-2 border-[#FF4F7B]/10 rounded-[32px] p-1 bg-[#FFF6F8]/20 shadow-sm mb-12">
                <div className="bg-gray-100/50 rounded-[28px] px-6 py-3 border-b border-gray-200/50 flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF4F7B]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4F7B]">
                      Workspace Aktif
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveToolId(null)}
                    className="text-xs text-[#6B7280] hover:text-[#FF4F7B] font-bold transition-colors cursor-pointer"
                  >
                    Tutup Workspace [x]
                  </button>
                </div>
                <div className="p-4 md:p-6 bg-white rounded-b-[28px] rounded-t-[10px]">
                  {renderActiveToolWorkspace()}
                </div>
              </div>
            </FadeIn>
          )}
        </div>

      </Container>
    </section>
  );
}
