import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const publicDirectory = resolve(process.cwd(), 'public');
const mode = process.env.MODE || process.env.NODE_ENV || 'production';
const loadedEnv = loadEnv(mode, process.cwd(), '');
const configuredSiteUrl = (loadedEnv.VITE_SITE_URL || loadedEnv.SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL || '')
  .trim()
  .replace(/\/+$/, '');
const buildDate = new Date().toISOString().split('T')[0];

if (!configuredSiteUrl) {
  throw new Error(
    '[seo] Missing VITE_SITE_URL. Add VITE_SITE_URL=https://your-domain.com to .env before running the build.'
  );
}

let siteUrl;

try {
  siteUrl = new URL(configuredSiteUrl).toString().replace(/\/+$/, '');
} catch {
  throw new Error('[seo] VITE_SITE_URL must be a valid absolute URL, for example https://your-domain.com');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `# Generated from VITE_SITE_URL during build.
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(resolve(publicDirectory, 'robots.txt'), robots, 'utf8'),
]);

console.log(`[seo] Generated robots.txt and sitemap.xml for ${siteUrl}`);
