// import React from "react";

// src/components/Header.tsx
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-sm">
      {/* Web Name */}
      <h1 className="text-2xl font-bold text-white">Flash Memo</h1>

      {/* Profile icon */}
      <button className="p-2 rounded-full hover:bg-gray-600 transition">
        <User className="w-6 h-6 text-white" />
      </button>
    </header>
  );
}
