import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *
Allow: /

# Block static assets and technical files from indexing
Disallow: /_next/static/
Disallow: /_next/image/
Disallow: /api/
Disallow: /manifest.json
Disallow: /favicon.ico
Disallow: /*.woff
Disallow: /*.woff2
Disallow: /*.ttf
Disallow: /*.eot

# Allow important image files
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
