// client/src/pages/App.tsx

// client/src/pages/App.tsx

import { useState } from "react";
import Header from "../components/ui/Header";
import SelectSection from "../components/ui/SelectSection";
import LanguageSelector from "../components/ui/LanguageSelector";
import CardDecks from "../components/ui/CardDecks";
import CardSet from "../components/ui/CardSet";
// เปลี่ยนชื่อ import ให้ตรงกับไฟล์ที่แก้ใหม่
import AuthToggle from "../components/ui/AuthToggle.tsx";

function App() {
  const [mode, setMode] = useState<"create" | "use" | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  // 1. เพิ่ม State สำหรับเปิด/ปิดหน้า Auth Modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSelectSection = (selectedMode: "create" | "use") => {
    setMode(selectedMode);
    if (selectedMode === "use") {
      setSelectedSection(null);
      setSelectedDeck(null);
    }
  };

  const handleSelectLanguage = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleSelectDeck = (deckId: string) => {
    setSelectedDeck(deckId);
  };

  const handleBack = () => {
    if (selectedDeck) {
      setSelectedDeck(null);
    } else if (selectedSection) {
      setSelectedSection(null);
    } else {
      setMode(null);
    }
  };


  return (
    // เพิ่ม relative เพื่อให้ Modal วางทับได้ถูกต้อง
    <div className="min-h-screen bg-(--color-bg) text-(--color-text) relative">

      {/* 2. ส่ง prop showAuth ไปที่ Header เพื่อให้ปุ่ม User ทำงาน */}
      <Header
        onBack={handleBack}
        showAuth={() => setIsAuthOpen(true)}
      />

      <main className="p-6">
        {!mode && <SelectSection onSelectSection={handleSelectSection} />}

        {mode === "use" && !selectedSection && (
          <LanguageSelector
            onSelectLanguage={handleSelectLanguage}
            onBack={handleBack}
          />
        )}

        {mode === "use" && selectedSection && !selectedDeck && (
          <CardDecks
            sectionId={selectedSection}
            onSelectDeck={handleSelectDeck}
            onBack={handleBack}
          />
        )}

        {mode === "use" && selectedSection && selectedDeck && (
          <CardSet sectionId={selectedSection} deckId={selectedDeck} />
        )}

        {mode === "create" && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <p>🛠️ Create mode is under construction...</p>
          </div>
        )}
      </main>

      {/* 3. แสดง AuthToggle เป็น Modal เมื่อ isAuthOpen เป็น true */}
      {isAuthOpen && (
        <AuthToggle onClose={() => setIsAuthOpen(false)} />
      )}
    </div>
  );
}

export default App;
