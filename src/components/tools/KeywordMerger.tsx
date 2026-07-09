import React, { useState } from "react";
import { Combine, Copy, Check, Download, RefreshCw, Trash2, Sliders, Info } from "lucide-react";

export default function KeywordMerger() {
  const [listA, setListA] = useState<string>("beli\nsewa\njasa\ncari");
  const [listB, setListB] = useState<string>("rumah\napartemen\nruko\ntanah");
  const [listC, setListC] = useState<string>("murah\njakarta\ndekat stasiun\nminimalis");
  const [matchBroad, setMatchBroad] = useState<boolean>(true);
  const [matchPhrase, setMatchPhrase] = useState<boolean>(false);
  const [matchExact, setMatchExact] = useState<boolean>(false);
  const [matchModifier, setMatchModifier] = useState<boolean>(false);
  const [mergedResults, setMergedResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const clearLists = () => {
    setListA("");
    setListB("");
    setListC("");
    setMergedResults([]);
  };

  const mergeKeywords = () => {
    const arrayA = listA.split("\n").map(s => s.trim()).filter(Boolean);
    const arrayB = listB.split("\n").map(s => s.trim()).filter(Boolean);
    const arrayC = listC.split("\n").map(s => s.trim()).filter(Boolean);

    if (arrayA.length === 0 && arrayB.length === 0) {
      return;
    }

    const baseMerged: string[] = [];

    // Loop through List A and B (required, if C is empty we just merge A and B)
    const itemsA = arrayA.length > 0 ? arrayA : [""];
    const itemsB = arrayB.length > 0 ? arrayB : [""];
    const itemsC = arrayC.length > 0 ? arrayC : [""];

    for (const a of itemsA) {
      for (const b of itemsB) {
        for (const c of itemsC) {
          const words = [a, b, c].map(s => s.trim()).filter(Boolean);
          if (words.length > 0) {
            baseMerged.push(words.join(" "));
          }
        }
      }
    }

    // Apply Google Ads / SEO Match Types
    const finalMerged: string[] = [];
    const uniqueBase = Array.from(new Set(baseMerged));

    for (const kw of uniqueBase) {
      if (matchBroad) {
        finalMerged.push(kw);
      }
      if (matchPhrase) {
        finalMerged.push(`"${kw}"`);
      }
      if (matchExact) {
        finalMerged.push(`[${kw}]`);
      }
      if (matchModifier) {
        const modKw = kw.split(" ").map(w => `+${w}`).join(" ");
        finalMerged.push(modKw);
      }
    }

    setMergedResults(finalMerged);
  };

  const copyToClipboard = () => {
    if (mergedResults.length === 0) return;
    navigator.clipboard.writeText(mergedResults.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    if (mergedResults.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,Keyword\n" + mergedResults.map(e => `"${e.replace(/"/g, '""')}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `prajurit_digital_merged_keywords_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="keyword-merger" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <Combine className="w-5 h-5 text-[#FF4F7B]" />
          Penggabung Kata Kunci
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Sangat cocok untuk riset Google Ads dan SEO lokal. Masukkan daftar kata kunci di setiap kolom, pilih tipe kecocokan (match type), dan gabungkan secara instan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* List A */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
            <span>Daftar Kata A (Mulai)</span>
            <span className="text-xs text-[#FF4F7B] font-semibold">{listA.split("\n").filter(Boolean).length} kata</span>
          </label>
          <textarea
            value={listA}
            onChange={(e) => setListA(e.target.value)}
            className="w-full h-40 p-3.5 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-xs font-mono resize-y"
            placeholder="Contoh:&#10;beli&#10;sewa&#10;jasa"
          />
        </div>

        {/* List B */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
            <span>Daftar Kata B (Tengah)</span>
            <span className="text-xs text-[#FF4F7B] font-semibold">{listB.split("\n").filter(Boolean).length} kata</span>
          </label>
          <textarea
            value={listB}
            onChange={(e) => setListB(e.target.value)}
            className="w-full h-40 p-3.5 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-xs font-mono resize-y"
            placeholder="Contoh:&#10;rumah&#10;apartemen&#10;ruko"
          />
        </div>

        {/* List C */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
            <span>Daftar Kata C (Akhir)</span>
            <span className="text-xs text-[#FF4F7B] font-semibold">{listC.split("\n").filter(Boolean).length} kata</span>
          </label>
          <textarea
            value={listC}
            onChange={(e) => setListC(e.target.value)}
            className="w-full h-40 p-3.5 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-xs font-mono resize-y"
            placeholder="Contoh:&#10;murah&#10;jakarta&#10;minimalis"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Configuration */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-gray-50/50 border border-[#ECECEC] p-5 rounded-2xl">
          <h4 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#FF4F7B]" />
            Pengaturan Match Type
          </h4>

          <div className="space-y-2.5">
            <label className="flex items-center gap-3.5 text-xs text-[#202124] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={matchBroad}
                onChange={(e) => setMatchBroad(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-[#FF4F7B] accent-[#FF4F7B]"
              />
              <div>
                <p className="font-semibold text-gray-800">Broad Match</p>
                <p className="text-[10px] text-gray-500">Hasil: keyword asli</p>
              </div>
            </label>

            <label className="flex items-center gap-3.5 text-xs text-[#202124] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={matchPhrase}
                onChange={(e) => setMatchPhrase(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-[#FF4F7B] accent-[#FF4F7B]"
              />
              <div>
                <p className="font-semibold text-gray-800">Phrase Match</p>
                <p className="text-[10px] text-gray-500">Hasil: "keyword asli"</p>
              </div>
            </label>

            <label className="flex items-center gap-3.5 text-xs text-[#202124] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={matchExact}
                onChange={(e) => setMatchExact(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-[#FF4F7B] accent-[#FF4F7B]"
              />
              <div>
                <p className="font-semibold text-gray-800">Exact Match</p>
                <p className="text-[10px] text-gray-500">Hasil: [keyword asli]</p>
              </div>
            </label>

            <label className="flex items-center gap-3.5 text-xs text-[#202124] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={matchModifier}
                onChange={(e) => setMatchModifier(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-[#FF4F7B] accent-[#FF4F7B]"
              />
              <div>
                <p className="font-semibold text-gray-800">Broad Match Modifier</p>
                <p className="text-[10px] text-gray-500">Hasil: +keyword +asli</p>
              </div>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={mergeKeywords}
              className="flex-1 py-3 px-4 bg-[#FF4F7B] hover:bg-[#F33967] text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Gabungkan Kata
            </button>
            <button
              onClick={clearLists}
              className="py-3 px-3 bg-white hover:bg-red-50 border border-[#ECECEC] hover:border-red-200 text-[#6B7280] hover:text-red-600 rounded-xl transition-all duration-150 cursor-pointer"
              title="Kosongkan Semua"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 border border-[#ECECEC] rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50/20">
          <div className="flex justify-between items-center pb-3 border-b border-[#ECECEC] mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Kombinasi Terbentuk ({mergedResults.length})
            </span>
            {mergedResults.length > 0 && (
              <div className="flex gap-3">
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
                      Salin
                    </>
                  )}
                </button>
                <button
                  onClick={downloadCSV}
                  className="text-xs text-[#2563EB] hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Ekspor CSV
                </button>
              </div>
            )}
          </div>

          {mergedResults.length > 0 ? (
            <textarea
              readOnly
              value={mergedResults.join("\n")}
              className="w-full h-44 p-3.5 rounded-xl border border-[#ECECEC] bg-gray-50/50 outline-none text-[#202124] text-xs font-mono leading-relaxed"
            />
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-center text-[#6B7280]">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                <Combine className="w-4 h-4 text-gray-400" />
              </div>
              <p className="font-semibold text-xs text-[#202124] mb-0.5">Hasil Penggabungan</p>
              <p className="text-[10px] max-w-[240px]">
                Isi kolom kata di atas, pilih match type, lalu klik tombol Gabungkan Kata untuk melihat hasilnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
