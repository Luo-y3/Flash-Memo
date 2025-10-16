// client/src/components/ui/CardDecks.tsx

import { SECTIONS } from "../../utils/config";
// 💡 Assume you have defined SectionMeta and DeckMeta in types.ts
import type { DeckMeta, SectionMeta } from "../../utils/types";

interface CardDecksProps {
  sectionId: string;
  onSelectDeck: (deckId: string) => void;
  onBack: () => void;
}

export default function CardDecks({ sectionId, onSelectDeck }: CardDecksProps) {
  const currentSection = SECTIONS.find((s) => s.id === sectionId) as
    | SectionMeta
    | undefined;

  if (!currentSection) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>⚠️ Coming soon.</p>
      </div>
    );
  }

  const decks: DeckMeta[] = currentSection.decks;

  // 💡 FIX: Simplified the deck selection handler to pass deck.id directly.
  const handleSelectDeck = (deckId: string) => {
    onSelectDeck(deckId);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex items-center justify-between w-full max-w-xl mb-6">
        <h2 className="text-2xl font-semibold text-center flex-1">
          Choose Card Set
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => handleSelectDeck(deck.id)} // 💡 CHANGED: Call the simplified handler
            className="px-6 py-4 bg-[var(--color-card)] rounded-xl shadow hover:shadow-lg hover:scale-105 transition text-left flex flex-col"
          >
            <span className="text-lg font-bold">{deck.title}</span>
            {deck.description && (
              <span className="text-sm text-gray-400 mt-1">
                {deck.description}
              </span>
            )}
          </button>
        ))}
        {decks.length === 0 && (
          <p className="col-span-full text-center text-gray-400 mt-6">
            No decks found in this section.
          </p>
        )}
      </div>
    </div>
  );
}
