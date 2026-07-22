// ถ่ายเฉพาะ viewport (ไม่ fullPage) เพื่อตรวจ above-the-fold + แถบ CTA ล่างมือถือ
import { chromium } from 'playwright-core';

const BASE = 'http://localhost:4399';
const OUT = process.argv[2] || '../screenshots';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
});

const jobs = [
  ['home-mobile-fold', '/', { width: 375, height: 812 }],
  ['maid-hourly-mobile-fold', '/services/maid-hourly-phuket/', { width: 375, height: 812 }],
  ['home-desktop-fold', '/', { width: 1440, height: 900 }],
];

for (const [name, path, viewport] of jobs) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`${name}.png`);
  await ctx.close();
}
await browser.close();
