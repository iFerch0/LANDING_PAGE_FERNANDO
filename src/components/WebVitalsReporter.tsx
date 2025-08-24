"use client";
import { useEffect } from 'react';
import type { Metric as WVMetric } from 'web-vitals';

export default function WebVitalsReporter() {
  useEffect(() => {
  const send = (metric: WVMetric) => {
      try {
        const body = JSON.stringify(metric);
        if (navigator && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon('/api/web-vitals', body);
          return;
        }
        fetch('/api/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        }).catch(() => {});
      } catch {
        // ignore serialization errors
      }
    };

    import('web-vitals').then((wv: typeof import('web-vitals')) => {
      const { getCLS, getFID, getLCP, getINP, getFCP } = wv;
      if (typeof getCLS === 'function') getCLS((m: WVMetric) => send(m));
      if (typeof getFID === 'function') getFID((m: WVMetric) => send(m));
      if (typeof getLCP === 'function') getLCP((m: WVMetric) => send(m));
      if (typeof getINP === 'function') getINP((m: WVMetric) => send(m));
      if (typeof getFCP === 'function') getFCP((m: WVMetric) => send(m));
    });
  }, []);

  return null;
}
