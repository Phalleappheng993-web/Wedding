import type { Wedding } from "../types";

// ✏️ Edit everything in this file to match your wedding.
export const wedding: Wedding = {
  groom: { km: "សុខា", en: "Sokha" },
  bride: { km: "សុភា", en: "Sophea" },

  date: "2026-12-12T16:00:00+07:00",

  venue: { km: "សាលរោសហ្គាឌិន", en: "Rose Garden Wedding Hall" },
  address: { km: "ភ្នំពេញ ប្រទេសកម្ពុជា", en: "Phnom Penh, Cambodia" },
  dressCode: { km: "សុភាពរាបសា ទំនើប", en: "Elegant / Modern" },

  // Right-click the venue on Google Maps and click the coordinates to copy.
  mapLat: 11.5564,
  mapLng: 104.9282,
  // Optional: paste your Google Maps "Share" link. Empty = auto link.
  mapUrl: "",

  // Telegram username (no @). Used for RSVP/wishes if VITE_FORM_ENDPOINT is empty.
  telegram: "",
  // Google Photos / Drive shared album link (shown on the wedding day and after).
  albumUrl: "",

  // Times are on the wedding date, Cambodia time (UTC+7).
  schedule: [
    { time: "07:00", title: { km: "ពិធីសូត្រមន្ត", en: "Morning blessing" } },
    { time: "09:00", title: { km: "ពិធីហែជំនូន", en: "Procession" } },
    { time: "11:00", title: { km: "ពិធីបង្កក់ចិត្ត និងកាត់សក់", en: "Traditional ceremonies" } },
    { time: "16:00", title: { km: "ទទួលភ្ញៀវ", en: "Guest arrival" }, note: { km: "សូមមកដល់មុនម៉ោងបន្តិច", en: "Please arrive a little early" } },
    { time: "18:00", title: { km: "ពិធីជប់លៀង", en: "Reception dinner" } },
    { time: "21:00", title: { km: "ពិធីអបអរ និងរាំកម្សាន្ត", en: "Celebration & dancing" } },
  ],

  story: [
    { year: "2021", title: { km: "ជួបគ្នាលើកដំបូង", en: "We met" }, text: { km: "ពាក្យសួរសុខទុក្ខធម្មតា បានក្លាយជាការចាប់ផ្តើមរឿងរបស់យើង។", en: "A simple hello became the beginning of our story." } },
    { year: "2022", title: { km: "ណាត់ជួបលើកដំបូង", en: "First date" }, text: { km: "កាហ្វេមួយកែវ ការនិយាយគ្នាអស់រយៈពេលយូរ និងសំណើចជាច្រើន។", en: "Coffee, long conversations, and a lot of laughing." } },
    { year: "2025", title: { km: "សំណើរសុំរៀបការ", en: "The proposal" }, text: { km: "សំណួរមួយ ចម្លើយមួយ និងអនាគតដែលយើងសាងសង់ជាមួយគ្នា។", en: "One question. One yes. A forever to build." } },
    { year: "2026", title: { km: "ថ្ងៃមង្គលការ", en: "Our wedding" }, text: { km: "ឥឡូវនេះ យើងសូមអបអរជំពូកថ្មីនេះជាមួយលោកអ្នក។", en: "Now we get to celebrate this new chapter with you." } },
  ],

  gallery: [
    { src: "/images/couple-01.webp", caption: { km: "ចាប់ផ្តើមរឿងរបស់យើង", en: "The beginning of our story" } },
    { src: "/images/couple-02.webp", caption: { km: "តែយើងពីរនាក់", en: "Just us" } },
    { src: "/images/couple-03.webp", caption: { km: "ថ្ងៃដែលយើងនឹងចងចាំជានិច្ច", en: "A day we will always remember" } },
    { src: "/images/couple-04.webp", caption: { km: "ជាមួយគ្នារហូត", en: "Together, always" } },
    { src: "/images/couple-05.webp", caption: { km: "ពេលតូចៗ ការចងចាំធំៗ", en: "Little moments, big memories" } },
    { src: "/images/couple-06.webp", caption: { km: "ជារៀងរហូតដែលយើងចូលចិត្ត", en: "Our favorite kind of forever" } },
  ],

  // Delete this block to hide the gift section.
  // qrImage: put your bank QR screenshot in public/images/ and uncomment.
  gift: {
    bank: "ABA Bank",
    accountName: "SOKHA SOPHEA",
    accountNumber: "000 123 456",
    // qrImage: "/images/gift-qr.jpg",
    note: {
      km: "វត្តមានរបស់លោកអ្នកជាអំណោយដ៏ធំបំផុត។ ប្រសិនបើលោកអ្នកចង់ជូនអំណោយ សូមអរគុណយ៉ាងជ្រាលជ្រៅ។",
      en: "Your presence is the greatest gift. If you wish to give, thank you from our hearts.",
    },
  },
};
