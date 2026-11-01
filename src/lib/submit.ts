import { wedding } from "../data/wedding";

export type SubmitResult = "sent" | "telegram" | "demo";

const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();

/**
 * Sends RSVP / wishes with NO backend of ours:
 *  1) VITE_FORM_ENDPOINT set  → Formspree / Google Apps Script (silent)
 *  2) wedding.telegram set    → opens Telegram with the message pre-filled
 *  3) otherwise               → demo mode (saved on this device only)
 * Call this directly from a click handler so the browser allows the popup.
 */
export async function submitForm(
  kind: "rsvp" | "wish",
  fields: Record<string, string | number>,
  summary: string
): Promise<SubmitResult> {
  if (endpoint) {
    const body = new URLSearchParams({
      type: kind,
      _subject: `Wedding ${kind.toUpperCase()}: ${fields.name}`,
      ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, String(v)])),
    });
    // no-cors: works with Google Apps Script & Formspree; response is opaque.
    await fetch(endpoint, { method: "POST", body, mode: "no-cors" });
    return "sent";
  }

  if (wedding.telegram) {
    const url = `https://t.me/${wedding.telegram}?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank", "noopener");
    return "telegram";
  }

  console.warn("[wedding] No VITE_FORM_ENDPOINT or telegram set: demo mode.");
  return "demo";
}
