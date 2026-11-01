import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useI18n } from "../i18n";
import type { Gift as GiftType } from "../types";

export default function Gift({ gift }: { gift: GiftType }) {
  const { t, tr } = useI18n();
  const [copied, setCopied] = useState(false);
  const [qrBroken, setQrBroken] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(gift.accountNumber.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: number is still visible to copy by hand */
    }
  }

  return (
    <section className="bg-paper2 px-6 py-24 text-center">
      <div className="mx-auto max-w-sm">
        <h2 className="text-3xl sm:text-4xl">{t("gift.title")}</h2>
        {gift.note && <p className="mt-4 text-muted">{tr(gift.note)}</p>}

        <div className="mt-10 rounded-3xl border border-line bg-paper p-6">
          {gift.qrImage && !qrBroken && (
            <img
              src={gift.qrImage}
              alt={t("gift.scan")}
              loading="lazy"
              onError={() => setQrBroken(true)}
              className="mx-auto mb-5 h-52 w-52 rounded-xl object-contain"
            />
          )}
          <p className="text-muted">{gift.bank}</p>
          <p className="font-medium">{gift.accountName}</p>
          <button
            type="button"
            onClick={copy}
            aria-label={t("gift.copy")}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 tabular-nums transition hover:bg-paper2"
          >
            {gift.accountNumber}
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <p role="status" className="mt-2 h-6 text-sm text-gold">{copied ? t("gift.copied") : ""}</p>
        </div>
      </div>
    </section>
  );
}
