import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "../i18n";
import { fmtDate } from "../lib/format";
import type { Wedding } from "../types";

const container: Variants = { show: { transition: { staggerChildren: 0.22, delayChildren: 0.3 } } };
const item: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.9 } } };

export default function Hero({ wedding }: { wedding: Wedding }) {
  const { t, tr, locale } = useI18n();

  return (
    <header className="relative flex min-h-[100svh] items-end overflow-hidden bg-wine text-[#f6f1e7]">
      <img
        src="/images/couple-hero.webp"
        alt={`${tr(wedding.groom)} ${t("and")} ${tr(wedding.bride)}`}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b0f16] via-[#2b0f16]/45 to-[#2b0f16]/10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-3xl px-6 pb-24 pt-32 text-center"
      >
        <motion.p variants={item} className="text-[#e8cf92]">{t("hero.invite")}</motion.p>
        <motion.h1 variants={item} className="mt-4 text-[clamp(2.4rem,10vw,4.75rem)] leading-[1.35]">
          {tr(wedding.groom)}
          <span className="block text-[0.45em] text-[#e8cf92]">{t("and")}</span>
          {tr(wedding.bride)}
        </motion.h1>
        <motion.p variants={item} className="mt-6 text-lg">{fmtDate(wedding.date, locale)}</motion.p>
        <motion.p variants={item} className="text-[#f6f1e7]/80">{tr(wedding.venue)}</motion.p>
      </motion.div>

      <ChevronDown aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-[#f6f1e7]/70 motion-reduce:animate-none" />
    </header>
  );
}
