import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const publicDirectory = resolve(process.cwd(), 'public');
const generatedEnvFile = resolve(process.cwd(), '.env.production.local');
const mode = process.env.MODE || process.env.NODE_ENV || 'production';
const loadedEnv = loadEnv(mode, process.cwd(), '');
const buildDate = new Date().toISOString().split('T')[0];

function cleanUrlCandidate(value) {
  return value?.trim().replace(/\/+$/, '') || '';
}

function toAbsoluteUrl(value) {
  if (!value) {
    return '';
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const configuredSiteUrl = cleanUrlCandidate(
  loadedEnv.VITE_SITE_URL || loadedEnv.SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL
);

const vercelProductionUrl = cleanUrlCandidate(
  process.env.VERCEL_PROJECT_PRODUCTION_URL || loadedEnv.VERCEL_PROJECT_PRODUCTION_URL
);

const vercelDeploymentUrl = cleanUrlCandidate(process.env.VERCEL_URL || loadedEnv.VERCEL_URL);

const resolvedSiteUrlCandidate =
  configuredSiteUrl ||
  toAbsoluteUrl(vercelProductionUrl) ||
  toAbsoluteUrl(vercelDeploymentUrl);

let siteUrl;

try {
  siteUrl = new URL(resolvedSiteUrlCandidate).toString().replace(/\/+$/, '');
} catch {
  throw new Error(
    '[seo] Missing a valid site URL. Set VITE_SITE_URL=https://your-domain.com, or on Vercel enable Automatically expose System Environment Variables so VERCEL_PROJECT_PRODUCTION_URL is available.'
  );
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
  writeFile(
    generatedEnvFile,
    `# Generated during build for Vite HTML/meta replacement.\nVITE_SITE_URL=${siteUrl}\n`,
    'utf8'
  ),
]);

console.log(`[seo] Generated robots.txt, sitemap.xml, and build env for ${siteUrl}`);
