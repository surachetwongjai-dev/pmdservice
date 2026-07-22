import { SITE } from './site';

/** BreadcrumbList schema จากรายการ breadcrumb */
export function breadcrumbSchema(crumbs: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: new URL(c.href, SITE.domain).href } : {}),
    })),
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

/** Service schema สำหรับหน้าบริการ */
export function serviceSchema(opts: { name: string; description: string; serviceType: string; url: string; image: string }) {
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
  };
}
