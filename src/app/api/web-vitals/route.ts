import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
  // For now, just log to the server console. In production, replace with
  // a durable store (e.g., Analytics service, BigQuery, or a log ingestion API).
  // Keep payload small; web-vitals metrics are numeric and small.
  console.log('[web-vitals]', JSON.stringify(body));
    return NextResponse.json({ ok: true });
  } catch (err) {
  console.error('web-vitals POST error', err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
