# DESIGN NOTES — phuketmaidservice.com

> วิเคราะห์จาก mockup/home.png (สไตล์ Ubon Clean Service) — เปลี่ยนแบรนด์เป็น Phuket Maid Service
> เนื้อหาทั้งหมดมาจาก BRIEF.md เท่านั้น (ข้อความใน mockup เป็นของอุบล ใช้เป็นแค่โครง layout)

## โทนสี (ดูดจาก mockup)

| Token | Hex | ใช้กับ |
|---|---|---|
| `--color-primary-900` | `#0f2a52` | หัวข้อหลัก, พื้น footer, แถบ Why Choose Us |
| `--color-primary-700` | `#1d4ed8` → ปรับเป็น `#1e4fa3` | ปุ่มหลัก, ไอคอน, ลิงก์ active |
| `--color-primary-600` | `#2563b8` | hover, gradient ปุ่ม |
| `--color-primary-100` | `#dbeafe` | พื้นอ่อน, badge |
| `--color-sky-50` | `#eff6fb` | พื้น section สลับขาว |
| ขาว | `#ffffff` | พื้นหลัก, การ์ด |
| เทาอักษรรอง | `#5b6b82` | คำบรรยาย |
| ดาวรีวิว | `#f5a623` | ดาว 5 ดวง testimonial |

## ฟอนต์
- **Noto Sans Thai** (variable, self-host ผ่าน @fontsource-variable) — น้ำหนัก 400/500/700/800
- Fallback: `'Noto Sans Thai', 'Helvetica Neue', Arial, sans-serif` + `font-display: swap`

## โครงหน้าแรก (ตาม mockup บนลงล่าง)

1. **Top bar** น้ำเงินเข้ม: ซ้าย = พื้นที่บริการ "ให้บริการทั่วจังหวัดภูเก็ต", ขวา = โทร 061 965 6292, LINE ID, Facebook icon
2. **Header ขาว sticky**: โลโก้ text (icon บ้าน+ไม้กวาด SVG น้ำเงิน) + nav: หน้าแรก, บริการของเรา (dropdown 4 pillar + pricing), ราคา, ติดต่อเรา + ปุ่ม CTA เขียว LINE / น้ำเงิน "ขอใบเสนอราคา"
   - หมายเหตุ: mockup มีเมนู ผลงาน/โปรโมชั่น/บทความ — รอบนี้ยังไม่สร้างหน้า จึงไม่ใส่ใน nav (กัน broken link) ระบุใน STATUS
3. **Hero**: ซ้าย = H1 ใหญ่ 3 บรรทัด น้ำเงินเข้ม + subhead EN + tagline, แถวไอคอน USP 4 อัน (ตรวจประวัติตำรวจ, ประกัน 100,000 บ., พร้อมอุปกรณ์+น้ำยา, Thai & English), ปุ่ม 2 อัน (โทรเลย / LINE) **above the fold**, ขวา = รูปทีมงานจริง
4. **บริการของเรา** พื้นขาว: การ์ด 6 ใบ (รูปบน, ไอคอนวงกลมน้ำเงินคาบขอบ, ชื่อ TH+EN, คำบรรยายสั้น, ปุ่มดูรายละเอียด):
   แม่บ้านรายชั่วโมง / ซักโซฟา-ที่นอน / ขัดพื้นหินอ่อน / Deep Cleaning / เช็ดกระจก / รีดผ้า (2 อันหลังลิงก์ไป pricing+contact ชั่วคราว)
5. **เกี่ยวกับเรา** พื้นฟ้าอ่อน: ซ้ายรูปทีม, ขวาหัวข้อ+ย่อหน้า+ตัวเลข 4 ช่อง (เจ้าแรก จองออนไลน์, ตรวจประวัติ 100%, ประกัน 100,000 บ., ทั่วภูเก็ต) + ปุ่มอ่านต่อ→contact
6. **ทำไมต้องเลือกเรา** แถบน้ำเงินเข้มเต็มจอ: ไอคอน 5 ข้อ (อบรมมาตรฐาน, ตรวจประวัติอาชญากรรม, ประกันความเสียหาย, อุปกรณ์ครบ, ตรงเวลา-จองออนไลน์)
7. **ผลงานของเรา** พื้นขาว: grid รูปจริง 6 ใบ + caption
8. **รีวิวลูกค้า**: การ์ด 3 ใบ ดาว 5 ดวง — เนื้อหา `[รอรีวิวจริงจากลูกค้า]` (ห้ามแต่ง)
9. **CTA band** + **Footer** น้ำเงินเข้ม 4 คอลัมน์: แบรนด์+คำบรรยาย, เมนูด่วน, บริการ (ลิงก์ 4 pillar), ติดต่อ+เวลาทำการ + social + copyright
10. **แถบลอยล่างมือถือ**: [โทรเลย] [LINE] เขียว/น้ำเงิน ติดจอทุกหน้า

## สไตล์
- มุมโค้ง: การ์ด `rounded-2xl` (~16px), ปุ่ม `rounded-lg`, รูป `rounded-xl`
- เงา: `shadow-[0_10px_30px_rgba(15,42,82,0.08)]` นุ่มๆ, hover ยกขึ้นเล็กน้อย + เงาเข้มขึ้น
- Section padding: `py-16 md:py-24`, container `max-w-6xl`
- หัว section: หัวไทยหนา น้ำเงินเข้ม + คำ EN ตัวเล็กสีน้ำเงินสด + เส้นใต้สั้น
- ปุ่มหลัก: พื้นน้ำเงิน `#1e4fa3` ตัวขาว hover เข้ม / ปุ่ม LINE: เขียว `#06c755` / ปุ่มรอง: ขอบน้ำเงิน
- Transition 150-200ms, smooth scroll

## Asset mapping (ชื่อใหม่ SEO — WebP ทั้งหมด)

### รูปหลักที่ใช้บนหน้า
| ไฟล์เดิม | ชื่อใหม่ | ใช้ที่ |
|---|---|---|
| 751642902 | team-window-cleaning-phuket.webp | Hero หน้าแรก (เห็นเสื้อ PHUKET MAIDS + อาคาร) |
| 752296097 | marble-floor-polishing-phuket.webp | การ์ดบริการขัดพื้น + hero pillar 3 |
| 753336841 | sofa-steam-cleaning-phuket.webp | การ์ดบริการซักโซฟา + hero pillar 2 |
| 749022594 | armchair-steam-cleaning-phuket.webp | pillar 2 gallery |
| 750828594 | chair-deep-stain-removal-phuket.webp | pillar 2 (เห็นรอยสะอาดครึ่งตัว) |
| 749183945 | dining-chair-upholstery-cleaning-phuket.webp | pillar 2 gallery |
| 749820951 | karcher-extraction-machine-phuket.webp | pillar 2 (เครื่องมือมืออาชีพ) |
| 748969643 | mattress-drying-airbnb-phuket.webp | pillar 2 / deep clean gallery |
| 752569749 | maid-kitchen-cabinet-cleaning-phuket.webp | การ์ดแม่บ้านรายชั่วโมง + pillar 1 (เสื้อมีเบอร์) |
| 750178304 | maid-ceiling-dusting-phuket.webp | pillar 1 gallery |
| 753772707 | window-squeegee-cleaning-phuket.webp | การ์ดเช็ดกระจก |
| 753105085 | bathroom-shower-deep-cleaning-phuket.webp | pillar 4 hero/gallery |
| 749096273 | bathroom-cleaning-service-phuket.webp | pillar 4 gallery |
| 749076600 | living-room-deep-cleaning-phuket.webp | pillar 4 gallery + การ์ด Deep Cleaning |
| 751562866 | condo-deep-cleaning-phuket.webp | pillar 4 gallery |
| 751402825 | office-building-cleaning-phuket.webp | เกี่ยวกับเรา (ทีมทำงานอาคาร) |
| 750521748 | kitchen-cleaning-maid-phuket.webp | ผลงาน |
| 753336845 | mirror-cleaning-phuket.webp | ผลงาน |
| 749377702_1683 | cabinet-dusting-phuket.webp | ผลงาน |
| 752951866 | kitchen-deep-cleaning-phuket.webp | ผลงาน |
| 750565412 | toilet-cleaning-phuket.webp | ผลงาน (สำรอง) |
| 751495864 | kitchen-top-cabinet-cleaning-phuket.webp | ผลงาน (สำรอง) |
| 752524441 | bathroom-floor-cleaning-phuket.webp | สำรอง |
| 749377702_1572 | karcher-professional-equipment-phuket.webp | สำรอง |
| 754159590, 750355426, 752296101, ไฟล์ (1) ซ้ำ | — ไม่ใช้ (เบลอ/ซ้ำ/ขวดน้ำยา) |

### วิดีโอ (บีบอัด H.264 720p, muted autoplay loop + poster webp)
| ไฟล์เดิม (ย่อ) | ชื่อใหม่ | ใช้ที่ |
|---|---|---|
| AQM6pQ (vid1) | sofa-steam-extraction-phuket.mp4 | pillar 2 hero video |
| AQMMZpk (vid2) | mattress-steam-sanitize-phuket.mp4 | pillar 2 (ที่นอน/ไอน้ำ) |
| AQN_J1JU (vid7) | floor-scrubbing-machine-phuket.mp4 | pillar 3 hero video |
| AQNyRoEU (vid8) | pressure-washing-floor-phuket.mp4 | pillar 3 (ทรายล้าง) |
| AQN8AZ9 (vid5) | window-glass-washing-phuket.mp4 | หน้าแรก (ผลงาน/hero รอง) — เช็ดกระจก |
| AQOJtBjP (vid10) | upholstery-deep-clean-phuket.mp4 | pillar 2 สำรอง |
| ที่เหลือ (vid3,4,6,9,11) | — ไม่ใช้รอบนี้ (ซ้ำหมวด/มุมไม่สวย/น้ำสกปรก) |

## สิ่งที่ mockup มีแต่ Brief ไม่มีข้อมูล → ทางแก้
- รีวิว 3 ใบพร้อมชื่อคน → ใช้ `[รอรีวิวจริงจากลูกค้า]` โครงการ์ดจริง
- ตัวเลข "10+ ปี, 500+ ลูกค้า" → ห้ามแต่ง ใช้จุดขายจริงจาก Brief แทน (เจ้าแรกจองออนไลน์, ตรวจประวัติ 100%, ประกัน 100,000, ทั่วภูเก็ต)
- เมนูผลงาน/โปรโมชั่น/บทความ → เว้นไว้รอบหน้า (portfolio/articles ยังไม่สร้าง)
- โลโก้กราฟิก → text logo + ไอคอน SVG ประกายน้ำเงิน ตามโทน mockup
