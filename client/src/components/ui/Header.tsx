// client/src/components/ui/Header.tsx
import { ArrowLeft, User } from "lucide-react";
import "../../pages/index.css";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ showBack, onBack }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-(--color-surface) shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-600 transition"
          >
            <ArrowLeft className="w-5 h-5 text-(--color-text)" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-(--color-text)">
          Flash Memo
        </h1>
      </div>

      <button className="p-2 rounded-full hover:bg-gray-600 transition">
        <User className="w-6 h-6 text-(--color-text)" />
      </button>
    </header>
  );
}
