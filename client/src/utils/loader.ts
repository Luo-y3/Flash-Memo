// client/src/utils/loader.ts
import type { CardData } from "./types";

export async function loadCardSet(path: string): Promise<CardData[]> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Not found ${path}`);
  return res.json();
}
