// contact sheet ดูรูป/เฟรมวิดีโอหลายไฟล์พร้อมกัน (ใช้ตอนเลือกรูปมาลงเว็บ)
import { chromium } from 'playwright-core';
const FILE = process.argv[2];
const OUT = process.argv[3];
const H = Number(process.argv[4] ?? 1500);
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const ctx = await b.newContext({ viewport: { width: 1240, height: H }, deviceScaleFactor: 1 });
const pg = await ctx.newPage();
await pg.goto('file:///' + FILE.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 30000 });
await pg.waitForTimeout(500);
await pg.screenshot({ path: OUT, fullPage: true });
console.log('done');
await b.close();
