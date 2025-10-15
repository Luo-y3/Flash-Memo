// client/src/pages/App.tsx

import { useState } from "react";
import Header from "../components/ui/Header";
import SelectSection from "../components/ui/SelectSection";
import LanguageSelector from "../components/ui/LanguageSelector";
import CardDecks from "../components/ui/CardDecks";
import CardSet from "../components/ui/CardSet";

function App() {
  const [mode, setMode] = useState<"create" | "use" | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

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
    <div className="min-h-screen bg-[--color-background] text-[--color-text]">
      <Header />
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
          <CardSet
            sectionId={selectedSection}
            deckId={selectedDeck}
            onBack={handleBack}
          />
        )}

        {mode === "create" && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <p>🛠️ Create mode is under construction...</p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-[--color-card] rounded-lg hover:bg-[--color-accent] transition"
            >
              ← Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
