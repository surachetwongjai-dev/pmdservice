// ข้อมูลธุรกิจกลาง — แก้ที่เดียว ใช้ทุกหน้า (ที่มา: BRIEF.md)
export const SITE = {
  name: 'Phuket Maid Service',
  legalName: 'บริษัท ภูอันดา จำกัด',
  domain: 'https://phuketmaidservice.com',
  description:
    'บริการทำความสะอาดครบวงจรในภูเก็ต แม่บ้านรายชั่วโมง Deep Cleaning ซักโซฟา-ที่นอนระบบไอน้ำ ขัดพื้นหินอ่อน เจ้าแรกที่ให้บริการจองแม่บ้านออนไลน์ในภูเก็ต',

  phoneDisplay: '061-965-6292',
  phoneIntl: '+66619656292',
  lineId: 'phu-andatravel',
  lineUrl: 'https://line.me/R/ti/p/~phu-andatravel',
  whatsapp: 'https://wa.me/66619656292',
  email: 'officephuketmaid@gmail.com',
  facebook: 'https://www.facebook.com/cleaner8',

  address: {
    street: '112/96 หมู่บ้านอุดมสุข หมู่ 8 ซ.5',
    subdistrict: 'ต.ป่าคลอก',
    district: 'อ.ถลาง',
    province: 'จ.ภูเก็ต',
    postalCode: '83110',
    full: '112/96 หมู่บ้านอุดมสุข หมู่ 8 ซ.5 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110',
  },

  openingHours: 'เปิดทุกวัน 08:00 – 18:00 น.',
  contactPerson: 'คุณไก่ (Thai & English)',

  gtmId: '[GTM-XXXXXXX]', // TODO: ใส่ GTM ID จริงก่อนเปิด Ads
} as const;

export const NAV = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'แม่บ้านรายชั่วโมง', href: '/services/maid-hourly-phuket/' },
  { label: 'ซักโซฟา', href: '/services/sofa-cleaning-phuket/' },
  { label: 'ขัดพื้นหินอ่อน', href: '/services/marble-polishing-phuket/' },
  { label: 'Deep Cleaning', href: '/services/deep-cleaning-phuket/' },
  { label: 'ราคา', href: '/pricing/' },
  { label: 'ติดต่อเรา', href: '/contact/' },
] as const;
