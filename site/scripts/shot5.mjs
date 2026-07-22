import { chromium } from 'playwright-core';
const BASE = 'http://localhost:4399';
const OUT = process.argv[2];
const pages = [
  ['villa-cleaning', '/services/villa-cleaning-phuket/', { width: 1440, height: 900 }],
  ['monthly-maid', '/services/monthly-maid-phuket/', { width: 1440, height: 900 }],
  ['carpet-cleaning-mobile', '/services/carpet-cleaning-phuket/', { width: 375, height: 812 }],
  ['loc-patong', '/locations/patong/', { width: 1440, height: 900 }],
  ['loc-cherngtalay-mobile', '/locations/cherngtalay/', { width: 375, height: 812 }],
];
const browser = await chromium.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
for (const [name, path, vp] of pages) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/round2-${name}.png`, fullPage: true });
  console.log(`round2-${name}.png`);
  await ctx.close();
}
await browser.close();
