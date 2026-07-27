// สกรีนช็อต hero ของหน้าที่ระบุ (ใช้ตรวจรูป/วิดีโอหลังเปลี่ยน asset)
import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const PAGES = process.argv.slice(3);
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const pg = await ctx.newPage();
for (const p of PAGES) {
  const name = p.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';
  await pg.goto(`http://localhost:4323${p}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await pg.waitForTimeout(900); // ให้วิดีโอเริ่มเล่น
  await pg.screenshot({ path: `${OUT}/hero-${name}.png`, clip: { x: 0, y: 95, width: 1440, height: 600 } });
  console.log('shot', p);
}
await b.close();
