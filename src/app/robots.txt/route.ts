import { NextResponse } from 'next/server';

export function GET() {
  const body = `User-agent: *\nDisallow:\n\nSitemap: https://www.ferchotecnico.com/sitemap.xml\n`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
