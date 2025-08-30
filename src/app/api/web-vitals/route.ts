import { NextRequest, NextResponse } from 'next/server';

// Legacy endpoint - redirects to analytics endpoint
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.metric || typeof data.value === 'undefined') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Log web vitals data
    console.log('📊 Web Vitals Data (Legacy Endpoint):', {
      metric: data.metric,
      value: data.value,
      delta: data.delta,
      id: data.id,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
      userAgent: data.userAgent?.substring(0, 100)
    });

    return NextResponse.json({ success: true, received: data.metric, note: 'Legacy endpoint' });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    return NextResponse.json({ error: 'Failed to process web vitals' }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Web Vitals legacy endpoint - POST only' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}