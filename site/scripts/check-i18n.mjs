// ตรวจความครบของสองภาษา: ทุก .md ไทยต้องมีคู่ .en.md + ไฟล์ EN ต้องไม่ลิงก์ /services หรือ /locations แบบไทย (ต้อง /en/)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
let problems = 0;

for (const coll of ['services', 'locations']) {
  const dir = join(root, coll);
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const th = files.filter((f) => !f.endsWith('.en.md'));
  const en = new Set(files.filter((f) => f.endsWith('.en.md')).map((f) => f.replace('.en.md', '')));
  for (const f of th) {
    const base = f.replace('.md', '');
    if (!en.has(base)) {
      console.log(`ขาดคู่ EN: ${coll}/${base}.en.md`);
      problems++;
    }
  }
  // ตรวจลิงก์ในไฟล์ EN
  for (const f of files.filter((f) => f.endsWith('.en.md'))) {
    const raw = readFileSync(join(dir, f), 'utf8');
    // หา href หรือ markdown link ที่ชี้ /services/ หรือ /locations/ โดยไม่มี /en นำหน้า
    const bad = [...raw.matchAll(/(?<!\/en)(\/(?:services|locations)\/[a-z-]+\/)/g)]
      .map((m) => m[1])
      .filter((u) => !raw.includes('/en' + u.slice(0, -1))); // ตัด false positive
    const badLinks = [...raw.matchAll(/href[:=]\s*['"]?(\/(?:services|locations)\/[a-z-]+\/)/g), ...raw.matchAll(/\]\((\/(?:services|locations)\/[a-z-]+\/)\)/g)].map((m) => m[1]);
    if (badLinks.length) {
      console.log(`${coll}/${f}: ลิงก์ยังเป็นไทย (ควรมี /en) → ${[...new Set(badLinks)].join(', ')}`);
      problems++;
    }
  }
}
console.log(problems === 0 ? '✅ สองภาษาครบคู่ + ลิงก์ EN ชี้ /en หมด' : `พบปัญหา ${problems} จุด`);
process.exit(problems ? 1 : 0);
