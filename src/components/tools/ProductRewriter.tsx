import React, { useState } from "react";
import { PenTool, Copy, Check, Sparkles, RefreshCw, AlertCircle, ShoppingCart, Sliders } from "lucide-react";

export default function ProductRewriter() {
  const [originalDesc, setOriginalDesc] = useState<string>(
    "Sepatu sneakers pria kulit sintetis berkualitas tinggi. Nyaman dipakai harian, sol karet anti licin, warna hitam dan putih. Ukuran 39-44. Murah meriah tapi ga murahan. Cocok buat anak muda kuliahan atau kerja santai."
  );
  const [tone, setTone] = useState<string>("Profesional & Persuasif");
  const [length, setLength] = useState<string>("Sedang");
  const [platform, setPlatform] = useState<string>("Shopee");
  const [rewrittenDesc, setRewrittenDesc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>( "");
  const [copied, setCopied] = useState<boolean>(false);

  const handleRewrite = async () => {
    if (!originalDesc.trim()) return;
    setIsLoading(true);
    setError("");
    setRewrittenDesc("");

    try {
      const res = await fetch("/api/rewrite-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: originalDesc,
          tone,
          length,
          platform
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal menghubungi server rewriter.");
      }

      const data = await res.json();
      setRewrittenDesc(data.rewrittenText);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal menulis ulang deskripsi produk. Cek koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!rewrittenDesc) return;
    navigator.clipboard.writeText(rewrittenDesc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Markdown Parser to render basic formatting (*, **, ##, bullet points) as nice JSX elements safely
  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;

    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      let trimmed = line.trim();

      // Header 2 or 3
      if (trimmed.startsWith("###")) {
        return <h4 key={idx} className="text-sm font-bold text-[#202124] mt-4 mb-2">{trimmed.replace("###", "").trim()}</h4>;
      }
      if (trimmed.startsWith("##")) {
        return <h3 key={idx} className="text-base font-bold text-[#202124] mt-5 mb-2.5">{trimmed.replace("##", "").trim()}</h3>;
      }
      if (trimmed.startsWith("#")) {
        return <h2 key={idx} className="text-lg font-bold text-[#202124] mt-6 mb-3">{trimmed.replace("#", "").trim()}</h2>;
      }

      // Bullet points
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        // Parse bold inline **text**
        const content = trimmed.substring(1).trim();
        return (
          <li key={idx} className="text-xs text-gray-700 leading-relaxed ml-4 list-disc my-1">
            {parseBoldText(content)}
          </li>
        );
      }

      // Regular paragraph
      if (trimmed === "") {
        return <div key={idx} className="h-2.5" />;
      }

      return (
        <p key={idx} className="text-xs text-gray-700 leading-relaxed my-1.5">
          {parseBoldText(trimmed)}
        </p>
      );
    });
  };

  // Helper to parse bold stars like **text**
  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    if (parts.length === 1) return text;

    return parts.map((part, i) => {
      // Every odd index is bold text
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-[#202124]">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="product-rewriter" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-[#FF4F7B]" />
          Rewriter Deskripsi Produk (AI)
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Optimalkan deskripsi produk Anda dengan kekuatan AI Gemini 3.5. Menghasilkan kata-kata hipnotik penjualan yang memikat hati calon pembeli sekaligus ramah algoritma SEO pencarian marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Settings and Input */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Deskripsi Produk Asli
            </label>
            <textarea
              value={originalDesc}
              onChange={(e) => setOriginalDesc(e.target.value)}
              className="w-full h-40 p-3.5 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-xs font-sans leading-relaxed resize-y"
              placeholder="Tuliskan spesifikasi, keunggulan, atau poin acak produk Anda di sini..."
            />
          </div>

          <div className="bg-gray-50/50 border border-[#ECECEC] p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-[#202124] flex items-center gap-1.5 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-[#FF4F7B]" />
              Pengaturan AI Copywriter
            </h4>

            {/* Target Platform */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280]">Platform Target</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#ECECEC] rounded-xl text-xs text-[#202124] outline-none focus:border-[#FF4F7B]"
              >
                <option value="Shopee">Shopee Indonesia</option>
                <option value="Tokopedia">Tokopedia</option>
                <option value="TikTok Shop">TikTok Shop</option>
                <option value="Instagram">Instagram Caption</option>
                <option value="Umum">Umum / Website Bisnis</option>
              </select>
            </div>

            {/* Tone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280]">Nada Bicara (Tone)</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#ECECEC] rounded-xl text-xs text-[#202124] outline-none focus:border-[#FF4F7B]"
              >
                <option value="Profesional & Persuasif">Profesional & Persuasif (Sangat Direkomendasikan)</option>
                <option value="Casual & Santai">Casual & Santai (Sahabat Dekat)</option>
                <option value="Humoris & Menghibur">Humoris & Menghibur (Storytelling Seru)</option>
                <option value="Bold & Berani">Bold & Berani (Urusan Teknis / To The Point)</option>
              </select>
            </div>

            {/* Length */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280]">Panjang Deskripsi</label>
              <div className="grid grid-cols-3 gap-2">
                {["Ringkas", "Sedang", "Detail"].map((len) => (
                  <button
                    key={len}
                    onClick={() => setLength(len)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      length === len
                        ? "bg-[#FF4F7B]/10 border-[#FF4F7B] text-[#FF4F7B]"
                        : "bg-white border-[#ECECEC] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleRewrite}
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 shadow-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                AI Sedang Menulis Ulang...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Rewrite Deskripsi Sekarang
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 border border-[#ECECEC] rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/20 flex flex-col justify-between min-h-[350px]">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-[#ECECEC] mb-4">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-[#FF4F7B]" />
                Hasil Copywriting AI
              </span>
              {rewrittenDesc && (
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-[#FF4F7B] hover:text-[#F33967] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Salin Hasil
                    </>
                  )}
                </button>
              )}
            </div>

            {rewrittenDesc ? (
              <div className="flex-1 overflow-y-auto max-h-[350px] pr-1">
                <div className="bg-white border border-[#ECECEC] rounded-xl p-5 shadow-inner">
                  {renderFormattedText(rewrittenDesc)}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[#6B7280] py-12">
                <div className="w-12 h-12 rounded-full bg-[#FFF6F8] flex items-center justify-center mb-3 text-[#FF4F7B]">
                  <PenTool className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm text-[#202124] mb-1">Dapatkan Copywriting Terbaik</p>
                <p className="text-xs max-w-[280px]">
                  Tuliskan poin produk Anda, pilih setelan target, dan klik tombol Rewrite di sebelah kiri untuk menghasilkan copywriting premium yang siap meningkatkan konversi penjualan Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
