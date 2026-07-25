import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });

// เดสก์ท็อป: header + footer
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const pg = await ctx.newPage();
await pg.goto('http://localhost:4323/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
await pg.waitForTimeout(500);
await pg.screenshot({ path: `${OUT}/brand-header.png`, clip: { x: 0, y: 0, width: 720, height: 110 } });
const f = pg.locator('footer a[aria-label="Phuket Maid Service"]').first();
await f.scrollIntoViewIfNeeded();
await pg.waitForTimeout(400);
const box = await f.boundingBox();
await pg.screenshot({
  path: `${OUT}/brand-footer.png`,
  clip: { x: Math.max(0, box.x - 16), y: Math.max(0, box.y - 16), width: 430, height: box.height + 32 },
});
await ctx.close();

// มือถือ
const ctx2 = await b.newContext({ viewport: { width: 375, height: 780 }, deviceScaleFactor: 2 });
const pg2 = await ctx2.newPage();
await pg2.goto('http://localhost:4323/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
await pg2.waitForTimeout(500);
await pg2.screenshot({ path: `${OUT}/brand-mobile.png`, clip: { x: 0, y: 0, width: 375, height: 120 } });
await ctx2.close();

console.log('done');
await b.close();
