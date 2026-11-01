import { useI18n, type TKey } from "../i18n";
import type { Guest, Phase } from "../types";
import Ornament from "./Ornament";

export default function Welcome({ guest, phase }: { guest: Guest; phase: Phase }) {
  const { t, lang } = useI18n();

  const message =
    guest.message?.[lang] ??
    t((guest.group ? `welcome.${guest.group}` : "welcome.default") as TKey);

  return (
    <section className="px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <Ornament />
        <h2 className="mt-10 text-3xl sm:text-5xl">{t("welcome.dear", { name: guest.name })}</h2>
        <p className="mx-auto mt-8 max-w-md leading-9 text-muted">{message}</p>
        <p className="mt-8 font-display text-lg text-gold">{t("welcome.sign")}</p>

        {phase === "today" && guest.table && (
          <div className="mx-auto mt-14 max-w-xs rounded-2xl border border-gold/50 bg-paper2 px-6 py-7">
            <p className="text-gold">{t("seat.title")}</p>
            <p className="mt-1 font-display text-4xl">{t("seat.table", { table: guest.table })}</p>
            <p className="mt-3 text-sm text-muted">{t("seat.hint")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
