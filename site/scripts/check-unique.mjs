// ตรวจความ unique ของเนื้อหา .md ทุกหน้า — จับ copy ข้ามหน้าด้วย character shingle overlap
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dirs = ['../src/content/services', '../src/content/locations'].map((d) =>
  new URL(d, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
);

const docs = [];
for (const dir of dirs) {
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md') || f.startsWith('_')) continue;
    const raw = readFileSync(join(dir, f), 'utf8');
    const body = raw.replace(/^---[\s\S]*?---/, '').replace(/\s+/g, '');
    docs.push({ name: f, body });
  }
}

const SH = 30; // ความยาว shingle (ตัวอักษร)
function shingles(s) {
  const set = new Set();
  for (let i = 0; i + SH <= s.length; i += 5) set.add(s.slice(i, i + SH));
  return set;
}

const sets = docs.map((d) => ({ ...d, sh: shingles(d.body) }));
let flagged = 0;
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const a = sets[i], b = sets[j];
    let inter = 0;
    for (const s of a.sh) if (b.sh.has(s)) inter++;
    const ratio = inter / Math.min(a.sh.size, b.sh.size);
    if (ratio > 0.1) {
      console.log(`OVERLAP ${(ratio * 100).toFixed(1)}%: ${a.name} <-> ${b.name}`);
      flagged++;
    }
  }
}
console.log(flagged === 0 ? `OK — ${docs.length} หน้า ไม่มีคู่ไหนเนื้อหาซ้ำเกิน 10%` : `พบ ${flagged} คู่ที่ซ้ำสูง`);

// รายงานจำนวนตัวอักษร body (ประมาณคำไทย ~ ตัวอักษร/4.5)
for (const d of docs.sort((x, y) => x.body.length - y.body.length).slice(0, 5))
  console.log(`สั้นสุด: ${d.name} ~${Math.round(d.body.length / 4.5)} คำ`);
