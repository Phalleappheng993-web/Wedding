import guestList from "../data/guests.json";
import type { Guest } from "../types";

const STORE = "wedding_guest";
const guests = guestList as Guest[];

/** ?g=G004 → known guest · ?guest=Name → free-form name · else saved name */
export function guestFromUrl(): Guest | null {
  const p = new URLSearchParams(window.location.search);

  const id = p.get("g")?.trim().toLowerCase();
  if (id) {
    const found = guests.find((g) => g.id?.toLowerCase() === id);
    if (found) return found;
  }

  const name = p.get("guest")?.trim();
  if (name) return { name: name.slice(0, 60) };

  try {
    const saved = localStorage.getItem(STORE);
    if (saved) return { name: saved.slice(0, 60) };
  } catch {
    /* storage unavailable */
  }
  return null;
}

export function rememberGuestName(name: string) {
  try {
    localStorage.setItem(STORE, name);
  } catch {
    /* ignore */
  }
}

export const guestKey = (g: Guest) =>
  g.id ?? g.name.toLowerCase().trim().replace(/\s+/g, "-");
