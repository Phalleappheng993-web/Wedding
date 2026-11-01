export type Lang = "km" | "en";
export type L10n = Record<Lang, string>;
export type GroupKey = "friends" | "family" | "elders" | "colleagues";

export type Guest = {
  id?: string;
  name: string;
  group?: GroupKey;
  /** Table number/name shown on the wedding day */
  table?: string;
  /** Optional personal note that replaces the group message */
  message?: Partial<L10n>;
};

export type ScheduleItem = { time: string; title: L10n; note?: L10n };
export type StoryItem = { year: string; title: L10n; text: L10n };
export type GalleryItem = { src: string; caption: L10n };

export type Gift = {
  bank: string;
  accountName: string;
  accountNumber: string;
  qrImage?: string;
  note?: L10n;
};

export type Wedding = {
  groom: L10n;
  bride: L10n;
  /** ISO date-time with timezone, e.g. 2026-12-12T16:00:00+07:00 */
  date: string;
  venue: L10n;
  address: L10n;
  dressCode: L10n;
  mapLat: number;
  mapLng: number;
  /** Leave "" to auto-build a Google Maps link from mapLat/mapLng */
  mapUrl: string;
  /** Telegram username (without @) used when no form endpoint is set */
  telegram: string;
  /** Google Photos / Drive album for guests to share photos */
  albumUrl: string;
  schedule: ScheduleItem[];
  story: StoryItem[];
  gallery: GalleryItem[];
  gift?: Gift;
};

export type Phase = "before" | "today" | "after";
