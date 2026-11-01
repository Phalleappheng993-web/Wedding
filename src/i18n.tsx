import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { L10n, Lang } from "./types";

const km = {
  "and": "និង",
  "entry.title": "មុនចាប់ផ្តើម",
  "entry.lead": "សូមបញ្ចូលឈ្មោះរបស់លោកអ្នក ដើម្បីឱ្យយើងខ្ញុំស្វាគមន៍ដោយផ្ទាល់។",
  "entry.placeholder": "ឈ្មោះរបស់លោកអ្នក",
  "entry.cta": "បន្តទៅសំបុត្រអញ្ជើញ",
  "envelope.kicker": "សូមគោរពអញ្ជើញ",
  "envelope.title": "សំបុត្រអញ្ជើញមង្គលការ",
  "envelope.tap": "ចុចដើម្បីបើក",
  "envelope.foot": "ថ្ងៃពិសេសនេះនឹងកាន់តែមានន័យ ពេលមានវត្តមានរបស់លោកអ្នក។",
  "hero.invite": "សូមគោរពអញ្ជើញចូលរួមអបអរមង្គលការ",
  "welcome.dear": "សូមគោរពជូន {name}",
  "welcome.default": "យើងខ្ញុំរីករាយណាស់ ប្រសិនបើលោកអ្នកអាចមកចូលរួមអបអរថ្ងៃសំខាន់ក្នុងជីវិតរបស់យើងខ្ញុំ។",
  "welcome.friends": "អរគុណដែលជាមិត្តភក្តិនៅក្បែរយើងខ្ញុំរហូតមក។ ថ្ងៃនេះនឹងមិនពេញលេញទេ បើគ្មានអ្នក។ មកសប្បាយជាមួយគ្នាណា!",
  "welcome.family": "អរគុណដែលជាគ្រួសារ និងជាកម្លាំងចិត្តរបស់យើងខ្ញុំ។ យើងខ្ញុំរង់ចាំជួបលោកអ្នកក្នុងថ្ងៃដ៏សំខាន់នេះ។",
  "welcome.elders": "យើងខ្ញុំសូមគោរពអញ្ជើញលោកអ្នកមកជាសក្ខីភាព និងជូនពរក្នុងថ្ងៃមង្គលការ។ វត្តមានរបស់លោកអ្នកជាកិត្តិយសដ៏ធំធេង។",
  "welcome.colleagues": "អរគុណសម្រាប់ការគាំទ្រ និងមិត្តភាពនៅកន្លែងការងារ។ យើងខ្ញុំរីករាយនឹងបានជួបលោកអ្នកក្នុងបរិយាកាសសប្បាយរីករាយ។",
  "welcome.sign": "ដោយក្តីស្រលាញ់ និងការគោរព",
  "seat.title": "កៅអីរបស់លោកអ្នក",
  "seat.table": "តុលេខ {table}",
  "seat.hint": "ប្រសិនបើរកមិនឃើញ សូមសួរក្រុមទទួលភ្ញៀវ។",
  "count.title": "រាប់ថយក្រោយទៅថ្ងៃមង្គលការ",
  "count.days": "ថ្ងៃ",
  "count.hours": "ម៉ោង",
  "count.minutes": "នាទី",
  "count.seconds": "វិនាទី",
  "today.title": "ថ្ងៃនេះជាថ្ងៃមង្គលការ!",
  "today.lead": "សូមស្វាគមន៍! នេះជាអ្វីដែលលោកអ្នកត្រូវដឹងសម្រាប់ថ្ងៃនេះ។",
  "today.now": "កំពុងដំណើរការ",
  "today.next": "បន្ទាប់",
  "today.done": "កម្មវិធីទាំងអស់បានបញ្ចប់ហើយ សូមអរគុណ។",
  "after.title": "សូមអរគុណ",
  "after.text": "អរគុណដែលបានចូលរួមធ្វើឱ្យថ្ងៃរបស់យើងខ្ញុំពេញដោយក្តីស្រលាញ់។ វត្តមាន និងពាក្យជូនពររបស់លោកអ្នកមានន័យណាស់។",
  "album.title": "រូបថតពីពិធី",
  "album.text": "ចែករំលែករូបថតរបស់លោកអ្នក និងមើលរូបភាពពីភ្ញៀវផ្សេងៗ។",
  "album.cta": "បើកអាល់ប៊ុម",
  "schedule.title": "កម្មវិធីថ្ងៃមង្គលការ",
  "story.title": "រឿងស្នេហារបស់យើងខ្ញុំ",
  "gallery.title": "ពេលវេលាដ៏ស្រស់ស្អាត",
  "gallery.close": "បិទ",
  "gallery.prev": "រូបមុន",
  "gallery.next": "រូបបន្ទាប់",
  "location.title": "ទីកន្លែងប្រារព្ធពិធី",
  "location.directions": "ចង្អុលផ្លូវ",
  "location.dress": "ការស្លៀកពាក់៖ {dress}",
  "cal.add": "រក្សាទុកក្នុងប្រតិទិន",
  "cal.google": "Google Calendar",
  "cal.ics": "iPhone / ផ្សេងៗ (.ics)",
  "rsvp.title": "តើលោកអ្នកអាចមកបានទេ?",
  "rsvp.lead": "{name} សូមជួយប្រាប់យើងខ្ញុំ ដើម្បីរៀបចំកន្លែងឱ្យបានល្អ។",
  "rsvp.yes": "បាទ/ចាស ខ្ញុំមកបាន",
  "rsvp.no": "សូមអភ័យទោស ខ្ញុំមិនអាចមកបាន",
  "rsvp.count": "ចំនួនភ្ញៀវ",
  "rsvp.countHint": "រួមទាំងខ្លួនលោកអ្នក",
  "rsvp.send": "ផ្ញើការឆ្លើយតប",
  "rsvp.sending": "កំពុងផ្ញើ...",
  "rsvp.thanks": "អរគុណ {name}!",
  "rsvp.yesDone": "យើងខ្ញុំរង់ចាំជួបលោកអ្នក។ បានកក់កន្លែងសម្រាប់ភ្ញៀវ {n} នាក់។",
  "rsvp.noDone": "យើងខ្ញុំសោកស្តាយដែលលោកអ្នកមិនអាចមកបាន តែសូមអរគុណដែលបានប្រាប់។",
  "rsvp.change": "ប្តូរចម្លើយ",
  "rsvp.error": "ផ្ញើមិនបានទេ សូមពិនិត្យអ៊ីនធឺណិត រួចព្យាយាមម្តងទៀត។",
  "rsvp.telegram": "Telegram បានបើកហើយ សូមចុច Send ដើម្បីបញ្ចប់។",
  "wishes.title": "ពាក្យជូនពរ",
  "wishes.lead": "សរសេរពាក្យល្អៗជូនយើងខ្ញុំ យើងខ្ញុំនឹងរក្សាទុកគ្រប់ពាក្យ។",
  "wishes.placeholder": "សរសេរពាក្យជូនពររបស់លោកអ្នកនៅទីនេះ...",
  "wishes.send": "ផ្ញើពាក្យជូនពរ",
  "wishes.sending": "កំពុងផ្ញើ...",
  "wishes.thanks": "អរគុណសម្រាប់ពាក្យជូនពរ! យើងខ្ញុំបានទទួលហើយ។",
  "wishes.another": "សរសេរបន្ថែម",
  "wishes.error": "ផ្ញើមិនបានទេ សូមព្យាយាមម្តងទៀត។",
  "gift.title": "អំណោយមង្គលការ",
  "gift.copy": "ចម្លងលេខគណនី",
  "gift.copied": "បានចម្លង",
  "gift.scan": "ស្កេនដើម្បីផ្ញើអំណោយ",
  "share.title": "ចែករំលែកសំបុត្រអញ្ជើញ",
  "share.btn": "ចែករំលែក",
  "share.copied": "បានចម្លងតំណ",
  "share.text": "សូមគោរពអញ្ជើញចូលរួមមង្គលការរបស់យើងខ្ញុំ",
  "footer.text": "សូមអរគុណ និងរង់ចាំជួបលោកអ្នក",
  "ctrl.music": "បិទ/បើកតន្ត្រី",
  "ctrl.theme": "ប្តូរពណ៌ងងឹត/ភ្លឺ",
  "ctrl.lang": "English",
  "guest.fallback": "ភ្ញៀវជាទីគោរព",
} as const;

type Key = keyof typeof km;

const en: Record<Key, string> = {
  "and": "&",
  "entry.title": "Before we begin",
  "entry.lead": "Tell us your name so we can welcome you properly.",
  "entry.placeholder": "Your name",
  "entry.cta": "Continue to the invitation",
  "envelope.kicker": "You are invited",
  "envelope.title": "A wedding invitation",
  "envelope.tap": "Tap to open",
  "envelope.foot": "A special day is better when shared with you.",
  "hero.invite": "Join us to celebrate our wedding",
  "welcome.dear": "Dear {name},",
  "welcome.default": "We would be so happy to have you with us on the most important day of our lives.",
  "welcome.friends": "Thank you for being our friend through everything. The day will not be complete without you. Come celebrate with us!",
  "welcome.family": "Thank you for being our family and our strength. We cannot wait to see you on this special day.",
  "welcome.elders": "We respectfully invite you to witness and bless our wedding. Your presence is a great honour to us.",
  "welcome.colleagues": "Thank you for the support and friendship at work. We look forward to celebrating with you in a joyful atmosphere.",
  "welcome.sign": "With love and gratitude,",
  "seat.title": "Your seat",
  "seat.table": "Table {table}",
  "seat.hint": "If you cannot find it, ask our welcome team.",
  "count.title": "Counting down to our wedding",
  "count.days": "Days",
  "count.hours": "Hours",
  "count.minutes": "Minutes",
  "count.seconds": "Seconds",
  "today.title": "Today is the day!",
  "today.lead": "Welcome! Here is everything you need for today.",
  "today.now": "Happening now",
  "today.next": "Up next",
  "today.done": "All events have finished. Thank you!",
  "after.title": "Thank you",
  "after.text": "Thank you for making our day full of love. Your presence and your wishes meant the world to us.",
  "album.title": "Photos from the day",
  "album.text": "Share your photos and see pictures from other guests.",
  "album.cta": "Open the album",
  "schedule.title": "Wedding day schedule",
  "story.title": "Our love story",
  "gallery.title": "Beautiful moments",
  "gallery.close": "Close",
  "gallery.prev": "Previous photo",
  "gallery.next": "Next photo",
  "location.title": "Where to find us",
  "location.directions": "Get directions",
  "location.dress": "Dress code: {dress}",
  "cal.add": "Save to calendar",
  "cal.google": "Google Calendar",
  "cal.ics": "iPhone / others (.ics)",
  "rsvp.title": "Will you join us?",
  "rsvp.lead": "{name}, please let us know so we can prepare your place.",
  "rsvp.yes": "Yes, I'll be there",
  "rsvp.no": "Sorry, I can't make it",
  "rsvp.count": "Number of guests",
  "rsvp.countHint": "Including yourself",
  "rsvp.send": "Send reply",
  "rsvp.sending": "Sending...",
  "rsvp.thanks": "Thank you, {name}!",
  "rsvp.yesDone": "We can't wait to see you. {n} seat(s) reserved.",
  "rsvp.noDone": "We're sorry you can't make it, and thank you for letting us know.",
  "rsvp.change": "Change my answer",
  "rsvp.error": "Could not send. Check your connection and try again.",
  "rsvp.telegram": "Telegram is open. Tap Send to finish.",
  "wishes.title": "Wishes for us",
  "wishes.lead": "Leave a message for the couple. We will treasure every word.",
  "wishes.placeholder": "Write your wish here...",
  "wishes.send": "Send wish",
  "wishes.sending": "Sending...",
  "wishes.thanks": "Thank you for your wish! We received it.",
  "wishes.another": "Write another",
  "wishes.error": "Could not send. Please try again.",
  "gift.title": "Wedding gift",
  "gift.copy": "Copy account number",
  "gift.copied": "Copied",
  "gift.scan": "Scan to send a gift",
  "share.title": "Share the invitation",
  "share.btn": "Share",
  "share.copied": "Link copied",
  "share.text": "You are invited to our wedding",
  "footer.text": "Thank you, and see you there",
  "ctrl.music": "Toggle music",
  "ctrl.theme": "Toggle dark mode",
  "ctrl.lang": "ខ្មែរ",
  "guest.fallback": "Dear guest",
};

const dict: Record<Lang, Record<Key, string>> = { km, en };

type Params = Record<string, string | number>;
export type TKey = Key;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key, params?: Params) => string;
  tr: (v: L10n) => string;
  locale: string;
};

const I18nContext = createContext<Ctx | null>(null);
const STORE = "wedding_lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === "km" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "km";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const value = useMemo<Ctx>(() => {
    const t = (key: Key, params?: Params) =>
      Object.entries(params ?? {}).reduce(
        (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
        dict[lang][key]
      );
    return {
      lang,
      setLang: (l) => {
        setLangState(l);
        try {
          localStorage.setItem(STORE, l);
        } catch {
          /* ignore */
        }
      },
      t,
      tr: (v) => v[lang],
      locale: lang === "km" ? "km-KH" : "en-GB",
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
