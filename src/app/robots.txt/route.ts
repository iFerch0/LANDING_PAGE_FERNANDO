import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *
Allow: /

# Block static assets from indexing
Disallow: /_next/static/
Disallow: /_next/image/
Disallow: /api/

# Allow important files
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
