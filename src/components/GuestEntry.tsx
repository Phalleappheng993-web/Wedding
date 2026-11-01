import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";

export default function GuestEntry({ onSubmit }: { onSubmit: (name: string) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const clean = name.trim();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-paper px-6 py-16"
    >
      <form
        className="w-full max-w-sm text-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (clean) onSubmit(clean);
        }}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-wine text-[#f6f1e7] dark:bg-gold dark:text-wine">
          <Heart size={22} fill="currentColor" />
        </div>
        <h1 className="mt-8 text-4xl">{t("entry.title")}</h1>
        <p className="mx-auto mt-4 max-w-xs text-muted">{t("entry.lead")}</p>

        <label className="sr-only" htmlFor="guest-name">{t("entry.placeholder")}</label>
        <input
          id="guest-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          autoComplete="name"
          placeholder={t("entry.placeholder")}
          className="mt-10 h-14 w-full rounded-full border border-line bg-paper2 px-6 text-center text-ink outline-none placeholder:text-muted focus:border-gold"
        />
        <button
          type="submit"
          disabled={!clean}
          className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink text-paper transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          {t("entry.cta")}
          <ArrowRight size={17} />
        </button>
      </form>
    </motion.main>
  );
}
