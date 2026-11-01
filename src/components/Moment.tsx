import { ExternalLink, MapPin } from "lucide-react";
import { useI18n } from "../i18n";
import { mapsLink } from "../lib/calendar";
import { fmtTime } from "../lib/format";
import { eventTime, scheduleState, useNow } from "../lib/phase";
import type { Phase, Wedding } from "../types";

const cta =
  "inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-paper transition hover:opacity-90";

function Countdown({ date }: { date: string }) {
  const { t } = useI18n();
  const now = useNow(1000);
  const diff = Math.max(0, new Date(date).getTime() - now);
  const cells = [
    [Math.floor(diff / 86_400_000), t("count.days")],
    [Math.floor(diff / 3_600_000) % 24, t("count.hours")],
    [Math.floor(diff / 60_000) % 60, t("count.minutes")],
    [Math.floor(diff / 1000) % 60, t("count.seconds")],
  ] as const;

  return (
    <>
      <h2 className="text-2xl sm:text-3xl">{t("count.title")}</h2>
      <div role="timer" className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
        {cells.map(([value, label]) => (
          <div key={label} className="rounded-xl border border-line py-5">
            <div className="font-display text-3xl tabular-nums sm:text-5xl">{String(value).padStart(2, "0")}</div>
            <div className="mt-1 text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Today({ wedding }: { wedding: Wedding }) {
  const { t, tr, locale } = useI18n();
  const now = useNow(30_000);
  const { current, next } = scheduleState(wedding.date, wedding.schedule.map((s) => s.time), now);
  const show = [
    current >= 0 && { label: t("today.now"), item: wedding.schedule[current], strong: true },
    next >= 0 && { label: t("today.next"), item: wedding.schedule[next], strong: false },
  ].filter(Boolean) as { label: string; item: Wedding["schedule"][number]; strong: boolean }[];

  return (
    <>
      <h2 className="text-3xl sm:text-5xl">{t("today.title")}</h2>
      <p className="mx-auto mt-4 max-w-sm text-muted">{t("today.lead")}</p>

      <div className="mx-auto mt-10 grid max-w-md gap-3 text-left">
        {show.length === 0 && <p className="text-center text-muted">{t("today.done")}</p>}
        {show.map(({ label, item, strong }) => (
          <div key={label} className={`rounded-2xl border px-6 py-5 ${strong ? "border-gold bg-paper2" : "border-line"}`}>
            <p className="text-gold">{label}</p>
            <p className="mt-1 font-display text-2xl">{tr(item.title)}</p>
            <p className="text-sm text-muted">{fmtTime(eventTime(wedding.date, item.time), locale)}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a className={cta} href={mapsLink(wedding)} target="_blank" rel="noopener noreferrer">
          <MapPin size={17} />
          {t("location.directions")}
        </a>
        {wedding.albumUrl && (
          <a className={cta} href={wedding.albumUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={17} />
            {t("album.cta")}
          </a>
        )}
      </div>
    </>
  );
}

function After({ wedding }: { wedding: Wedding }) {
  const { t } = useI18n();
  return (
    <>
      <h2 className="text-3xl sm:text-5xl">{t("after.title")}</h2>
      <p className="mx-auto mt-6 max-w-md leading-9 text-muted">{t("after.text")}</p>
      {wedding.albumUrl && (
        <div className="mt-10">
          <p className="mb-4 text-gold">{t("album.text")}</p>
          <a className={cta} href={wedding.albumUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={17} />
            {t("album.cta")}
          </a>
        </div>
      )}
    </>
  );
}

export default function Moment({ wedding, phase }: { wedding: Wedding; phase: Phase }) {
  return (
    <section className="bg-paper2 px-6 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        {phase === "before" && <Countdown date={wedding.date} />}
        {phase === "today" && <Today wedding={wedding} />}
        {phase === "after" && <After wedding={wedding} />}
      </div>
    </section>
  );
}
