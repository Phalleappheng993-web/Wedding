// Cambodia is UTC+7 all year (no daylight saving), so we format by hand.
// This keeps Khmer dates/times correct even on browsers without km-KH support.
const OFFSET = 7 * 3_600_000;

const KM_DAYS = ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];
const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const EN_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const khDigits = (v: number | string) => String(v).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[Number(d)]);
const isKm = (locale: string) => locale.startsWith("km");

export function fmtDate(iso: string, locale: string): string {
  const d = new Date(new Date(iso).getTime() + OFFSET);
  const [day, month, year, weekday] = [d.getUTCDate(), d.getUTCMonth(), d.getUTCFullYear(), d.getUTCDay()];
  return isKm(locale)
    ? `ថ្ងៃ${KM_DAYS[weekday]} ទី${khDigits(day)} ខែ${KM_MONTHS[month]} ឆ្នាំ${khDigits(year)}`
    : `${EN_DAYS[weekday]}, ${day} ${EN_MONTHS[month]} ${year}`;
}

export function fmtTime(ms: number, locale: string): string {
  const d = new Date(ms + OFFSET);
  const h24 = d.getUTCHours();
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  const h12 = h24 % 12 || 12;

  if (isKm(locale)) {
    const period = h24 < 12 ? "ព្រឹក" : h24 < 17 ? "រសៀល" : h24 < 19 ? "ល្ងាច" : "យប់";
    return `${khDigits(`${h12}:${min}`)} ${period}`;
  }
  return `${h12}:${min} ${h24 < 12 ? "AM" : "PM"}`;
}
