import { CalendarPlus } from "lucide-react";
import { useI18n } from "../i18n";
import { downloadIcs, googleCalendarUrl } from "../lib/calendar";
import { fmtTime } from "../lib/format";
import { eventTime, scheduleState, useNow } from "../lib/phase";
import type { Phase, Wedding } from "../types";

export default function Schedule({ wedding, phase }: { wedding: Wedding; phase: Phase }) {
  const { t, tr, lang, locale } = useI18n();
  const now = useNow(30_000);
  const { current } = scheduleState(wedding.date, wedding.schedule.map((s) => s.time), now);
  const live = phase === "today" ? current : -1;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-3xl sm:text-4xl">{t("schedule.title")}</h2>

        <ol className="mt-12 divide-y divide-line border-y border-line">
          {wedding.schedule.map((s, i) => (
            <li key={s.time} className={`grid grid-cols-[6.5rem_1fr] gap-4 px-2 py-5 ${i === live ? "bg-paper2" : ""}`}>
              <time className="text-gold">{fmtTime(eventTime(wedding.date, s.time), locale)}</time>
              <div>
                <p className="font-medium">{tr(s.title)}</p>
                {s.note && <p className="text-sm text-muted">{tr(s.note)}</p>}
                {i === live && <p className="text-sm text-gold">{t("today.now")}</p>}
              </div>
            </li>
          ))}
        </ol>

        {phase === "before" && (
          <div className="mt-10 text-center">
            <p className="flex items-center justify-center gap-2 text-muted">
              <CalendarPlus size={18} /> {t("cal.add")}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={googleCalendarUrl(wedding, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-5 py-2 transition hover:bg-paper2"
              >
                {t("cal.google")}
              </a>
              <button
                type="button"
                onClick={() => downloadIcs(wedding, lang)}
                className="rounded-full border border-line px-5 py-2 transition hover:bg-paper2"
              >
                {t("cal.ics")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
