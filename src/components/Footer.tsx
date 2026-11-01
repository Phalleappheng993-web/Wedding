import { useI18n } from "../i18n";
import type { Wedding } from "../types";
import Ornament from "./Ornament";

export default function Footer({ wedding }: { wedding: Wedding }) {
  const { t, tr } = useI18n();
  return (
    <footer className="px-6 pb-24 pt-10 text-center">
      <Ornament />
      <p className="mt-8 font-display text-3xl">
        {tr(wedding.groom)} {t("and")} {tr(wedding.bride)}
      </p>
      <p className="mt-3 text-muted">{t("footer.text")}</p>
    </footer>
  );
}
