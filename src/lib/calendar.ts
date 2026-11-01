import type { Lang, Wedding } from "../types";

const stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
const DURATION = 5 * 3_600_000; // 5 hours

function parts(w: Wedding, lang: Lang) {
  const start = new Date(w.date).getTime();
  return {
    start,
    end: start + DURATION,
    title: `${w.groom[lang]} & ${w.bride[lang]} · Wedding`,
    place: `${w.venue[lang]}, ${w.address[lang]}`,
  };
}

export function googleCalendarUrl(w: Wedding, lang: Lang) {
  const p = parts(w, lang);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: p.title,
    dates: `${stamp(p.start)}/${stamp(p.end)}`,
    location: p.place,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export function downloadIcs(w: Wedding, lang: Lang) {
  const p = parts(w, lang);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(p.start)}@wedding-invitation`,
    `DTSTAMP:${stamp(Date.now())}`,
    `DTSTART:${stamp(p.start)}`,
    `DTEND:${stamp(p.end)}`,
    `SUMMARY:${p.title}`,
    `LOCATION:${p.place}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Wedding tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const mapsLink = (w: Wedding) =>
  w.mapUrl || `https://www.google.com/maps?q=${w.mapLat},${w.mapLng}`;
