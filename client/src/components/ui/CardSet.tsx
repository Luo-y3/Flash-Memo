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
}

export default function CardSet({ sectionId, deckId }: CardSetProps) {
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
        <p>⚠️ Coming soon</p>
      </div>
    );

  if (cards.length === 0)
    return <p className="text-center text-gray-400 mt-6">Loading...</p>;

  return (
    <div className="p-6">
      {/* Send card to TypingSection */}
      <TypingSection cards={cards} />
    </div>
  );
}
