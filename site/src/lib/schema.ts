import { SITE } from './site';

/**
 * BreadcrumbList schema จากรายการ breadcrumb
 * crumb สุดท้าย (หน้าปัจจุบัน) ไม่มี href เพราะบนหน้าจอไม่ทำเป็นลิงก์
 * แต่ Google ต้องการ field `item` ทุก ListItem จึงต้องส่ง currentPath มาเติมให้
 */
export function breadcrumbSchema(crumbs: { label: string; href?: string }[], currentPath?: string) {
  const last = crumbs.length - 1;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => {
      const href = c.href ?? (i === last ? currentPath : undefined);
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        ...(href ? { item: new URL(href, SITE.domain).href } : {}),
      };
    }),
  };
}

/** FAQPage schema จากรายการคำถาม-คำตอบ */
export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** ราคาแบบมีโครงสร้างสำหรับ Google (Offer / UnitPriceSpecification) */
export type Offer = { price: number; unit: 'hour' | 'sqm' | 'from' };

function buildOffer(offer: Offer) {
  const base = {
    '@type': 'Offer',
    priceCurrency: 'THB',
    availability: 'https://schema.org/InStock',
    areaServed: { '@type': 'AdministrativeArea', name: 'Phuket' },
    seller: { '@id': `${SITE.domain}/#business` },
  };
  if (offer.unit === 'from') {
    // ราคาเริ่มต้น (เช่น Big Cleaning 4,000 / ซักโซฟา 1,000)
    return { ...base, price: String(offer.price), description: `เริ่มต้น ${offer.price.toLocaleString()} บาท (ยังไม่รวมภาษี)` };
  }
  // ราคาต่อหน่วย (ชั่วโมง / ตร.ม.)
  return {
    ...base,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(offer.price),
      priceCurrency: 'THB',
      unitCode: offer.unit === 'hour' ? 'HUR' : 'MTK',
      unitText: offer.unit === 'hour' ? 'ชั่วโมง' : 'ตารางเมตร',
      valueAddedTaxIncluded: false,
    },
  };
}

/** Service schema สำหรับหน้าบริการ */
export function serviceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  image: string;
  offer?: Offer;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: new URL(opts.url, SITE.domain).href,
    image: new URL(opts.image, SITE.domain).href,
    areaServed: { '@type': 'AdministrativeArea', name: 'จังหวัดภูเก็ต' },
    provider: { '@id': `${SITE.domain}/#business` },
    ...(opts.offer ? { offers: buildOffer(opts.offer) } : {}),
  };
}
