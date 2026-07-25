// สร้าง apple-touch-icon.png + favicon PNG จาก public/favicon.svg (โลโก้แม่บ้าน)
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
// favicon-32 เป็นไฟล์ชั่วคราวสำหรับแปลงเป็น .ico ต่อ (ffmpeg -i favicon-32.png favicon.ico)
const targets = [
  { out: 'public/apple-touch-icon.png', size: 180, pad: 10 },
  { out: join(tmpdir(), 'favicon-32.png'), size: 32, pad: 0, abs: true },
];

const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const t of targets) {
  const inner = t.size - t.pad * 2;
  const ctx = await b.newContext({ viewport: { width: t.size, height: t.size }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.setContent(
    `<html><body style="margin:0;width:${t.size}px;height:${t.size}px;background:#fff;display:flex;align-items:center;justify-content:center">
       <div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg style="width:100%;height:100%" `)}</div>
     </body></html>`,
  );
  await pg.waitForTimeout(200);
  const path = t.abs ? t.out : new URL('../' + t.out, import.meta.url).pathname.replace(/^\//, '');
  await pg.screenshot({ path, omitBackground: false });
  console.log('wrote', t.out, t.size + 'px');
  await ctx.close();
}
await b.close();
