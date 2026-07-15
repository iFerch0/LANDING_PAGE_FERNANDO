'use client';

import { useReportWebVitals } from 'next/web-vitals';
import type { Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_delta: metric.delta,
      },
      engagement_time_msec: metric.value,
      custom_parameter_1: 'web_vitals',
    });
  }

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
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    } catch (error) {
      console.error('Failed to report web vitals:', error);
    }
  }
}

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    sendToAnalytics(metric);
  });

  return null;
}
