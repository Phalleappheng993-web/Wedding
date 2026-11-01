import { useState } from "react";
import { Share2 } from "lucide-react";
import { useI18n } from "../i18n";

export default function Share() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function share() {
    // Share the public link only (never a guest's personal ?g= link)
    const url = `${window.location.origin}${window.location.pathname}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text: t("share.text"), url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section className="px-6 py-16 text-center">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition hover:bg-paper2"
      >
        <Share2 size={18} />
        {copied ? t("share.copied") : t("share.btn")}
      </button>
    </section>
  );
}
