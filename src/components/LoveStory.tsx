import { useI18n } from "../i18n";
import type { StoryItem } from "../types";

export default function LoveStory({ story }: { story: StoryItem[] }) {
  const { t, tr } = useI18n();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-3xl sm:text-4xl">{t("story.title")}</h2>
        <ol className="relative mt-14 space-y-12 border-l border-gold/50 pl-8">
          {story.map((s) => (
            <li key={s.year} className="relative">
              <span aria-hidden className="absolute -left-[2.55rem] top-2 h-3 w-3 rotate-45 bg-gold" />
              <p className="font-display text-gold">{s.year}</p>
              <h3 className="mt-1 text-2xl">{tr(s.title)}</h3>
              <p className="mt-2 text-muted">{tr(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
