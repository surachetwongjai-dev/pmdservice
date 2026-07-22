// ตรวจ internal link + รูป ใน dist/ ทุกหน้า — ลิงก์ต้องชี้ไปไฟล์ที่ build จริง
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = walk(DIST);
let broken = 0;
const checked = new Set();

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const hrefs = [...html.matchAll(/(?:href|src|srcset|poster)="([^"]+)"/g)]
    .flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0]))
    .filter((u) => u.startsWith('/') && !u.startsWith('//'));
  for (const url of hrefs) {
    const clean = url.split('#')[0].split('?')[0];
    if (checked.has(clean)) continue;
    checked.add(clean);
    const asFile = join(DIST, clean);
    const asIndex = join(DIST, clean, 'index.html');
    if (!existsSync(asFile) || (statSync(asFile).isDirectory() && !existsSync(asIndex))) {
      if (!existsSync(asIndex)) {
        console.log(`BROKEN: ${clean}  (พบครั้งแรกใน ${page.replace(DIST, '')})`);
        broken++;
      }
    }
  }
}
console.log(broken === 0 ? `OK — ตรวจ ${checked.size} URL จาก ${pages.length} หน้า ไม่มีลิงก์เสีย` : `พบลิงก์เสีย ${broken} รายการ`);
process.exit(broken ? 1 : 0);
