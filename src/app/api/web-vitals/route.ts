import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.metric || typeof data.value === 'undefined') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    return NextResponse.json({ success: true, received: data.metric, note: 'Legacy endpoint' });
  } catch {
    return NextResponse.json({ error: 'Failed to process web vitals' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Web Vitals legacy endpoint - POST only' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
