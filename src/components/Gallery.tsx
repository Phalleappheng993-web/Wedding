import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "../i18n";
import type { GalleryItem } from "../types";

export default function Gallery({ photos }: { photos: GalleryItem[] }) {
  const { t, tr } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const current = open === null ? null : photos[open];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="text-center text-3xl sm:text-4xl">{t("gallery.title")}</h2>

      <div className="mx-auto mt-10 max-w-4xl columns-2 gap-3 sm:mt-12 sm:columns-3 sm:gap-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={tr(p.caption)}
            className={`group mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-lg bg-paper2 sm:mb-4 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
          >
            <img
              src={p.src}
              alt={tr(p.caption)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tr(current.caption)}
          className="fixed inset-0 z-[500] grid place-items-center bg-black/92 p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <figure className="max-h-full max-w-3xl px-10 text-center sm:px-0" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={tr(current.caption)} className="mx-auto max-h-[72svh] max-w-full rounded-lg object-contain sm:max-h-[78svh]" />
            <figcaption className="mt-4 text-[#f6f1e7]/80">{tr(current.caption)}</figcaption>
          </figure>

          <button type="button" autoFocus onClick={() => setOpen(null)} aria-label={t("gallery.close")}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white">
            <X />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t("gallery.prev")}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white">
            <ChevronLeft />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t("gallery.next")}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white">
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}
