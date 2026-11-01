import { MapPin } from "lucide-react";
import { useI18n } from "../i18n";
import { mapsLink } from "../lib/calendar";
import type { Wedding } from "../types";
import MapView from "./MapView";

export default function Location({ wedding }: { wedding: Wedding }) {
  const { t, tr } = useI18n();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl">{t("location.title")}</h2>
        <p className="mt-6 font-display text-2xl">{tr(wedding.venue)}</p>
        <p className="text-muted">{tr(wedding.address)}</p>
        <p className="mt-1 text-sm text-gold">{t("location.dress", { dress: tr(wedding.dressCode) })}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          <MapView lat={wedding.mapLat} lng={wedding.mapLng} label={tr(wedding.venue)} />
        </div>

        <a
          href={mapsLink(wedding)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-paper transition hover:opacity-90"
        >
          <MapPin size={17} />
          {t("location.directions")}
        </a>
      </div>
    </section>
  );
}
