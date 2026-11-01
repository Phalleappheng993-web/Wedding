# សំបុត្រអញ្ជើញមង្គលការ (Wedding Invitation Pro)

React + Vite + Tailwind · **គ្មាន backend** · ភាសាខ្មែរ/អង់គ្លេស · Deploy ឥតគិតថ្លៃលើ Vercel / Netlify / GitHub Pages / Cloudflare Pages

## មុខងារ
- តំណផ្ទាល់ខ្លួនតាមភ្ញៀវ `?g=G004` + QR (រំលងទំព័រវាយឈ្មោះ) · បើគ្មានតំណ ភ្ញៀវវាយឈ្មោះខ្លួនឯង
- សារស្វាគមន៍ខុសគ្នាតាមក្រុម (មិត្តភក្តិ / គ្រួសារ / ចាស់ទុំ / សហសេវិក) ឬសារផ្ទាល់ខ្លួន
- ម៉ូដអូតូតាមថ្ងៃ៖ **មុនពិធី** (countdown, RSVP, រឿងស្នេហា) → **ថ្ងៃមង្គលការ** (កម្មវិធីបច្ចុប្បន្ន, លេខតុ, ផ្លូវ, អាល់ប៊ុម) → **បន្ទាប់ពីពិធី** (សូមអរគុណ, អាល់ប៊ុម)
- ខ្មែរ/English, dark mode, តន្ត្រី (ផ្អាកនៅពេលចេញពីទំព័រ), កម្មវិធីតាមម៉ោង, រក្សាទុកក្នុង Calendar
- RSVP + ពាក្យជូនពរ ផ្ញើដោយគ្មាន server (Google Sheets / Formspree / Telegram)
- Open Graph preview, រូប WebP (បង្រួម ~10×), map lazy-load

## ចាប់ផ្តើម
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # បង្កើត dist/
```

## ១) កែព័ត៌មាន
- `src/data/wedding.ts` ឈ្មោះ, ថ្ងៃ, ទីកន្លែង, កម្មវិធី, រឿង, រូប, លេខគណនី
- ជំនួសរូបក្នុង `public/images/` (ឈ្មោះដដែល) · តន្ត្រី `public/music/wedding.mp3` · រូប preview `public/images/og.jpg` (1200×630)
- `.env` ដាក់ `VITE_SITE_URL` = អាសយដ្ឋានគេហទំព័រពិត (សម្រាប់ preview ក្នុង Facebook/Telegram)

## ២) បញ្ជីភ្ញៀវ និងតំណផ្ទាល់ខ្លួន
កែ `src/data/guests.json` (`id`, `name`, `group`, `table`, `message` ជាជម្រើស) រួចរត់៖
```bash
npm run links -- https://your-site.vercel.app
```
បានថត `guest-links/` ដែលមាន `links.csv` (ផ្ញើតំណឱ្យភ្ញៀវម្នាក់ៗ) និង `qr/G001.png ...` (បោះពុម្ពលើកាត)។

## ៣) ទទួល RSVP និងពាក្យជូនពរ (ជ្រើស ១)
**ក. Google Sheets (ណែនាំ)**: បង្កើត Sheet → Extensions → Apps Script → បិទភ្ជាប់ → Deploy → Web app → Who has access: **Anyone** → ចម្លង URL ដាក់ក្នុង `.env` `VITE_FORM_ENDPOINT=`
```js
function doPost(e) {
  const p = e.parameter;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = p.type === "wish" ? "Wishes" : "RSVP";
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(["time", "id", "name", "attending", "guests", "message"]);
  sh.appendRow([new Date(), p.id, p.name, p.attending || "", p.guests || "", p.message || ""]);
  return ContentService.createTextOutput("ok");
}
```
**ខ. Formspree**: បង្កើត form ឥតគិតថ្លៃ → ដាក់ URL ក្នុង `VITE_FORM_ENDPOINT`។
**គ. Telegram (ងាយបំផុត)**: ទុក `VITE_FORM_ENDPOINT` ទទេ រួចដាក់ username ក្នុង `telegram` នៅ `wedding.ts` ភ្ញៀវនឹងបើក Telegram មានសារស្រាប់ ហើយចុច Send។
បើមិនកំណត់ទាំងអស់ គេហទំព័រដំណើរការជា "demo" (រក្សាទុកតែលើឧបករណ៍ភ្ញៀវ)។

## ៤) Deploy
- **Vercel / Netlify**: Import repo → Build `npm run build` → Output `dist` (ដំណើរការស្វ័យប្រវត្តិ)
- ឬ drag-and-drop ថត `dist/` ទៅ Netlify Drop
- ត្រូវកំណត់ `VITE_SITE_URL` មុន build

## តេស្តម៉ូដតាមថ្ងៃ
បន្ថែម `?phase=before`, `?phase=today` ឬ `?phase=after` ក្នុង URL (ឧ. `/?g=G001&phase=today`) ដើម្បីមើលអ្វីដែលភ្ញៀវនឹងឃើញ។

## កំណត់ចំណាំ
- ពាក្យជូនពរទៅដល់អ្នកជាកូនកាត់ តែភ្ញៀវមិនឃើញពាក្យរបស់គ្នាទៅវិញទៅមក (ព្រោះគ្មាន backend)
- កុំដាក់ token/password ក្នុង `.env` ព្រោះវាបង្ហាញជាសាធារណៈក្នុង browser
