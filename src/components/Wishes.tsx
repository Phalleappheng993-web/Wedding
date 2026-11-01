import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "../i18n";
import { submitForm } from "../lib/submit";
import type { Guest } from "../types";

export default function Wishes({ guest }: { guest: Guest }) {
  const { t } = useI18n();
  const [text, setText] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function send() {
    const message = text.trim();
    if (!message || sending) return;
    setSending(true);
    setError(false);
    try {
      await submitForm(
        "wish",
        { name: guest.name, id: guest.id ?? "", message, sentAt: new Date().toISOString() },
        `💌 ${guest.name}: ${message}`
      );
      setSent(message);
      setText("");
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-3xl sm:text-4xl">{t("wishes.title")}</h2>
        <p className="mt-4 text-muted">{t("wishes.lead")}</p>

        {sent ? (
          <div className="mt-10 rounded-2xl border border-line bg-paper2 p-6 text-left">
            <p className="italic">“{sent}”</p>
            <p className="mt-2 text-sm text-gold">— {guest.name}</p>
            <p className="mt-5 text-center text-muted">{t("wishes.thanks")}</p>
            <button type="button" onClick={() => setSent(null)} className="mx-auto mt-3 block underline underline-offset-4">
              {t("wishes.another")}
            </button>
          </div>
        ) : (
          <div className="mt-10">
            <label className="sr-only" htmlFor="wish">{t("wishes.title")}</label>
            <textarea
              id="wish"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={600}
              placeholder={t("wishes.placeholder")}
              className="w-full resize-none rounded-2xl border border-line bg-paper2 p-4 text-ink outline-none placeholder:text-muted focus:border-gold"
            />
            {error && <p role="alert" className="mt-2 text-red-700 dark:text-red-300">{t("wishes.error")}</p>}
            <button
              type="button"
              onClick={send}
              disabled={!text.trim() || sending}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-paper transition disabled:opacity-35"
            >
              <Send size={17} />
              {sending ? t("wishes.sending") : t("wishes.send")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
