// client/src/components/ui/CardSet.tsx

import { useState, useEffect } from "react";
import TypingSection from "./TypingSection";

interface CardData {
  name: string;
  value: string;
}

interface CardSetProps {
  sectionId: string;
  deckId: string;
  onBack: () => void;
}

export default function CardSet({ sectionId, deckId, onBack }: CardSetProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 💡 FIX: Changed base path from '/decks/' to '/data/'
    const path = `/data/${sectionId}/${deckId}.json`;
    // console.log("Attempting to fetch path:", path);
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`Not found JSON file: ${path}`); // Added path to error message for debugging
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message));
  }, [sectionId, deckId]);

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <p>⚠️ {error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-800 transition"
        >
          ← Back
        </button>
      </div>
    );

  if (cards.length === 0)
    return <p className="text-center text-gray-400 mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-800 transition"
      >
        ← กลับ
      </button>

      {/* Send card to TypingSection */}
      <TypingSection cards={cards} />
    </div>
  );
}
