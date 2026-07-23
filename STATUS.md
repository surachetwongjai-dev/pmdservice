# STATUS — phuketmaidservice.com

> Stack: Astro 7 + Tailwind 4 (static) | โค้ดอยู่ใน `site/`
> รอบ 1 (22 ก.ค. 2026): โครงเว็บ + หน้าแรก + 4 pillar + หน้ารอง
> รอบ 2 (23 ก.ค. 2026): เพิ่มหน้า service ย่อย 22 หน้า + location 11 หน้า ครบตาม BRIEF ข้อ 7

## อัปเดตรอบ 4 (23 ก.ค. 2026) — เพิ่มภาษาอังกฤษ (i18n) รอบแรก

เปิดเว็บสองภาษา (ไทย/อังกฤษ) พร้อมปุ่มสลับภาษา — รอบนี้แปลหน้าหลัก + 4 บริการหลัก (เป้าหมายทั้งเว็บ ทยอยทำรอบถัดไป)

- **ระบบ i18n (Astro)**: ไทยอยู่ root (`/`), อังกฤษอยู่ `/en/` — URL ไทยเดิมไม่เปลี่ยน (ไม่กระทบ SEO)
- **ปุ่มสลับภาษา ไทย|EN** บน top bar ทุกหน้า — ชี้ไปหน้าคู่อีกภาษาเมื่อมี, หน้าที่ยังไม่แปล fallback ไปหน้าแรกอีกภาษา (ไม่มีลิงก์เสีย)
- **UI/เมนู/ปุ่ม/footer สองภาษา**: Header, Footer, MobileCtaBar, CtaButtons, CtaSection, TrustBadges, Testimonials อ่าน `Astro.currentLocale` + dictionary กลางที่ `src/lib/i18n.ts`
- **หน้า EN ที่แปลแล้ว (9 หน้า)**: หน้าแรก, ราคา, ติดต่อ (ฟอร์ม EN ส่ง `/en/thank-you/`), privacy (PDPA), thank-you, 404 (สองภาษา) + 4 pillar (maid-hourly, sofa, marble, deep-cleaning) เนื้อหา EN เต็ม
- **content collections EN**: ไฟล์ `*.en.md` (ตั้ง `generateId` ให้คง `.en`), route `/en/services/[...slug]/` แยกจากไทย
- **SEO 2 ภาษา**: `<html lang>`, `hreflang` alternate (th↔en) ในหน้าที่มีคู่, `og:locale` ตามภาษา, sitemap รวม `/en/` (i18n integration)
- **ยอดหน้า: 51 หน้า** (42 ไทย + 9 อังกฤษ) — build ผ่าน, link check 104 URL ไม่เสีย, sitemap 48 URL
- รอบถัดไป: แปล service ย่อย 21 + location 11 เป็น EN (โครง route/i18n พร้อมแล้ว เพิ่มไฟล์ `*.en.md` ได้เลย)

## อัปเดตรอบ 3 (23 ก.ค. 2026) — แก้ราคา/บริการตามลูกค้า

- **แม่บ้านรายชั่วโมง 250 → 400 บาท/ชม.** ทุกหน้า (85 จุด) — คงขัดหินอ่อน/ทรายล้าง 250 บ./ตร.ม. ไว้ตามเดิม
- **ลบบริการรีดผ้าออกทั้งหมด** — ลบหน้า `/services/ironing-service-phuket/` + ทุก reference (pricing, index, 4 หน้าแม่บ้าน, 4 หน้า location) ไม่มีลิงก์เสีย
- **ซักโซฟาเริ่มต้น 1,000 บาท** (เดิม "สอบถามราคา") — แก้ทั้งหน้า sofa-cleaning และตาราง pricing
- **เพิ่มหมายเหตุทุกหน้าที่แสดงราคา**: (1) ค่าเดินทางหน้าหาด/ไกลเมือง 100–300 บาทตามระยะทาง (2) รายชั่วโมงขั้นต่ำ 2 ชม. (3) ราคายังไม่รวมภาษี — ใส่ใน service template (ครอบ 25 หน้า) + หน้า pricing + หน้าแม่บ้านรายชั่วโมง
- ยอดหน้าใหม่: **42 หน้า** (25 service + 11 location + 6 หน้าหลัก) — ลดจาก 43 เพราะลบรีดผ้า
- ตรวจแล้ว: build ผ่าน, link check 93 URL ไม่เสีย, sitemap 40 URL ไม่มี ironing, ราคาทุกจุดถูกต้อง

## อัปเดตรอบ 2 — หน้า service + location ครบทั้งไซต์

**ยอดรวมตอนนี้: build ผ่าน 43 หน้า** (26 service + 11 location + หน้าแรก/pricing/contact/privacy/thank-you/404)

### หน้า Service ครบ 26 หน้า (`/services/<slug>/`)
- **4 Pillar** (รอบ 1): maid-hourly, sofa-cleaning, marble-polishing, deep-cleaning
- **22 หน้าย่อย** (รอบ 2): house-cleaning, condo-cleaning, villa-cleaning, pool-villa-cleaning, hotel-cleaning, resort-cleaning, airbnb-cleaning, office-cleaning, daily-maid, weekly-maid, monthly-maid, big-cleaning, post-renovation-cleaning, post-construction-cleaning, move-in-cleaning, move-out-cleaning, ironing-service, window-cleaning, carpet-cleaning, mattress-cleaning, curtain-cleaning, sandwash-polishing

### หน้า Location ครบ 11 หน้า (`/locations/<slug>/`)
patong, kata, karon, rawai, cherngtalay, bangtao, kamala, chalong, phuket-town, maikhao, naiyang

### ผลตรวจคุณภาพรอบ 2 (สคริปต์อยู่ใน `site/scripts/`)
- **Build**: ผ่าน 43 หน้า ไม่มี error
- **Sitemap**: 41 URL (ไม่รวม thank-you ที่ noindex + 404) — service 26 + location 11 + หน้าหลัก 4 ครบ
- **Internal links** (`check-links.mjs`): ตรวจ 94 URL จาก 43 หน้า **ไม่มีลิงก์เสีย** — service↔location↔pillar เชื่อมกันครบ (footer มีแถบ 11 location, หน้า pillar มี chips ลิงก์ location, หน้า location มี popularServices ลิงก์ service)
- **Uniqueness** (`check-unique.mjs`): 37 หน้า content **ไม่มีคู่ไหนซ้ำเกิน 10%** (character-shingle overlap) — กัน copy ข้ามหน้า/doorway page
- **Schema**: สุ่มตรวจแล้วทุกหน้ามี FAQPage + BreadcrumbList, หน้า service มี Service schema, h1 เดียวต่อหน้า
- **Screenshot สุ่ม 5 หน้า** (`screenshots/round2-*.png`): villa-cleaning, monthly-maid, carpet-cleaning (mobile), patong, cherngtalay (mobile) — layout ครบทุก section, CTA above the fold, FAQ accordion, areaLinks ทำงาน

### หมายเหตุการทำงานรอบ 2
- หน้า location เขียนเนื้อหาเฉพาะย่านจริงตาม BRIEF (ประเภทที่พักเด่น เช่น เชิงทะเล=พูลวิลล่า/ลากูน่า, ในยาง=Airbnb ใกล้สนามบิน, ป่าตอง=คอนโด/โรงแรม + สั่งงานทางไกล) — กัน Google มองเป็น doorway page
- 15 หน้า service เขียนโดย subagent ขนาน, 7 หน้าเขียนต่อโดยตรง (airbnb, monthly-maid, big-cleaning, post-renovation, post-construction, move-in, move-out) เพราะ subagent ชุดหนึ่งชน session limit — เนื้อหาผ่าน uniqueness check เท่ากัน
- ทุกหน้ามีราคาเฉพาะที่อยู่ใน BRIEF ที่เหลือ "สอบถามราคา", ไม่มีรีวิว/สถิติปลอม

---

## (รอบที่ 1) โครงเว็บและหน้าหลัก

## สิ่งที่สร้างเสร็จในรอบนี้

### หน้า (10 หน้า build ผ่าน)
| หน้า | URL | หมายเหตุ |
|---|---|---|
| หน้าแรก | `/` | ครบทุก section ตาม mockup: hero, บริการ 6 การ์ด, เกี่ยวกับเรา+ตัวเลข, ทำไมต้องเลือกเรา (แถบน้ำเงิน), ผลงาน 6 รูป, รีวิว, CTA band, footer |
| Pillar 1 | `/services/maid-hourly-phuket/` | ราคา 250 บ./ชม. above the fold, ตารางงานที่รวม, จอง 3 สเต็ป, FAQ 4 ข้อ |
| Pillar 2 | `/services/sofa-cleaning-phuket/` | hero **วิดีโอ** ซักโซฟา, อธิบายระบบ Steam, รูปงานจริง 5 รูป, FAQ 4 ข้อ |
| Pillar 3 | `/services/marble-polishing-phuket/` | hero วิดีโอเครื่องขัดพื้น, ราคา 250/100 บ./ตร.ม. ชัดเจน, จุดขาย "ทดลองก่อนตัดสินใจ", เจาะ B2B |
| Pillar 4 | `/services/deep-cleaning-phuket/` | แพ็กเกจเริ่ม 4,000 บ., กลุ่มก่อนเข้าอยู่/หลังก่อสร้าง/ทิ้งไว้นาน, meta keywords รวมคำสะกดผิด "ดริฟคลีนนิ่ง" |
| ราคา | `/pricing/` | ตารางราคารวมทุกบริการ 5 กลุ่ม — เฉพาะราคาที่มีใน BRIEF, ที่เหลือ "สอบถามราคา" |
| ติดต่อ | `/contact/` | ช่องทางครบ + ฟอร์ม formsubmit.co + Google Maps ป่าคลอก (pin ขึ้นหมู่บ้านอุดมสุขถูกต้อง) |
| Privacy | `/privacy-policy/` | อ้างอิง PDPA พ.ร.บ. 2562 ครบ 7 หัวข้อ |
| Thank you | `/thank-you/` | หน้า conversion (noindex) + dataLayer event `form_submit_success` |
| 404 | `/404.html` | ธีมเดียวกับเว็บ + ลิงก์บริการ + CTA |

### Template พร้อมเพิ่มหน้าทีหลัง (ตามที่สั่ง — ยังไม่สร้างหน้าย่อย)
- **Content collections** ใน `site/src/content.config.ts` (schema ครบ: ราคา, FAQ, gallery, steps, related)
- หน้า service ใหม่ = เพิ่มไฟล์ `.md` ใน `site/src/content/services/` (ดูตัวอย่างจาก 4 pillar)
- หน้า location ใหม่ = เพิ่มไฟล์ `.md` ใน `site/src/content/locations/` (มี `_TEMPLATE.md` พร้อมคำเตือนกัน doorway page)
- Template รองรับ: hero รูป/วิดีโอ, Breadcrumb+schema, TrustBadges, ตารางราคา, FAQ accordion, ลิงก์ pillar อัตโนมัติ

### Asset
- รูป 24 ใบ → WebP ชื่ออังกฤษมี keyword (เช่น `sofa-steam-cleaning-phuket.webp`) ใน `site/public/images/` + เวอร์ชัน 800px สำหรับ hero (srcset)
- วิดีโอ 6 ตัว → H.264 720p ตัด 12 วิ. ไร้เสียง + poster WebP ใน `site/public/videos/` (muted autoplay loop + lazy)
- ไม่ใช้: รูปเบลอ/ซ้ำ 5 ไฟล์, วิดีโอซ้ำหมวด 5 ไฟล์ (ยังอยู่ใน `asset/` เดิม ไม่ได้ลบ)

## SEO + Google Ads Quality Score checklist (BRIEF ข้อ 8)

- [x] **8.1 ความเร็ว**: static site, รูป WebP ทั้งหมด (hero ≤242KB + srcset 800px มือถือ), lazy load ยกเว้น hero, font-display swap (Noto Sans Thai self-host), JS มีแค่ toggle เมนู + dataLayer (~1KB)
- [x] **8.2 Message Match**: H1 + ย่อหน้าแรกของทุก pillar ตรง keyword ของ Ad Group (แม่บ้านรายชั่วโมง/ซักโซฟา/ขัดหินอ่อน/Deep Cleaning + ภูเก็ต)
- [x] **8.3 CTA above the fold**: ปุ่มโทร (tel:) + LINE ขนาดใหญ่เห็นทันทีทุกหน้า ทั้ง desktop/mobile (ตรวจจาก screenshot fold แล้ว)
- [x] **8.4 ปุ่มลอยมือถือ**: แถบล่างติดจอ [โทรเลย][LINE จองคิว] ทุกหน้า
- [x] **8.5 Conversion tracking**: โครง GTM ใส่ไว้ (comment รอ ID จริง), dataLayer events: `click_call`, `click_line`, `click_whatsapp`, `form_submit_success`, หน้า `/thank-you/` พร้อม (noindex + ไม่เข้า sitemap)
- [x] **8.6 ความน่าเชื่อถือ**: TrustBadges (ประกัน 100,000/ตรวจประวัติ/อบรม/อุปกรณ์ครบ) แสดงทุก landing page + รีวิว (placeholder)
- [x] **8.7 Schema**: LocalBusiness (HousekeepingService + areaServed ภูเก็ต) ทุกหน้า, Service + FAQPage + BreadcrumbList หน้าบริการ
- [x] **8.8 Navigation + Privacy Policy**: nav ชัดเจน (ไม่มี broken link), `/privacy-policy/` อ้าง PDPA
- [x] เสริม: sitemap-index.xml + robots.txt (block /thank-you/), canonical ทุกหน้า, OG/Twitter card, favicon SVG + apple-touch-icon, `lang="th"`

## ตรวจเทียบ mockup

Screenshot ทุกหน้า desktop 1440 / mobile 375 อยู่ใน `screenshots/` (23 ไฟล์ รวม fold test)
- โครงสร้าง section, ลำดับ, สไตล์การ์ด, โทนน้ำเงิน-ขาว, footer 4 คอลัมน์ ตรงตาม mockup
- ต่างจาก mockup โดยตั้งใจ: (1) ตัวเลขสถิติ "10+ ปี / 500+ ลูกค้า" ใน mockup ไม่มีข้อมูลจริง → ใช้จุดขายจริงแทน (เจ้าแรก/100%/100,000 บ./ทั่วภูเก็ต) (2) เมนู ผลงาน-โปรโมชั่น-บทความ ยังไม่สร้างหน้า จึงไม่ใส่ใน nav กัน broken link (3) รีวิวใช้ placeholder ห้ามแต่งตาม BRIEF ข้อ 10

## [ต้องการข้อมูล / ต้องยืนยันกับลูกค้า]

1. **รีวิวจริงจากลูกค้า 3 รายการ** (ข้อความ + ชื่อ + ประเภทลูกค้า) — ตอนนี้เป็น `[รอรีวิวจริงจากลูกค้า]`
2. **โลโก้จริง** — ตอนนี้ใช้ text logo + ไอคอนบ้าน SVG โทนน้ำเงินชั่วคราว
3. **ราคาซักโซฟา/ที่นอน/ผ้าม่าน ต่อจุด/ต่อที่นั่ง** (BRIEF ระบุให้ยืนยัน) — ตอนนี้ขึ้น "สอบถามราคา"
4. เบอร์ 086-682-6291 จากเว็บเดิมยังใช้ไหม / จะใช้อีเมลโดเมนใหม่ @phuketmaidservice.com ไหม
5. **GTM Container ID จริง** — แทน `GTM-XXXXXXX` ใน `site/src/layouts/BaseLayout.astro` แล้วปลด comment 2 จุด
6. ยืนยันวิธีรับฟอร์ม: ตอนนี้ใช้ **formsubmit.co** ส่งเข้า officephuketmaid@gmail.com (ครั้งแรกต้องกดยืนยันอีเมลจาก formsubmit)
7. รอบหน้า (ตาม BRIEF): หน้า portfolio, about, articles + หน้า service ย่อย ~20 หน้า + หน้า location 11 หน้า

## วิธี Deploy ขึ้น Cloudflare Pages

```bash
cd site
npm run build           # ได้ dist/
npx wrangler pages deploy dist --project-name=phuketmaidservice
# หรือเชื่อม GitHub repo ใน Cloudflare Dashboard:
#   Build command: npm run build | Build output: dist | Root directory: site
# แล้วผูก custom domain: phuketmaidservice.com
```

## คำสั่งที่ใช้บ่อย

```bash
cd site
npm run dev       # dev server
npm run build     # build production
npm run preview   # ดู build จริงที่ localhost:4321
node scripts/screenshot.mjs <out-dir>   # screenshot ทุกหน้า 2 ขนาด (ต้องเปิด preview ที่ :4399 ก่อน)
```

หมายเหตุ git: โฟลเดอร์นี้อยู่ใต้ repo ใหญ่ `C:/Work` จึง init repo แยกของโปรเจกต์นี้ไว้ที่ `phuketmaidservice.com/.git` เพื่อให้เชื่อม GitHub → Cloudflare Pages ได้สะดวก
