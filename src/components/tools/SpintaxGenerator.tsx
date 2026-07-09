import React, { useState } from "react";
import { Shuffle, Copy, Check, Info, FileText, AlertCircle, RefreshCw } from "lucide-react";

export default function SpintaxGenerator() {
  const [inputText, setInputText] = useState<string>(
    "{Halo|Hai|Selamat pagi} {kawan|rekan-rekan|teman-teman} {prajurit|pejuang} digital, mari kita {belajar|mulai|tingkatkan} produktivitas dengan tools {online|praktis} ini!"
  );
  const [spinResults, setSpinResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [combCount, setCombCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  // Helper to calculate total combinations
  const calculateCombinations = (text: string): number => {
    try {
      let count = 1;
      const regex = /\{([^{}]+)\}/g;
      let match;
      let hasMatches = false;

      while ((match = regex.exec(text)) !== null) {
        hasMatches = true;
        const choices = match[1].split("|");
        count *= choices.length;
        if (count > 50000) return 50000; // Limit calculations to prevent overflow
      }

      return hasMatches ? count : 0;
    } catch {
      return 0;
    }
  };

  // Helper to spin a single text
  const spinTextOnce = (text: string): string => {
    const regex = /\{([^{}]+)\}/;
    let spun = text;
    let match;

    while ((match = regex.exec(spun)) !== null) {
      const choices = match[1].split("|");
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      spun = spun.replace(match[0], randomChoice);
    }

    return spun;
  };

  // Helper to generate all combinations
  const generateAllCombinations = (text: string): string[] => {
    const regex = /\{([^{}]+)\}/;
    const match = regex.exec(text);

    if (!match) {
      return [text];
    }

    const before = text.substring(0, match.index);
    const after = text.substring(match.index + match[0].length);
    const choices = match[1].split("|");

    let results: string[] = [];
    for (const choice of choices) {
      const combinationsOfAfter = generateAllCombinations(after);
      for (const comb of combinationsOfAfter) {
        results.push(before + choice + comb);
      }
    }

    return results;
  };

  const handleTextChange = (val: string) => {
    setInputText(val);
    setError("");
    const count = calculateCombinations(val);
    setCombCount(count);
  };

  const spinSingle = () => {
    if (!inputText.trim()) return;
    setError("");
    const result = spinTextOnce(inputText);
    setSpinResults([result]);
  };

  const spinBulk = () => {
    if (!inputText.trim()) return;
    setError("");
    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      results.push(spinTextOnce(inputText));
    }
    // Remove duplicates
    const unique = Array.from(new Set(results));
    setSpinResults(unique);
  };

  const spinAll = () => {
    if (!inputText.trim()) return;
    setError("");
    const totalCombs = calculateCombinations(inputText);

    if (totalCombs === 0) {
      setError("Format Spintax tidak ditemukan atau tidak valid. Gunakan kurung kurawal seperti {halo|hai}.");
      return;
    }

    if (totalCombs > 150) {
      setError(`Jumlah kombinasi terlalu besar (${totalCombs}). Maksimal kombinasi yang dapat digenerate sekaligus adalah 150 untuk mencegah performa browser menurun.`);
      return;
    }

    const results = generateAllCombinations(inputText);
    setSpinResults(results);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllToClipboard = () => {
    if (spinResults.length === 0) return;
    const textToCopy = spinResults.join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Initial calculation
  React.useEffect(() => {
    const count = calculateCombinations(inputText);
    setCombCount(count);
  }, []);

  return (
    <div id="spintax-generator" className="bg-white rounded-3xl p-6 md:p-8 border border-[#ECECEC] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-[#FF4F7B]" />
          Spintax Generator
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Gunakan format kurung kurawal dan garis tegak <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#FF4F7B] text-xs">{"{opsi1|opsi2|opsi3}"}</code> untuk menghasilkan variasi artikel atau kalimat penawaran yang unik secara otomatis demi keperluan content marketing dan SEO.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex justify-between">
              <span>Input Spintax Teks</span>
              {combCount > 0 && (
                <span className="text-[#FF4F7B] font-bold">
                  {combCount >= 50000 ? "50.000+" : combCount} Kemungkinan Kombinasi
                </span>
              )}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full h-48 p-4 rounded-xl border border-[#ECECEC] focus:border-[#FF4F7B] focus:ring-1 focus:ring-[#FF4F7B] outline-none text-[#202124] text-sm leading-relaxed font-sans resize-y"
              placeholder="Masukkan teks Anda di sini dengan format spintax {pilihan1|pilihan2}."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={spinSingle}
              className="py-3 px-2 bg-gray-50 hover:bg-gray-100 border border-[#ECECEC] text-[#202124] text-xs font-bold rounded-xl transition-all duration-150 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-[#FF4F7B]" />
              Spin 1 Kali
            </button>
            <button
              onClick={spinBulk}
              className="py-3 px-2 bg-gray-50 hover:bg-gray-100 border border-[#ECECEC] text-[#202124] text-xs font-bold rounded-xl transition-all duration-150 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#FF4F7B]" />
              Spin 10 Variasi
            </button>
            <button
              onClick={spinAll}
              className="py-3 px-2 bg-[#FFF6F8] hover:bg-[#FFEBF0] border border-[#FF4F7B]/20 text-[#FF4F7B] text-xs font-bold rounded-xl transition-all duration-150 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Semua Kombinasi
            </button>
          </div>

          <div className="flex gap-2 p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-[#2563EB] leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Tips:</span> Anda dapat menumpuk spintax bersarang, namun pastikan setiap tanda kurung kurawal buka <code className="bg-white/80 px-0.5 rounded">{"{"}</code> memiliki kurung tutup <code className="bg-white/80 px-0.5 rounded">{"}"}</code> yang sesuai.
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="flex flex-col justify-between border border-[#ECECEC] rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/20">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-[#ECECEC] mb-4">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Hasil Spin ({spinResults.length})
              </span>
              {spinResults.length > 1 && (
                <button
                  onClick={copyAllToClipboard}
                  className="text-xs text-[#FF4F7B] hover:text-[#F33967] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
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
              )}
            </div>

            {spinResults.length > 0 ? (
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-3 pr-1">
                {spinResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50/70 border border-[#ECECEC] rounded-xl relative group hover:border-[#FF4F7B]/20 hover:bg-white transition-all duration-150"
                  >
                    <p className="text-[#202124] text-xs leading-relaxed pr-8">{result}</p>
                    <button
                      onClick={() => copyToClipboard(result, idx)}
                      className="absolute right-2 top-2 p-1.5 rounded-lg text-gray-400 hover:text-[#FF4F7B] hover:bg-[#FFF6F8] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                      title="Salin Kalimat Ini"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[#6B7280] min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Shuffle className="w-5 h-5 text-gray-400" />
                </div>
                <p className="font-medium text-sm text-[#202124] mb-1">Hasil Spin Anda</p>
                <p className="text-xs max-w-[240px]">
                  Tulis kalimat spintax Anda dan klik tombol aksi di kiri untuk menghasilkan kalimat baru yang unik.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
