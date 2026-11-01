import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, Send, X } from "lucide-react";
import { useI18n } from "../i18n";
import { guestKey } from "../lib/guest";
import { load, save } from "../lib/storage";
import { submitForm } from "../lib/submit";
import type { Guest } from "../types";

type Saved = { answer: "yes" | "no"; count: number };

export default function RSVP({ guest }: { guest: Guest }) {
  const { t } = useI18n();
  const storeKey = `wedding_rsvp_${guestKey(guest)}`;
  const saved = load<Saved>(storeKey);

  const [answer, setAnswer] = useState<Saved["answer"] | null>(saved?.answer ?? null);
  const [count, setCount] = useState(saved?.count || 1);
  const [done, setDone] = useState(Boolean(saved));
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);

  async function send() {
    if (!answer || sending) return;
    setSending(true);
    setError(false);
    setNote("");
    const guests = answer === "yes" ? count : 0;
    const summary = `${answer === "yes" ? "✅" : "❌"} RSVP · ${guest.name} · ${
      answer === "yes" ? `${guests} guest(s)` : "not attending"
    }${guest.id ? ` · ${guest.id}` : ""}`;
    try {
      const result = await submitForm(
        "rsvp",
        { name: guest.name, id: guest.id ?? "", attending: answer, guests, sentAt: new Date().toISOString() },
        summary
      );
      save(storeKey, { answer, count: guests });
      if (result === "telegram") setNote(t("rsvp.telegram"));
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  const choice = (value: "yes" | "no", Icon: typeof Check, label: string) => (
    <button
      type="button"
      onClick={() => setAnswer(value)}
      aria-pressed={answer === value}
      className={`rounded-2xl border p-5 transition ${
        answer === value ? "border-[#e8cf92] bg-[#f6f1e7] text-[#2b0f16]" : "border-white/20 bg-white/5 hover:bg-white/10"
      }`}
    >
      <Icon className="mx-auto mb-2" size={22} />
      <span>{label}</span>
    </button>
  );

  const round = "grid h-10 w-10 place-items-center rounded-full border border-white/25 hover:bg-white/10";

  return (
    <section id="rsvp" className="bg-wine px-6 py-24 text-[#f6f1e7]">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl sm:text-5xl">{t("rsvp.title")}</h2>
        <p className="mt-4 text-[#f6f1e7]/75">{t("rsvp.lead", { name: guest.name })}</p>

        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div key="form" exit={{ opacity: 0 }} className="mt-10">
              <div className="grid grid-cols-2 gap-3">
                {choice("yes", Check, t("rsvp.yes"))}
                {choice("no", X, t("rsvp.no"))}
              </div>

              {answer === "yes" && (
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left">
                  <div>
                    <p>{t("rsvp.count")}</p>
                    <p className="text-sm text-[#f6f1e7]/65">{t("rsvp.countHint")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" className={round} aria-label="-" onClick={() => setCount(Math.max(1, count - 1))}>
                      <Minus size={16} />
                    </button>
                    <output className="w-6 text-center text-lg">{count}</output>
                    <button type="button" className={round} aria-label="+" onClick={() => setCount(Math.min(10, count + 1))}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}

              {error && <p role="alert" className="mt-4 text-[#ffb4b4]">{t("rsvp.error")}</p>}

              <button
                type="button"
                onClick={send}
                disabled={!answer || sending}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#e8cf92] px-6 py-4 text-[#2b0f16] transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
                {sending ? t("rsvp.sending") : t("rsvp.send")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-3xl border border-white/15 bg-white/5 px-6 py-10"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e8cf92] text-[#2b0f16]">
                <Check size={26} />
              </div>
              <h3 className="mt-5 text-2xl">{t("rsvp.thanks", { name: guest.name })}</h3>
              <p className="mt-3 text-[#f6f1e7]/75">
                {answer === "yes" ? t("rsvp.yesDone", { n: count }) : t("rsvp.noDone")}
              </p>
              {note && <p className="mt-3 text-[#e8cf92]">{note}</p>}
              <button type="button" onClick={() => setDone(false)} className="mt-6 text-[#f6f1e7]/70 underline underline-offset-4">
                {t("rsvp.change")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
