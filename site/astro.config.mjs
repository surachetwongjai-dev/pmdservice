// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://phuketmaidservice.com',
  trailingSlash: 'always',
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    routing: {
      prefixDefaultLocale: false, // ไทยอยู่ root (/) อังกฤษอยู่ /en/
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/'),
      i18n: {
        defaultLocale: 'th',
        locales: { th: 'th-TH', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
