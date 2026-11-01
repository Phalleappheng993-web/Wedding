import { Moon, Music2, Sun, VolumeX } from "lucide-react";
import { useI18n } from "../i18n";

type Props = {
  dark: boolean;
  onToggleDark: () => void;
  musicOn: boolean;
  onToggleMusic?: () => void;
};

const btn =
  "grid h-10 min-w-10 place-items-center rounded-full border border-line bg-paper/85 px-3 text-sm text-ink shadow-sm backdrop-blur transition hover:bg-paper";

export default function Controls({ dark, onToggleDark, musicOn, onToggleMusic }: Props) {
  const { t, lang, setLang } = useI18n();

  return (
    <div className="fixed right-3 top-3 z-[400] flex gap-2" style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}>
      <button type="button" className={btn} onClick={() => setLang(lang === "km" ? "en" : "km")} aria-label="Language">
        {t("ctrl.lang")}
      </button>
      {onToggleMusic && (
        <button type="button" className={btn} onClick={onToggleMusic} aria-label={t("ctrl.music")} aria-pressed={musicOn}>
          {musicOn ? <Music2 size={17} className="animate-pulse" /> : <VolumeX size={17} />}
        </button>
      )}
      <button type="button" className={btn} onClick={onToggleDark} aria-label={t("ctrl.theme")} aria-pressed={dark}>
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  );
}
