import { chromium } from 'playwright-core';
const OUT = process.argv[2];
// ถ่ายเฉพาะแถบ header (ครอบ 170px บนสุด) หลายขนาดจอ + ทั้ง TH/EN
const jobs = [
  ['hdr-en-1440', '/en/', 1440],
  ['hdr-en-1366', '/en/', 1366],
  ['hdr-en-1280', '/en/', 1280],
  ['hdr-th-1440', '/', 1440],
  ['hdr-en-mobile', '/en/', 390],
];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [name, path, w] of jobs) {
  const ctx = await b.newContext({ viewport: { width: w, height: 300 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:4323' + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: w, height: 170 } });
  console.log(name);
  await ctx.close();
}
await b.close();
