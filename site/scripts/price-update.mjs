// เปลี่ยนราคารายชั่วโมง 250 -> 400 ทุกไฟล์ โดยป้องกัน "250 บาท/ตร.ม." (ขัดหินอ่อน) และ skip marble-polishing.md
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const files = [];
for (const sub of ['content/services', 'content/locations']) {
  const dir = join(root, sub);
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.md') && !f.startsWith('_') && f !== 'marble-polishing-phuket.md') files.push(join(dir, f));
  }
}
files.push(join(root, 'pages/pricing.astro'), join(root, 'pages/index.astro'));

let changed = 0;
const report = [];
for (const file of files) {
  const orig = readFileSync(file, 'utf8');
  let s = orig;
  // 1) ป้องกัน ตร.ม. (ขัดหินอ่อน/ทรายล้าง) ด้วย token
  s = s.replace(/250( บาท| บ\.)\/ ?ตร\.ม\./g, (m) => m.replace('250', '§SQM§'));
  // 2) เปลี่ยนรายชั่วโมง 250 -> 400
  const before = s;
  s = s.replace(/250 บาท/g, '400 บาท').replace(/250 บ\./g, '400 บ.');
  const hits = (before.match(/250 บาท|250 บ\./g) || []).length;
  // 3) คืน token ขัดหินอ่อน
  s = s.replace(/§SQM§/g, '250');
  if (s !== orig) {
    writeFileSync(file, s, 'utf8');
    changed++;
    report.push(`${file.split(/[\\/]/).pop()}: ${hits} จุด`);
  }
}
console.log(`เปลี่ยน ${changed} ไฟล์`);
report.forEach((r) => console.log('  ' + r));
