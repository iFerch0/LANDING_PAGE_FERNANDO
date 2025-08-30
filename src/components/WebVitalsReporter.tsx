'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

// Enhanced Web Vitals tracking with analytics
function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_delta: metric.delta
      },
      // Enhanced GA4 parameters
      engagement_time_msec: metric.value,
      custom_parameter_1: 'web_vitals'
    });
  }

  // Send to console for development (only in development mode)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id
    });
  }

  // Send to custom analytics endpoint (optional)
  if (process.env.NODE_ENV === 'production') {
    try {
      fetch('/api/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          delta: metric.delta,
          id: metric.id,
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        })
      }).catch(console.error);
    } catch (error) {
      console.error('Error sending web vitals:', error);
    }
  }
}

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    sendToAnalytics(metric);
  });

  useEffect(() => {
    // Collect all Core Web Vitals on page load
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
    });
  }, []);

  return null;
}
