// client/src/components/ui/TextInput.jsx
import { useState } from "react";

interface TextInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

export default function TextInput({ placeholder, onSubmit }: TextInputProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type your answer..."}
        className="w-full px-4 py-3 bg-var(--color-surface) border border-(--color-border)
                   text-(--color-text) rounded-xl shadow-sm
                   placeholder:text-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-(--color-accent) focus:border-transparent transition"
      />
      <button
        onClick={() => {
          if (onSubmit) onSubmit(value.trim());
          setValue("");
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium
                   text-white bg-(--color-accent) rounded-lg shadow hover:opacity-90
                   active:scale-95 transition"
      >
        Send
      </button>
    </div>
  );
}
