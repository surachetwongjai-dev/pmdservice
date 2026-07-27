// ระบบสองภาษา (ไทย/อังกฤษ) — dictionary ของ UI + helper
export type Locale = 'th' | 'en';
export const DEFAULT_LOCALE: Locale = 'th';
export const LOCALES: Locale[] = ['th', 'en'];

export function otherLocale(l: Locale): Locale {
  return l === 'th' ? 'en' : 'th';
}

/** หน้าแรกของแต่ละภาษา */
export function localeHome(l: Locale): string {
  return l === 'en' ? '/en/' : '/';
}

/** เติม/ถอด prefix /en ให้ path — ใช้คำนวณ URL อีกภาษา (เมื่อมีหน้าคู่จริง) */
export function toLocalePath(path: string, target: Locale): string {
  const stripped = path.replace(/^\/en(\/|$)/, '/');
  if (target === 'en') return ('/en' + stripped).replace(/\/{2,}/g, '/');
  return stripped || '/';
}

type Dict = {
  htmlLang: string;
  dir: string;
  // topbar / header
  topbarNote: string;
  logoTagline: string;
  nav: { label: string; href: string }[];
  ctaLineNav: string;
  ctaCallNav: string; // จะต่อด้วยเบอร์
  langLabel: { th: string; en: string };
  openMenu: string;
  // buttons
  callBtn: string; // "โทร"/"Call"
  lineBtn: string; // "LINE:"
  mobileCall: string;
  mobileLine: string;
  // trust badges
  trust: { title: string; desc: string }[];
  // cta section default
  ctaTitle: string;
  ctaSubtitle: string;
  // testimonials
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsIntro: string;
  reviewPoints: { title: string; desc: string }[];
  clientTypesLabel: string;
  clientTypes: string[];
  // footer
  footerAbout: string;
  footerQuick: string;
  footerServices: string;
  footerServiceLinks: { label: string; href: string }[];
  footerContact: string;
  footerHoursLabel: string;
  footerAreasLabel: string;
  footerQuickLinks: { label: string; href: string }[];
  areaNames: { slug: string; label: string }[];
  rights: string;
  // misc labels
  openingHours: string;
  contactPerson: string;
  breadcrumbHome: string;
  viewAllPricing: string;
};

const areaNamesTH = [
  { slug: 'patong', label: 'ป่าตอง' },
  { slug: 'kata', label: 'กะตะ' },
  { slug: 'karon', label: 'กะรน' },
  { slug: 'rawai', label: 'ราไวย์' },
  { slug: 'cherngtalay', label: 'เชิงทะเล' },
  { slug: 'bangtao', label: 'บางเทา' },
  { slug: 'kamala', label: 'กมลา' },
  { slug: 'chalong', label: 'ฉลอง' },
  { slug: 'phuket-town', label: 'ภูเก็ตทาวน์' },
  { slug: 'maikhao', label: 'ไม้ขาว' },
  { slug: 'naiyang', label: 'ในยาง' },
];
const areaNamesEN = [
  { slug: 'patong', label: 'Patong' },
  { slug: 'kata', label: 'Kata' },
  { slug: 'karon', label: 'Karon' },
  { slug: 'rawai', label: 'Rawai' },
  { slug: 'cherngtalay', label: 'Cherng Talay' },
  { slug: 'bangtao', label: 'Bang Tao' },
  { slug: 'kamala', label: 'Kamala' },
  { slug: 'chalong', label: 'Chalong' },
  { slug: 'phuket-town', label: 'Phuket Town' },
  { slug: 'maikhao', label: 'Mai Khao' },
  { slug: 'naiyang', label: 'Nai Yang' },
];

export const STRINGS: Record<Locale, Dict> = {
  th: {
    htmlLang: 'th',
    dir: 'ltr',
    topbarNote: 'ให้บริการทั่วจังหวัดภูเก็ต ทีมแม่บ้านตรวจประวัติแล้วทุกคน',
    logoTagline: 'บริการทำความสะอาดครบวงจร ภูเก็ต',
    nav: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'แม่บ้านรายชั่วโมง', href: '/services/maid-hourly-phuket/' },
      { label: 'ซักโซฟา', href: '/services/sofa-cleaning-phuket/' },
      { label: 'ขัดพื้นหินอ่อน', href: '/services/marble-polishing-phuket/' },
      { label: 'Deep Cleaning', href: '/services/deep-cleaning-phuket/' },
      { label: 'ราคา', href: '/pricing/' },
      { label: 'ติดต่อเรา', href: '/contact/' },
    ],
    ctaLineNav: 'แอด LINE จองคิว',
    ctaCallNav: 'โทร',
    langLabel: { th: 'ไทย', en: 'EN' },
    openMenu: 'เปิดเมนู',
    callBtn: 'โทร',
    lineBtn: 'LINE:',
    mobileCall: 'โทรเลย',
    mobileLine: 'LINE จองคิว',
    trust: [
      { title: 'ประกันความเสียหาย 100,000 บ.', desc: 'ทุกงานคุ้มครองด้วยวงเงินประกัน' },
      { title: 'ตรวจประวัติอาชญากรรมทุกคน', desc: 'ผ่านการตรวจจากสำนักงานตำรวจ' },
      { title: 'อบรมมาตรฐานก่อนเริ่มงาน', desc: 'ทีมแม่บ้านมืออาชีพ Thai & English' },
      { title: 'พร้อมอุปกรณ์และน้ำยา', desc: 'ไม่ต้องเตรียมอะไร ทีมงานจัดให้ครบ' },
    ],
    ctaTitle: 'พร้อมให้บริการทั่วภูเก็ต จองคิววันนี้',
    ctaSubtitle: 'โทรหรือแอด LINE รับใบเสนอราคาฟรี ไม่มีข้อผูกมัด — ทีมงานตอบทั้งภาษาไทยและอังกฤษ',
    reviewsEyebrow: 'Customer Feedback',
    reviewsTitle: 'สิ่งที่ลูกค้าบอกเราบ่อยที่สุด',
    reviewsIntro: 'สรุปจากฟีดแบ็กที่ลูกค้าบ้าน คอนโด พูลวิลล่า และสำนักงานบอกเรามาบ่อยที่สุด',
    reviewPoints: [
      { title: 'ตรงเวลา', desc: 'ทีมงานมาตามนัด และแจ้งล่วงหน้าทุกครั้งถ้ามีการเปลี่ยนแปลง' },
      { title: 'สะอาดจริง', desc: 'เก็บงานถึงจุดที่การทำความสะอาดทั่วไปมองข้าม แล้วตรวจงานร่วมกันก่อนกลับ' },
      { title: 'มืออาชีพ', desc: 'ผ่านการอบรม ตรวจประวัติอาชญากรรมทุกคน ทุกงานมีประกันความเสียหาย 100,000 บาท' },
      { title: 'คุยง่าย ตอบไว', desc: 'จองผ่าน LINE รู้ราคาชัดเจนก่อนเริ่มงาน สื่อสารได้ทั้งไทยและอังกฤษ' },
    ],
    clientTypesLabel: 'ลูกค้าที่เราดูแลประจำ',
    clientTypes: ['บ้าน / ทาวน์โฮม', 'คอนโด', 'พูลวิลล่า / Airbnb', 'โรงแรม / รีสอร์ท', 'สำนักงาน / อาคาร'],
    footerAbout:
      'บริการทำความสะอาดครบวงจรในภูเก็ต เจ้าแรกที่ให้บริการจองแม่บ้านออนไลน์ แม่บ้านผ่านการอบรมและตรวจประวัติอาชญากรรมทุกคน พร้อมประกันความเสียหายวงเงิน 100,000 บาท',
    footerQuick: 'เมนูด่วน',
    footerServices: 'บริการของเรา',
    footerServiceLinks: [
      { label: 'แม่บ้านรายชั่วโมง / รายวัน', href: '/services/maid-hourly-phuket/' },
      { label: 'ซักโซฟา ที่นอน ผ้าม่าน ไอน้ำฆ่าเชื้อ', href: '/services/sofa-cleaning-phuket/' },
      { label: 'ขัดพื้นหินอ่อน กระเบื้อง', href: '/services/marble-polishing-phuket/' },
      { label: 'Deep Cleaning บ้าน คอนโด', href: '/services/deep-cleaning-phuket/' },
    ],
    footerContact: 'ติดต่อเรา',
    footerHoursLabel: 'เวลาทำการ',
    footerAreasLabel: 'พื้นที่ให้บริการ',
    footerQuickLinks: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'ราคาบริการ', href: '/pricing/' },
      { label: 'ติดต่อเรา', href: '/contact/' },
      { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy-policy/' },
    ],
    areaNames: areaNamesTH,
    rights: 'สงวนลิขสิทธิ์ | บริการทำความสะอาด แม่บ้าน ภูเก็ต',
    openingHours: 'เปิดทุกวัน 08:00 – 18:00 น.',
    contactPerson: 'คุณไก่ (Thai & English)',
    breadcrumbHome: 'หน้าแรก',
    viewAllPricing: 'ดูตารางราคาทุกบริการ →',
  },
  en: {
    htmlLang: 'en',
    dir: 'ltr',
    topbarNote: 'Serving all of Phuket · every maid is background-checked',
    logoTagline: 'Full-service cleaning & maids, Phuket',
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'Hourly Maid', href: '/en/services/maid-hourly-phuket/' },
      { label: 'Sofa Cleaning', href: '/en/services/sofa-cleaning-phuket/' },
      { label: 'Marble Polishing', href: '/en/services/marble-polishing-phuket/' },
      { label: 'Deep Cleaning', href: '/en/services/deep-cleaning-phuket/' },
      { label: 'Pricing', href: '/en/pricing/' },
      { label: 'Contact', href: '/en/contact/' },
    ],
    ctaLineNav: 'Book via LINE',
    ctaCallNav: 'Call',
    langLabel: { th: 'ไทย', en: 'EN' },
    openMenu: 'Open menu',
    callBtn: 'Call',
    lineBtn: 'LINE:',
    mobileCall: 'Call now',
    mobileLine: 'Book via LINE',
    trust: [
      { title: '฿100,000 damage insurance', desc: 'Every job is covered' },
      { title: 'Police background-checked', desc: 'Verified by the police department' },
      { title: 'Fully trained team', desc: 'Professional maids · Thai & English' },
      { title: 'Supplies & products included', desc: 'Nothing to prepare — we bring it all' },
    ],
    ctaTitle: 'Ready to serve across Phuket — book today',
    ctaSubtitle: 'Call or add us on LINE for a free, no-obligation quote — our team replies in both Thai and English.',
    reviewsEyebrow: 'Customer Feedback',
    reviewsTitle: 'What customers tell us most often',
    reviewsIntro: 'A summary of the feedback we hear most from our home, condo, pool-villa and office clients',
    reviewPoints: [
      { title: 'On time', desc: 'The team arrives as booked, and tells you in advance whenever anything changes.' },
      { title: 'Genuinely clean', desc: 'We reach the spots ordinary cleaning skips, then review the result with you before we leave.' },
      { title: 'Professional', desc: 'Every maid is trained and police background-checked, and every job carries ฿100,000 damage insurance.' },
      { title: 'Easy to deal with', desc: 'Book on LINE, know the price clearly before we start, and talk to us in Thai or English.' },
    ],
    clientTypesLabel: 'Clients we look after regularly',
    clientTypes: ['Houses / townhomes', 'Condos', 'Pool villas / Airbnb', 'Hotels / resorts', 'Offices / buildings'],
    footerAbout:
      'Full-service cleaning in Phuket and the first to offer online maid booking. Every maid is trained and police background-checked, and every job carries ฿100,000 damage insurance.',
    footerQuick: 'Quick Links',
    footerServices: 'Our Services',
    footerServiceLinks: [
      { label: 'Hourly / daily maid service', href: '/en/services/maid-hourly-phuket/' },
      { label: 'Sofa, mattress & curtain steam cleaning', href: '/en/services/sofa-cleaning-phuket/' },
      { label: 'Marble & tile floor polishing', href: '/en/services/marble-polishing-phuket/' },
      { label: 'Deep cleaning for homes & condos', href: '/en/services/deep-cleaning-phuket/' },
    ],
    footerContact: 'Contact Us',
    footerHoursLabel: 'Opening hours',
    footerAreasLabel: 'Service areas',
    footerQuickLinks: [
      { label: 'Home', href: '/en/' },
      { label: 'Pricing', href: '/en/pricing/' },
      { label: 'Contact', href: '/en/contact/' },
      { label: 'Privacy Policy', href: '/en/privacy-policy/' },
    ],
    areaNames: areaNamesEN,
    rights: 'All rights reserved | Cleaning & maid service, Phuket',
    openingHours: 'Open daily 08:00 – 18:00',
    contactPerson: 'Khun Kai (Thai & English)',
    breadcrumbHome: 'Home',
    viewAllPricing: 'See all prices →',
  },
};

export function t(locale: Locale): Dict {
  return STRINGS[locale] ?? STRINGS.th;
}
