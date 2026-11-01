import { useEffect, useState } from "react";
import type { Phase } from "../types";

/** Before / on / after the wedding day (Cambodia time). Test with ?phase=today */
export function getPhase(dateIso: string): Phase {
  const forced = new URLSearchParams(window.location.search).get("phase");
  if (forced === "before" || forced === "today" || forced === "after") return forced;

  const dayStart = new Date(`${dateIso.slice(0, 10)}T00:00:00+07:00`).getTime();
  const now = Date.now();
  if (now < dayStart) return "before";
  if (now < dayStart + 86_400_000) return "today";
  return "after";
}

export function usePhase(dateIso: string): Phase {
  const [phase, setPhase] = useState(() => getPhase(dateIso));
  useEffect(() => {
    const id = setInterval(() => setPhase(getPhase(dateIso)), 60_000);
    return () => clearInterval(id);
  }, [dateIso]);
  return phase;
}

/** Absolute time of a schedule item on the wedding day */
export function eventTime(dateIso: string, hhmm: string): number {
  return new Date(`${dateIso.slice(0, 10)}T${hhmm}:00+07:00`).getTime();
}

export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/** Index of the event happening now (-1 if none) and the next one (-1 if none) */
export function scheduleState(dateIso: string, times: string[], now: number) {
  const ms = times.map((t) => eventTime(dateIso, t));
  let current = -1;
  ms.forEach((t, i) => {
    if (t <= now) current = i;
  });
  // the last event counts as "now" for 3 hours only
  if (current === ms.length - 1 && now > ms[current] + 3 * 3_600_000) current = -1;
  const next = ms.findIndex((t) => t > now);
  return { current, next };
}
