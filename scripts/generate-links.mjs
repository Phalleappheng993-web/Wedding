// Usage: npm run links -- https://your-site.vercel.app
// Reads src/data/guests.json and creates, in ./guest-links/:
//   - links.csv   (name, group, table, link)  → send each guest their own link
//   - qr/<id>.png (a QR code per guest)       → print on cards or send as image
import { mkdir, readFile, writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const site = (process.argv[2] || process.env.VITE_SITE_URL || "").replace(/\/$/, "");
if (!/^https?:\/\//.test(site)) {
  console.error("Please pass your site URL, e.g.\n  npm run links -- https://your-site.vercel.app");
  process.exit(1);
}

const guests = JSON.parse(await readFile(new URL("../src/data/guests.json", import.meta.url), "utf8"));
await mkdir("guest-links/qr", { recursive: true });

const esc = (v = "") => `"${String(v).replaceAll('"', '""')}"`;
const rows = ["id,name,group,table,link"];

for (const g of guests) {
  if (!g.id) {
    console.warn(`Skipped "${g.name}": add an "id" in guests.json`);
    continue;
  }
  const link = `${site}/?g=${encodeURIComponent(g.id)}`;
  rows.push([g.id, esc(g.name), g.group ?? "", g.table ?? "", link].join(","));
  await QRCode.toFile(`guest-links/qr/${g.id}.png`, link, { width: 600, margin: 2, color: { dark: "#4a1722", light: "#ffffff" } });
}

await writeFile("guest-links/links.csv", "\uFEFF" + rows.join("\n"), "utf8"); // BOM: Khmer opens correctly in Excel
console.log(`Done: ${rows.length - 1} guests → guest-links/links.csv and guest-links/qr/`);
