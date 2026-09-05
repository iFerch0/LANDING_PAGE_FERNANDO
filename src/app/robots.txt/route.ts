import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *
Allow: /

# Block technical files from indexing but allow favicons and public assets
Disallow: /_next/static/
Disallow: /_next/image/
Disallow: /api/
Disallow: /*.woff
Disallow: /*.woff2
Disallow: /*.ttf
Disallow: /*.eot

# Allow Googlebot and Googlebot-Favicons to crawl all icons and assets
Allow: /favicon.ico
Allow: /icon*.png
Allow: /apple-icon.png
Allow: /manifest.json
Allow: /icons/
Allow: /img/
Allow: /_next/static/media/*.jpg
Allow: /_next/static/media/*.jpeg
Allow: /_next/static/media/*.png
Allow: /_next/static/media/*.webp
Allow: /_next/static/media/*.svg

Sitemap: https://www.ferchotecnico.com/sitemap.xml
`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
