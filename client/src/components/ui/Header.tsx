// client/src/components/ui/Header.tsx
import { User } from "lucide-react";
import "../../pages/index.css";
import "../ui/AuthToggle.tsx"

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  showAuth?: () => void;
}

export default function Header({ onBack, showAuth }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-(--color-surface) shadow-sm">
      <div className="flex items-center gap-3">
        <h1 onClick={onBack} className="text-2xl font-bold text-(--color-text) hover:text-gray-500">
          Flash Memo
        </h1>
      </div>

      <button onClick={showAuth} className="p-2 rounded-full hover:bg-gray-600 transition">
        <User className="w-6 h-6 text-(--color-text)" />
      </button>
    </header>
  );
}
