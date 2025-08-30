'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

// Enhanced Web Vitals tracking with analytics
function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    try {
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
    } catch (error) {
      console.error('Error sending to Google Analytics:', error);
    }
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
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Use setTimeout to avoid blocking the main thread
    setTimeout(() => {
      try {
        fetch('/api/analytics/web-vitals', {
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
          }),
          keepalive: true // Ensure request completes even if page is unloading
        }).catch((error) => {
          // Silently fail in production to avoid console spam
          if (process.env.NODE_ENV === 'development') {
            console.error('Error sending web vitals:', error);
          }
        });
      } catch (error) {
        // Silently fail in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Error sending web vitals:', error);
        }
      }
    }, 0);
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
