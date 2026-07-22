// ถ่าย screenshot ทุกหน้า desktop 1440 / mobile 375 — ใช้ Edge ที่มีในเครื่อง
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4399';
const OUT = process.argv[2] || '../screenshots';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['home', '/'],
  ['maid-hourly', '/services/maid-hourly-phuket/'],
  ['sofa-cleaning', '/services/sofa-cleaning-phuket/'],
  ['marble-polishing', '/services/marble-polishing-phuket/'],
  ['deep-cleaning', '/services/deep-cleaning-phuket/'],
  ['pricing', '/pricing/'],
  ['contact', '/contact/'],
  ['privacy-policy', '/privacy-policy/'],
  ['thank-you', '/thank-you/'],
  ['404', '/no-such-page/'],
];

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 375, height: 812 }],
];

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
});

for (const [vpName, viewport] of viewports) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    // บังคับโหลดรูป lazy ทั้งหมด แล้วรอจน decode ครบก่อนถ่าย
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
    await page
      .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), { timeout: 15000 })
      .catch(() => {});
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${name}-${vpName}.png`, fullPage: true });
    console.log(`${name}-${vpName}.png`);
  }
  await ctx.close();
}
await browser.close();
