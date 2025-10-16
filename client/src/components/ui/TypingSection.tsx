// client/src/components/ui/TypingSection.tsx
import { useState, useEffect, useCallback } from "react";

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
  // State for seen words
  const [seenWords, setSeenWords] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // ⭐️ getNextWord with out seenWords
  const getNextWord = useCallback(
    (currentSeenWords: string[]) => {
      // 1. Filter out words that have already been seen
      const unseenWords = cards.filter(
        (card) => !currentSeenWords.includes(card.name),
      );

      if (unseenWords.length > 0) {
        // 2. Select a random word from the unseen list
        const random = Math.floor(Math.random() * unseenWords.length);
        setCurrentWord(unseenWords[random]);
      } else {
        // 3. All words have been seen, set currentWord to null to indicate completion
        setCurrentWord(null);
      }
      setUserInput("");
      setFeedback("");
      setShowAnswer(false);
    },
    [cards],
  ); // Dependency cards

  // Initial load or when 'cards' changes
  useEffect(() => {
    // Reset the seenWords list when the component mounts or the input 'cards' change
    setSeenWords([]);
    // Get the first word
    getNextWord([]);
  }, [cards, getNextWord]);

  // Function to mark the current word as seen and move to the next
  const moveToNextWord = () => {
    if (!currentWord) return;

    // Use this function to update seenwords
    setSeenWords((prevSeenWords) => {
      const newSeenWords = [...prevSeenWords, currentWord.name];
      // ⭐️ Get next word if it updated
      getNextWord(newSeenWords);
      return newSeenWords;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;

    setShowAnswer(false);

    if (userInput.trim() === currentWord.value.trim()) {
      setFeedback("✅ ถูกต้อง!");
      // On correct answer, immediately mark as seen and move to next
      moveToNextWord();
    } else {
      setFeedback("❌ ลองใหม่อีกครั้ง!");
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback("");
  };

  const handleNextWord = moveToNextWord;

  if (!cards || cards.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">⚠️ ไม่มีคำศัพท์ให้แสดง</p>
    );
  }

  // New check: Stop displaying the section when all words are seen
  if (currentWord === null && cards.length > 0) {
    return (
      <div className="text-center p-6 bg-[--color-card] rounded-2xl shadow-md max-w-md mx-auto mt-6">
        <p className="text-2xl font-bold text-green-500 mb-3">
          🎉 คุณทำครบทุกคำแล้ว!
        </p>
        <p className="text-lg text-[--color-text]">
          คุณได้ฝึกฝนคำศัพท์ครบ {cards.length} คำ
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-[--color-card] rounded-2xl shadow-md max-w-md mx-auto mt-6">
      <p className="text-sm font-medium mb-1 text-gray-500">
        คำที่เหลือ: {cards.length - seenWords.length} / {cards.length}
      </p>
      <p className="text-lg font-medium mb-3 text-[--color-text]">
        แปลคำนี้เป็นภาษาไทย:
      </p>
      <p className="text-3xl font-bold text-[--color-accent] mb-4">
        {currentWord?.name}
      </p>

      {showAnswer ? (
        <div className="w-full text-center">
          <p className="text-xl font-bold text-green-500 mb-4">
            คำตอบ: {currentWord?.value}
          </p>
          <button
            onClick={handleNextWord}
            className="mt-3 w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            คำถัดไป
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="พิมพ์คำตอบที่นี่..."
              className="border border-gray-500 bg-transparent rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
            />

            <div className="flex space-x-2 mt-3">
              <button
                type="submit"
                className="flex-1 bg-[--color-accent] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
              >
                ตอบ
              </button>
              <button
                type="button"
                onClick={handleShowAnswer}
                className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
              >
                เฉลย
              </button>
            </div>
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
        </>
      )}
    </div>
  );
}
