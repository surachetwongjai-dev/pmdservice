import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * หน้า Service (/services/<slug>/) — เพิ่มหน้าใหม่ = เพิ่มไฟล์ .md ใน src/content/services/
 * เนื้อหา unique 400-600 คำเขียนใน body ของไฟล์ markdown
 */
const services = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/services' }),
  schema: z.object({
    title: z.string(), // H1 = บริการ + ภูเก็ต
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.string().optional(), // meta keywords เสริม (เช่นคำสะกดผิด)
    heroImage: z.string(),
    heroImageAlt: z.string(),
    heroVideo: z.string().optional(), // muted autoplay loop
    heroPoster: z.string().optional(),
    priceHighlight: z.string(), // ราคาเด่น above the fold
    priceUnit: z.string().optional(),
    priceNote: z.string().optional(),
    intro: z.string(), // ย่อหน้าแรก — ต้องมี keyword ของหน้า (message match)
    included: z.array(z.string()).default([]), // งานรวมอะไรบ้าง
    priceRows: z
      .array(z.object({ label: z.string(), price: z.string(), note: z.string().optional() }))
      .default([]),
    steps: z
      .array(z.object({ title: z.string(), desc: z.string() }))
      .default([]), // ขั้นตอนจอง 3 สเต็ป
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]), // ใส่ FAQPage schema
    related: z.array(z.string()).default([]), // slug ของบริการที่เกี่ยวข้อง
    serviceType: z.string(), // ใช้ใน Service schema (schema.org)
    draft: z.boolean().default(false),
  }),
});

/**
 * หน้า Location (/locations/<slug>/) — โครงพร้อมแล้ว เพิ่มไฟล์ .md ใน src/content/locations/
 * กัน doorway page: เนื้อหา body ต้องเป็นข้อมูลเฉพาะพื้นที่จริง ห้าม copy ข้ามหน้า
 */
const locations = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/locations' }),
  schema: z.object({
    areaName: z.string(), // เช่น "ป่าตอง"
    title: z.string(), // H1 = บริการทำความสะอาด + แม่บ้าน ใน<พื้นที่>
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    intro: z.string(),
    propertyTypes: z.array(z.string()).default([]), // ประเภทที่พักเด่นในย่าน
    popularServices: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    travelNote: z.string().optional(), // เวลาเดินทางถึงโดยประมาณ
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, locations };
