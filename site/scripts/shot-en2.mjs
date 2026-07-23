import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const pages = [
  ['en-villa', '/en/services/villa-cleaning-phuket/', { width: 1440, height: 900 }],
  ['en-loc-patong', '/en/locations/patong/', { width: 1440, height: 900 }],
  ['en-sofa-mobile', '/en/services/sofa-cleaning-phuket/', { width: 375, height: 812 }],
];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [name, path, vp] of pages) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:4323' + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await pg.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
  await pg.waitForFunction(() => [...document.images].every((i) => i.complete), { timeout: 12000 }).catch(() => {});
  await pg.waitForTimeout(400);
  await pg.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log(name);
  await ctx.close();
}
await b.close();
