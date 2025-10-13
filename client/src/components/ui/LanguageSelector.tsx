// client/src/components/ui/LanguageSelector.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default function LanguageSelector() {
  const [mainLang, setMainLang] = useState<Language>({
    code: "en",
    name: "English",
    flag: "🇬🇧",
  });
  const [subLang, setSubLang] = useState<Language>({
    code: "th",
    name: "Thai",
    flag: "🇹🇭",
  });
  const [mainOpen, setMainOpen] = useState<boolean>(false);
  const [subOpen, setSubOpen] = useState<boolean>(false);

  const languages: Language[] = [
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "cn", name: "中文", flag: "🇨🇳" },
    { code: "jp", name: "日本語", flag: "🇯🇵" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const getAvailableSubLanguages = (): Language[] => {
    return languages.filter((lang) => lang.code !== mainLang.code);
  };

  const handleMainSelect = (lang: Language): void => {
    setMainLang(lang);
    if (lang.code === subLang.code) {
      const available = languages.filter((l) => l.code !== lang.code);
      setSubLang(available[0]);
    }
    setMainOpen(false);
  };

  const handleSubSelect = (lang: Language): void => {
    setSubLang(lang);
    setSubOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Language Practice
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Select your languages to start learning
        </p>

        {/* Main Language Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Practice Language
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setMainOpen(!mainOpen);
                setSubOpen(false);
              }}
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

            {mainOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg shadow-lg overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleMainSelect(lang)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-0 ${
                      lang.code === mainLang.code ? "bg-gray-600" : ""
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

        {/* Translation Language Selector */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Translate To
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setSubOpen(!subOpen);
                setMainOpen(false);
              }}
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 flex items-center justify-between hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{subLang.flag}</span>
                <span className="font-medium text-white">{subLang.name}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${subOpen ? "rotate-180" : ""}`}
              />
            </button>

            {subOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg shadow-lg overflow-hidden">
                {getAvailableSubLanguages().map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSubSelect(lang)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-0 ${
                      lang.code === subLang.code ? "bg-gray-600" : ""
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

        {/* Display Selection */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">You're learning</p>
            <div className="flex items-center justify-center gap-3 text-2xl font-bold mb-4">
              <span className="text-4xl">{mainLang.flag}</span>
              <span>{mainLang.name}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <span>translating to</span>
              <span className="text-2xl">{subLang.flag}</span>
              <span className="font-semibold">{subLang.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
