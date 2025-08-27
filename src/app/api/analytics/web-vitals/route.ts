import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log web vitals data (in production, you might want to send to a database or analytics service)
    console.log('📊 Web Vitals Data:', {
      metric: data.metric,
      value: data.value,
      delta: data.delta,
      id: data.id,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
      userAgent: data.userAgent?.substring(0, 100) // Truncate for logging
    });

    // Here you could send to external analytics services like:
    // - Google Analytics Measurement Protocol
    // - DataDog
    // - New Relic
    // - Custom database
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    return NextResponse.json({ error: 'Failed to process web vitals' }, { status: 500 });
  }
}
