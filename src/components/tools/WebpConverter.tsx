import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, CheckCircle, AlertCircle } from "lucide-react";

export default function WebpConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.85);
  const [targetFormat, setTargetFormat] = useState<string>("image/webp");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setError("");
    setConvertedUrl("");
    setConvertedSize(0);

    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Format file tidak didukung. Silakan unggah JPG, PNG, atau WebP.");
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);

    // Set target format automatically (if uploaded webp, target png; otherwise webp)
    if (file.type === "image/webp") {
      setTargetFormat("image/png");
    } else {
      setTargetFormat("image/webp");
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const convertImage = () => {
    if (!originalUrl) return;
    setIsConverting(true);
    setError("");

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Gagal menginisialisasi canvas context.");
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0);

        // Convert to selected format and quality
        const dataUrl = canvas.toDataURL(targetFormat, quality);
        setConvertedUrl(dataUrl);

        // Estimate size from Base64 string length
        // Base64 is ~4/3 of the binary file size
        const head = dataUrl.indexOf(",") + 1;
        const estimatedSize = Math.round((dataUrl.length - head) * 3 / 4);
        setConvertedSize(estimatedSize);
        setIsConverting(false);
      } catch (err: any) {
        console.error(err);
        setError("Gagal mengonversi gambar. Silakan coba file lain.");
        setIsConverting(false);
      }
    };

    img.onerror = () => {
      setError("Gagal memuat gambar asal.");
      setIsConverting(false);
    };
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadImage = () => {
    if (!convertedUrl || !selectedFile) return;

    const link = document.createElement("a");
    const originalNameWithoutExt = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
    const ext = targetFormat === "image/webp" ? "webp" : targetFormat === "image/png" ? "png" : "jpg";

    link.download = `${originalNameWithoutExt}_converted.${ext}`;
    link.href = convertedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savingPercent = originalSize && convertedSize 
    ? Math.round(((originalSize - convertedSize) / originalSize) * 100) 
    : 0;

  return (
    <div id="webp-converter" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <FileImage className="w-5 h-5 text-[#FF4F7B]" />
          Convert Gambar WebP
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Ubah gambar JPG/PNG Anda menjadi WebP untuk optimasi loading web dan SEO, atau konversi balik dari WebP ke PNG/JPG secara aman 100% lokal di browser Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Column */}
        <div className="flex flex-col gap-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[220px] ${
              isDragOver
                ? "border-[#FF4F7B] bg-[#FFF6F8]"
                : "border-[#ECECEC] hover:border-[#FF4F7B] hover:bg-[#FFF6F8]/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#FFF6F8] flex items-center justify-center mb-4 text-[#FF4F7B]">
              <Upload className="w-6 h-6" />
            </div>
            {selectedFile ? (
              <div className="space-y-1">
                <p className="font-semibold text-sm text-[#202124] max-w-[280px] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-[#6B7280]">
                  Ukuran: {formatSize(originalSize)}
                </p>
                <p className="text-xs text-[#FF4F7B] font-medium pt-1">
                  Klik atau seret file lain untuk mengganti
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-sm text-[#202124] mb-1">
                  Pilih atau seret gambar Anda di sini
                </p>
                <p className="text-xs text-[#6B7280]">
                  Mendukung PNG, JPG, JPEG, dan WebP (Maks. 10MB)
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {originalUrl && (
            <div className="border border-[#ECECEC] rounded-2xl p-4 bg-gray-50/50">
              <div className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Preview Gambar Asal</div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-[#ECECEC] flex items-center justify-center shrink-0">
                  <img src={originalUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#202124] flex justify-between">
                      <span>Format Target:</span>
                      <span className="text-[#FF4F7B] uppercase font-bold">{targetFormat.split("/")[1]}</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTargetFormat("image/webp")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                          targetFormat === "image/webp"
                            ? "bg-[#FF4F7B] text-white"
                            : "bg-white border border-[#ECECEC] text-[#6B7280] hover:bg-gray-100"
                        }`}
                      >
                        WEBP
                      </button>
                      <button
                        onClick={() => setTargetFormat("image/png")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                          targetFormat === "image/png"
                            ? "bg-[#FF4F7B] text-white"
                            : "bg-white border border-[#ECECEC] text-[#6B7280] hover:bg-gray-100"
                        }`}
                      >
                        PNG
                      </button>
                      <button
                        onClick={() => setTargetFormat("image/jpeg")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                          targetFormat === "image/jpeg"
                            ? "bg-[#FF4F7B] text-white"
                            : "bg-white border border-[#ECECEC] text-[#6B7280] hover:bg-gray-100"
                        }`}
                      >
                        JPG
                      </button>
                    </div>
                  </div>

                  {targetFormat === "image/webp" || targetFormat === "image/jpeg" ? (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-[#6B7280] mb-1 font-medium">
                        <span>Kualitas Konversi:</span>
                        <span className="font-bold text-[#202124]">{Math.round(quality * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full accent-[#FF4F7B] cursor-pointer"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                onClick={convertImage}
                disabled={isConverting}
                className="w-full mt-4 py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sedang Mengonversi...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Mulai Konversi Gambar
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col justify-between border border-[#ECECEC] rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/20">
          {convertedUrl ? (
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Berhasil Dikonversi!</span>
                </div>

                <div className="flex items-center gap-6 p-4 bg-[#FFF6F8] rounded-xl border border-[#FF4F7B]/10">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-[#ECECEC] flex items-center justify-center shrink-0 shadow-sm">
                    <img src={convertedUrl} alt="Converted preview" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-[#6B7280]">Ukuran Akhir: <strong className="text-[#202124]">{formatSize(convertedSize)}</strong></p>
                    <p className="text-[#6B7280]">Ukuran Awal: <strong className="text-[#202124]">{formatSize(originalSize)}</strong></p>
                    {savingPercent > 0 ? (
                      <p className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-md inline-block">
                        Hemat {savingPercent}% Ruang Penyimpanan!
                      </p>
                    ) : (
                      <p className="text-[#6B7280] text-xs">
                        Kualitas lebih tinggi / format lossless terpilih.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={downloadImage}
                  className="w-full py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Unduh Gambar Konversi
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setOriginalUrl("");
                    setOriginalSize(0);
                    setConvertedUrl("");
                    setConvertedSize(0);
                  }}
                  className="w-full py-2 px-4 bg-white hover:bg-gray-50 border border-[#ECECEC] text-[#6B7280] text-xs font-semibold rounded-xl transition-all duration-200"
                >
                  Mulai Baru
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#6B7280] min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <FileImage className="w-5 h-5 text-gray-400" />
              </div>
              <p className="font-medium text-sm text-[#202124] mb-1">Hasil Konversi</p>
              <p className="text-xs max-w-[240px]">
                Unggah gambar di panel sebelah kiri dan klik tombol konversi untuk melihat hasilnya di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
