'use client';

import { useEffect } from 'react';

// Helper functions for Google Analytics event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', eventName, {
      event_category: 'engagement',
      ...parameters
    });
  }
};

export const trackContactEvent = (method: 'whatsapp' | 'phone' | 'form') => {
  trackEvent('contact_attempt', {
    event_category: 'lead_generation',
    method: method,
    value: 1
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('view_service', {
    event_category: 'service_interest',
    service_name: serviceName,
    value: 1
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    page_name: pageName
  });
};

// Component for automatic page view tracking
export default function GAEventTracker() {
  useEffect(() => {
    // Track initial page load
    const currentPath = window.location.pathname;
    trackPageView(currentPath);
  }, []);

  return null;
}
