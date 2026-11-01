import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useI18n } from "../i18n";

export default function Envelope({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  const { t } = useI18n();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    onOpen(); // start music + confetti inside the user's tap
  }

  return (
    <motion.main
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-paper px-6"
    >
      <div className="w-full max-w-md text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gold">
          {t("envelope.kicker")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-2 text-3xl sm:text-4xl"
        >
          {t("envelope.title")}
        </motion.h1>

        <motion.button
          type="button"
          onClick={open}
          whileHover={{ scale: opening ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 90 }}
          className="relative mx-auto mt-12 block aspect-[1.5] w-full max-w-sm [perspective:900px]"
          aria-label={t("envelope.tap")}
        >
          {/* back + letter */}
          <div className="absolute inset-0 rounded-xl border border-line bg-paper2 shadow-[0_24px_60px_rgb(0_0_0/0.14)]" />
          <motion.div
            animate={{ y: opening ? -70 : 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            className="absolute inset-x-5 top-4 bottom-8 grid place-items-center rounded-md border border-line bg-paper px-3 shadow-sm"
          >
            <span className="font-display text-xl text-ink">{guestName}</span>
          </motion.div>
          {/* front pockets */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-paper2" style={{ clipPath: "polygon(0 0, 50% 55%, 0 100%)" }} />
            <div className="absolute inset-0 bg-paper2 brightness-95" style={{ clipPath: "polygon(100% 0, 50% 55%, 100% 100%)" }} />
            <div className="absolute inset-0 bg-paper2 brightness-105" style={{ clipPath: "polygon(0 100%, 50% 55%, 100% 100%)" }} />
          </div>
          {/* flap */}
          <motion.div
            animate={{ rotateX: opening ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 55%)", zIndex: opening ? 0 : 10 }}
            className="absolute inset-0 bg-paper2 brightness-90"
          />
          {/* seal */}
          {!opening && (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-wine text-[#d3b062] shadow-lg">
                <Heart size={22} fill="currentColor" />
              </div>
            </motion.div>
          )}
        </motion.button>

        <p className="mt-10 text-gold">{t("envelope.tap")}</p>
        <p className="mx-auto mt-3 max-w-xs text-sm text-muted">{t("envelope.foot")}</p>
      </div>
    </motion.main>
  );
}
