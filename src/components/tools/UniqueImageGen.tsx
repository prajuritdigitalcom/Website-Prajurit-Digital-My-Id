import React, { useState, useRef } from "react";
import { Palette, Upload, Download, Sparkles, RefreshCw, Layers, CheckCircle, AlertCircle, Info, Image as ImageIcon } from "lucide-react";

export default function UniqueImageGen() {
  const [activeTab, setActiveTab] = useState<"seo" | "ai">("seo");

  // --- SEO Unique-ifier State ---
  const [seoFile, setSeoFile] = useState<File | null>(null);
  const [seoOriginalUrl, setSeoOriginalUrl] = useState<string>("");
  const [seoResultUrl, setSeoResultUrl] = useState<string>("");
  const [watermark, setWatermark] = useState<string>("PRAJURIT DIGITAL");
  const [brightness, setBrightness] = useState<number>(103); // Slight change
  const [contrast, setContrast] = useState<number>(102); // Slight change
  const [rotation, setRotation] = useState<number>(1); // 1 degree rotation bypasses duplicate filters
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(true);
  const [seoProcessing, setSeoProcessing] = useState<boolean>(false);
  const [seoError, setSeoError] = useState<string>("");
  const seoInputRef = useRef<HTMLInputElement>(null);

  // --- AI Image Gen State ---
  const [aiPrompt, setAiPrompt] = useState<string>("A premium mock-up product packaging of a cosmetic tube, soft pastel colors, clean studio lighting, high resolution, 3d render");
  const [aiAspectRatio, setAiAspectRatio] = useState<string>("1:1");
  const [aiResultUrl, setAiResultUrl] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  // --- SEO Unique-ifier Logics ---
  const handleSeoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setSeoError("Unggah file gambar yang valid (JPG, PNG, atau WEBP).");
        return;
      }
      setSeoError("");
      setSeoFile(file);
      setSeoResultUrl("");

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSeoOriginalUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processSeoImage = () => {
    if (!seoOriginalUrl) return;
    setSeoProcessing(true);
    setSeoError("");

    const img = new Image();
    img.src = seoOriginalUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Gagal memuat canvas context.");

        // We want to rotate very slightly. To support rotation without cropping corners,
        // we can expand canvas or just rotate inside. For subtle 1 deg rotation, rotating inside is perfect.
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply filters
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

        // Save context
        ctx.save();

        // Translate to center for rotation & flipping
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Apply rotation (in radians: degree * Math.PI / 180)
        if (rotation !== 0) {
          ctx.rotate((rotation * Math.PI) / 180);
        }

        // Apply horizontal flip
        if (flipHorizontal) {
          ctx.scale(-1, 1);
        }

        // Draw image back to center
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        // Restore context to draw watermark overlay without rotation or flip
        ctx.restore();

        // Draw Watermark
        if (watermark.trim()) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          // Semi-transparent background stripe at bottom
          const stripeHeight = Math.max(20, canvas.height * 0.06);
          ctx.fillRect(0, canvas.height - stripeHeight, canvas.width, stripeHeight);

          ctx.fillStyle = "rgba(32, 33, 36, 0.7)";
          ctx.font = `bold ${Math.max(12, canvas.height * 0.03)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(watermark.toUpperCase(), canvas.width / 2, canvas.height - stripeHeight / 2);
        }

        // Convert to output URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setSeoResultUrl(dataUrl);
      } catch (err) {
        console.error(err);
        setSeoError("Gagal memproses gambar unik.");
      } finally {
        setSeoProcessing(false);
      }
    };
  };

  const downloadSeoImage = () => {
    if (!seoResultUrl || !seoFile) return;
    const link = document.createElement("a");
    const name = seoFile.name.substring(0, seoFile.name.lastIndexOf("."));
    link.download = `${name}_unik_seo.jpg`;
    link.href = seoResultUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- AI Image Gen Logics ---
  const generateAiImage = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError("");
    setAiResultUrl("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, aspectRatio: aiAspectRatio }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal membuat gambar AI.");
      }

      const data = await res.json();
      setAiResultUrl(data.image);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Gagal memproses gambar AI. Pastikan token API valid.");
    } finally {
      setAiLoading(false);
    }
  };

  const downloadAiImage = () => {
    if (!aiResultUrl) return;
    const link = document.createElement("a");
    link.download = `prajurit_digital_ai_${Date.now()}.png`;
    link.href = aiResultUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="unique-image" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#FF4F7B]" />
          Gambar Unik Generator
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Pilihan alat terlengkap untuk optimasi gambar Anda. Pilih tab **SEO Marketplace** untuk membuat duplikat gambar menjadi unik secara algoritmik di e-commerce, atau pilih tab **AI Generator** untuk memunculkan gambar unik dari pikiran ke visual.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl mb-8 max-w-md">
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "seo"
              ? "bg-white text-[#FF4F7B] shadow-sm"
              : "text-[#6B7280] hover:text-[#202124]"
          }`}
        >
          <Layers className="w-4 h-4" />
          SEO Marketplace
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "ai"
              ? "bg-white text-[#FF4F7B] shadow-sm"
              : "text-[#6B7280] hover:text-[#202124]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Image Generator
        </button>
      </div>

      {activeTab === "seo" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div
              onClick={() => seoInputRef.current?.click()}
              className="border-2 border-dashed border-[#ECECEC] hover:border-[#FF4F7B] hover:bg-[#FFF6F8]/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-150"
            >
              <input
                type="file"
                ref={seoInputRef}
                onChange={handleSeoFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-10 h-10 rounded-full bg-[#FFF6F8] flex items-center justify-center mb-3 mx-auto text-[#FF4F7B]">
                <Upload className="w-5 h-5" />
              </div>
              {seoFile ? (
                <div className="text-xs">
                  <p className="font-bold text-[#202124] max-w-[200px] truncate mx-auto">{seoFile.name}</p>
                  <p className="text-[#6B7280] mt-0.5">Ubah file terpilih</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-xs text-[#202124] mb-0.5">Unggah Foto Produk Marketplace</p>
                  <p className="text-[10px] text-[#6B7280]">Mendukung PNG atau JPG produk asli Anda</p>
                </div>
              )}
            </div>

            {seoError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{seoError}</span>
              </div>
            )}

            {seoOriginalUrl && (
              <div className="bg-gray-50/50 border border-[#ECECEC] rounded-2xl p-4 space-y-4">
                <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Pengaturan Keunikan Gambar</div>

                <div className="space-y-3">
                  {/* Watermark text */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#202124]">Teks Watermark (Toko Anda)</label>
                    <input
                      type="text"
                      value={watermark}
                      onChange={(e) => setWatermark(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ECECEC] bg-white rounded-xl text-xs text-[#202124] font-medium focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none"
                      placeholder="Contoh: TOKO BERKAH JAYA"
                    />
                  </div>

                  {/* Horizontal Flip */}
                  <label className="flex items-center gap-3 text-xs text-[#202124] font-semibold cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={flipHorizontal}
                      onChange={(e) => setFlipHorizontal(e.target.checked)}
                      className="w-4 h-4 accent-[#FF4F7B] rounded"
                    />
                    <span>Flip Gambar Horisontal (Penting!)</span>
                  </label>

                  {/* Rotate Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-[#6B7280] mb-1 font-medium">
                      <span>Kemiringan Rotasi:</span>
                      <span className="font-bold text-[#202124]">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full accent-[#FF4F7B] cursor-pointer text-xs"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">Rotasi 1° sampai 3° cukup membingungkan bot deteksi tanpa merusak visual produk.</p>
                  </div>

                  {/* Brightness Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-[#6B7280] mb-1 font-medium">
                      <span>Penyesuaian Kecerahan:</span>
                      <span className="font-bold text-[#202124]">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="110"
                      step="1"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full accent-[#FF4F7B] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  onClick={processSeoImage}
                  disabled={seoProcessing}
                  className="w-full py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  {seoProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Sedang Memproses...
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4" />
                      Hasilkan Gambar Unik SEO
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="flex gap-2 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-[#2563EB] leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Info:</span> Gambar unik yang dihasilkan dengan mengubah orientasi, kemiringan 1 derajat, penyesuaian filter warna, dan penambahan watermark kustom dapat meloloskan produk Anda dari pemblokiran duplikat foto produk oleh bot marketplace.
              </div>
            </div>
          </div>

          {/* Results preview */}
          <div className="lg:col-span-7 border border-[#ECECEC] rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/20 flex flex-col justify-between min-h-[350px]">
            {seoResultUrl ? (
              <div className="h-full flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-1.5 text-green-600 mb-4">
                    <CheckCircle className="w-4.5 h-4.5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Gambar Unik Siap Diunduh!</span>
                  </div>
                  <div className="w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-white border border-[#ECECEC] flex items-center justify-center shadow-md">
                    <img src={seoResultUrl} alt="SEO Result" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>

                <button
                  onClick={downloadSeoImage}
                  className="w-full py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Unduh Gambar Unik SEO (.jpg)
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6B7280] py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="font-semibold text-sm text-[#202124] mb-1">Hasil Gambar SEO Anda</p>
                <p className="text-xs max-w-[280px]">
                  Unggah gambar produk asli Anda di sebelah kiri, lakukan penyesuaian pengaturan bypass bot, lalu klik buat gambar unik.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Generation Inputs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Prompt Gambar AI (Deskripsi Gambar)
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full h-32 p-3.5 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-xs font-sans leading-relaxed resize-none"
                placeholder="Deskripsikan gambar unik yang ingin Anda buat..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Rasio Aspek (Aspect Ratio)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["1:1", "4:3", "16:9"].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAiAspectRatio(ratio)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      aiAspectRatio === ratio
                        ? "bg-[#FF4F7B]/10 border-[#FF4F7B] text-[#FF4F7B]"
                        : "bg-white border-[#ECECEC] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    {ratio === "1:1" ? "1:1 (Kotak)" : ratio === "4:3" ? "4:3 (Foto)" : "16:9 (Layar)"}
                  </button>
                ))}
              </div>
            </div>

            {aiError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            <button
              onClick={generateAiImage}
              disabled={aiLoading}
              className="w-full py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 shadow-sm"
            >
              {aiLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AI Sedang Menggambar...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Gambar AI Premium
                </>
              )}
            </button>
          </div>

          {/* AI Result */}
          <div className="lg:col-span-7 border border-[#ECECEC] rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/20 flex flex-col justify-between min-h-[350px]">
            {aiResultUrl ? (
              <div className="h-full flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-1.5 text-green-600 mb-4">
                    <CheckCircle className="w-4.5 h-4.5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Hasil Gambar AI Terbentuk!</span>
                  </div>
                  <div className={`w-full max-w-sm mx-auto rounded-xl overflow-hidden bg-white border border-[#ECECEC] flex items-center justify-center shadow-md ${
                    aiAspectRatio === "16:9" ? "aspect-video" : aiAspectRatio === "4:3" ? "aspect-[4/3]" : "aspect-square"
                  }`}>
                    <img src={aiResultUrl} alt="AI Result" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>

                <button
                  onClick={downloadAiImage}
                  className="w-full py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Unduh Gambar AI Premium (.png)
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#6B7280] py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-gray-400" />
                </div>
                <p className="font-semibold text-sm text-[#202124] mb-1">Hasil Gambar AI Anda</p>
                <p className="text-xs max-w-[280px]">
                  Tulis ide deskripsi gambar Anda di sebelah kiri, pilih rasio aspek gambar, lalu klik tombol generate.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
