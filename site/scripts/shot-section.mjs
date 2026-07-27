// สกรีนช็อตเฉพาะ section ที่ระบุด้วยข้อความหัวข้อ: node scripts/shot-section.mjs <out> <url> <heading> [height]
import { chromium } from 'playwright-core';
const [OUT, URL, HEADING, H = '620'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const pg = await ctx.newPage();
await pg.goto(`http://localhost:4323${URL}`, { waitUntil: 'networkidle', timeout: 30000 });
const el = pg.locator(`:is(h1,h2,h3):has-text("${HEADING}")`).first();
await el.scrollIntoViewIfNeeded();
await pg.waitForTimeout(700);
const box = await el.boundingBox();
await pg.screenshot({ path: OUT, clip: { x: 0, y: Math.max(0, box.y - 30), width: 1440, height: Number(H) } });
console.log('done');
await b.close();
