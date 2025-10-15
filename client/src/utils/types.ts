// client/src/utils/types.ts

export interface CardData {
  name: string;
  value: string;
}

// file path of (Deck)
export interface DeckMeta {
  id: string; // e.g., 'hsk1-th', 'th'
  title: string; // e.g., 'HSK 1 (Chinese)'
  description?: string;
}

// 💡 Add (Section)
export interface SectionMeta {
  id: string; // e.g., 'cn', 'jp'
  title: string; // e.g., 'Chinese', 'Japanese'
  icon?: string; // e.g., '🇨🇳', '🇯🇵' icon
  decks: DeckMeta[]; // list card in section
}
