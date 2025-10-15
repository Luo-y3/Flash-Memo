// client/src/components/ui/LanguageSelector.tsx

import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";

interface LanguageSelectorProps {
  onSelectLanguage: (sectionId: string) => void;
  onBack: () => void;
}

interface Language {
  code: string; // 'cn', 'jp', 'en' (ใช้เป็น sectionId)
  name: string;
  flag: string;
}

export default function LanguageSelector({
  onSelectLanguage,
  onBack,
}: LanguageSelectorProps) {
  const [mainLang, setMainLang] = useState<Language>({
    code: "cn", // ค่าเริ่มต้นเป็น Chinese
    name: "中文 (Chinese)",
    flag: "🇨🇳",
  });
  const [mainOpen, setMainOpen] = useState<boolean>(false);

  // 💡 ตัด state และ logic ของ subLang ออก

  const practiceLanguages: Language[] = [
    // 💡 เหลือเฉพาะภาษาที่ต้องการให้ผู้ใช้เลือกเป็น Section ID
    { code: "cn", name: "中文 (Chinese)", flag: "🇨🇳" },
    { code: "jp", name: "日本語 (Japanese)", flag: "🇯🇵" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const handleMainSelect = (lang: Language): void => {
    setMainLang(lang);
    setMainOpen(false);
  };

  const handleStartPractice = () => {
    // ส่ง Section ID หลัก (mainLang.code) กลับไปให้ App.tsx
    onSelectLanguage(mainLang.code);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Select Mode
        </button>

        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Select Main Language
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Choose the language you want to study (Translation will be Thai 🇹🇭)
        </p>

        {/* Main Language Selector (Section ID) */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Practice Language (Section ID)
          </label>
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={() => setMainOpen(!mainOpen)}
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 flex items-center justify-between hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mainLang.flag}</span>
                <span className="font-medium text-white">{mainLang.name}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${mainOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {mainOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                {practiceLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleMainSelect(lang)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-indigo-700 transition-colors border-b border-gray-600 last:border-0 ${
                      lang.code === mainLang.code ? "bg-indigo-600" : ""
                    }`}
                  >
                    <span className="text-3xl">{lang.flag}</span>
                    <span className="font-medium text-white">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 💡 แสดงภาษาแปล (ไทย) แบบคงที่ */}
        <div className="mb-8 p-4 bg-gray-700 rounded-lg border border-gray-600 text-white text-center">
          <p className="text-sm font-semibold text-gray-400 mb-1">
            Translation Language
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl">🇹🇭</span>
            <span className="font-bold">ไทย (Thai)</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartPractice}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200 text-xl shadow-lg shadow-indigo-500/50"
        >
          Continue to Decks
        </button>
      </div>
    </div>
  );
}
