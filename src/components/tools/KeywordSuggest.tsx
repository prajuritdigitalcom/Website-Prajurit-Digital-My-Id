import React, { useState } from "react";
import { Search, Copy, Check, TrendingUp, AlertCircle, RefreshCw, Layers } from "lucide-react";

export default function KeywordSuggest() {
  const [seedKeyword, setSeedKeyword] = useState<string>("cara memulai bisnis online");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedSelected, setCopiedSelected] = useState<boolean>(false);

  const fetchSuggestions = async () => {
    if (!seedKeyword.trim()) return;
    setIsLoading(true);
    setError("");
    setSelectedKeywords([]);

    try {
      const res = await fetch(`/api/keyword-suggest?q=${encodeURIComponent(seedKeyword)}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil data dari server suggest.");
      }
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat keyword pelengkap otomatis. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (kw: string) => {
    if (selectedKeywords.includes(kw)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== kw));
    } else {
      setSelectedKeywords([...selectedKeywords, kw]);
    }
  };

  const selectAll = () => {
    if (selectedKeywords.length === suggestions.length) {
      setSelectedKeywords([]);
    } else {
      setSelectedKeywords([...suggestions]);
    }
  };

  const copyAll = () => {
    if (suggestions.length === 0) return;
    navigator.clipboard.writeText(suggestions.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySelected = () => {
    if (selectedKeywords.length === 0) return;
    navigator.clipboard.writeText(selectedKeywords.join("\n"));
    setCopiedSelected(true);
    setTimeout(() => setCopiedSelected(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchSuggestions();
    }
  };

  return (
    <div id="keyword-suggest" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#FF4F7B]" />
          Riset Keyword Google Suggest
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Ambil kata kunci ekor panjang (long-tail keywords) langsung dari database autocomplete Google. Sangat ampuh untuk menemukan topik artikel blog yang sering dicari audiens Anda.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-[#ECECEC] focus:bg-white focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] rounded-2xl outline-none text-sm text-[#202124] font-medium transition-all"
            placeholder="Masukkan kata kunci dasar (contoh: cara belajar seo)"
          />
        </div>
        <button
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="px-6 py-3.5 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-sm font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shrink-0"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Mencari...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Riset Keyword
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium mb-6">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="border border-[#ECECEC] rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/20">
        {/* Table/List Actions */}
        {suggestions.length > 0 && (
          <div className="flex flex-wrap justify-between items-center gap-3 p-4 bg-gray-50/60 border-b border-[#ECECEC]">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedKeywords.length === suggestions.length && suggestions.length > 0}
                  onChange={selectAll}
                  className="w-4 h-4 accent-[#FF4F7B] rounded"
                />
                Pilih Semua
              </label>
              <span className="text-xs text-gray-500">
                {selectedKeywords.length} terpilih dari {suggestions.length} hasil
              </span>
            </div>

            <div className="flex gap-2">
              {selectedKeywords.length > 0 && (
                <button
                  onClick={copySelected}
                  className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-[#ECECEC] text-[#202124] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF4F7B]" />
                      Salin Terpilih
                    </>
                  )}
                </button>
              )}
              <button
                onClick={copyAll}
                className="px-3 py-1.5 bg-[#FFF6F8] hover:bg-[#FFEBF0] border border-[#FF4F7B]/10 text-[#FF4F7B] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Salin Semua
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Suggestion Rows */}
        {suggestions.length > 0 ? (
          <div className="max-h-[350px] overflow-y-auto divide-y divide-[#ECECEC]">
            {suggestions.map((kw, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-3.5 px-5 py-3 text-sm text-[#202124] cursor-pointer hover:bg-gray-50/50 transition-colors ${
                  selectedKeywords.includes(kw) ? "bg-[#FFF6F8]/20" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedKeywords.includes(kw)}
                  onChange={() => handleCheckboxChange(kw)}
                  className="w-4 h-4 accent-[#FF4F7B] rounded shrink-0"
                />
                <span className="font-medium">{kw}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center text-[#6B7280]">
            <div className="w-12 h-12 rounded-full bg-[#FFF6F8] flex items-center justify-center mb-3 text-[#FF4F7B]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm text-[#202124] mb-1">Cari Kata Kunci</p>
            <p className="text-xs max-w-[280px]">
              Tulis kata kunci dasar (seed keyword) di atas lalu klik tombol Riset Keyword untuk melihat saran kata kunci populer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
