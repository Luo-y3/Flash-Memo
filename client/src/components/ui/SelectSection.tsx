// client/src/components/ui/SelectSection.tsx
import { BookOpen, PlusCircle } from "lucide-react";

interface SelectSectionProps {
  onSelectSection: (mode: "create" | "use") => void;
}

export default function SelectSection({ onSelectSection }: SelectSectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[--color-surface] text-[--color-text]">
      <h1 className="text-3xl font-bold mb-6">Select to Start</h1>
      <p className="text-lg text-gray-400 mb-10">What do you want ?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-6">
        {/* Card: Create */}
        <button
          onClick={() => onSelectSection("create")}
          className="group bg-[--color-card] hover:bg-[--color-accent] text-[--color-text] transition-all duration-300 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center border border-[--color-border] hover:scale-105"
        >
          <PlusCircle className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-semibold">Create the Card</h2>
          <p className="text-sm text-gray-400 mt-2">
            Create a card that you want
          </p>
        </button>

        {/* Card: Use Existing */}
        <button
          onClick={() => onSelectSection("use")}
          className="group bg-[--color-card] hover:bg-[--color-accent] text-[--color-text] transition-all duration-300 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center border border-[--color-border] hover:scale-105"
        >
          <BookOpen className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-semibold">Use the Card</h2>
          <p className="text-sm text-gray-400 mt-2">
            Use the card set by default or your card
          </p>
        </button>
      </div>
    </div>
  );
}
