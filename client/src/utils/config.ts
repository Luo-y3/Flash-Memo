// client/src/config.ts (ตัวอย่าง)
// import type { SectionMeta } from "./types";

export const SECTIONS = [
  {
    id: "cn",
    title: "Chinese (Mandarin)",
    icon: "🇨🇳",
    decks: [
      {
        id: "hsk1-th",
        title: "HSK Level 1 (Thai)",
        description: "50 common words.",
      },
      {
        id: "hsk2-th",
        title: "HSK Level 2 (Thai)",
        description: "100 common words.",
      },
    ],
  },
  {
    id: "jp",
    title: "Japanese",
    icon: "🇯🇵",
    decks: [
      {
        id: "th",
        title: "Japanese Basic (Thai)",
        description: "Basic vocabulary.",
      },
    ],
  },
];
