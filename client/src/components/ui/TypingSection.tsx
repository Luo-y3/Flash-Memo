// client/src/components/ui/TypingSection.tsx
import { useState, useEffect } from "react";

interface CardData {
  name: string;
  value: string;
}

interface TypingSectionProps {
  cards: CardData[];
}

export default function TypingSection({ cards }: TypingSectionProps) {
  const [currentWord, setCurrentWord] = useState<CardData | null>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (cards && cards.length > 0) {
      const random = Math.floor(Math.random() * cards.length);
      setCurrentWord(cards[random]);
    }
  }, [cards]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;

    if (userInput.trim() === currentWord.value.trim()) {
      setFeedback("✅ ถูกต้อง!");
      const next = cards[Math.floor(Math.random() * cards.length)];
      setCurrentWord(next);
      setUserInput("");
    } else {
      setFeedback("❌ ลองใหม่อีกครั้ง!");
    }
  };

  if (!cards || cards.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">⚠️ ไม่มีคำศัพท์ให้แสดง</p>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-[--color-card] rounded-2xl shadow-md max-w-md mx-auto mt-6">
      <p className="text-lg font-medium mb-3 text-[--color-text]">
        แปลคำนี้เป็นภาษาไทย:
      </p>
      <p className="text-3xl font-bold text-[--color-accent] mb-4">
        {currentWord?.name}
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="พิมพ์คำตอบที่นี่..."
          className="border border-gray-500 bg-transparent rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
        />

        <button
          type="submit"
          className="mt-3 w-full bg-[--color-accent] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          ตอบ
        </button>
      </form>

      {feedback && (
        <p
          className={`mt-4 text-base font-medium ${
            feedback.includes("ถูกต้อง") ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
