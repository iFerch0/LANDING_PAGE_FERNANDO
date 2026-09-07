'use client';

import RevealOnScroll from '@/components/RevealOnScroll';
import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanupBrowserExtensions = () => {
      if (typeof document !== 'undefined') {
        const body = document.body;
        if (body.hasAttribute('cz-shortcut-listen')) {
          body.removeAttribute('cz-shortcut-listen');
        }
        const extensionAttributes = ['data-extension', 'extension-installed', 'browser-extension'];
        extensionAttributes.forEach((attr) => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr);
          }
        });
      }
    };

    // Unregister any legacy PWA service workers and purge old caches
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
      if ('caches' in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key);
          }
        });
      }
    }

    const timeoutId = setTimeout(cleanupBrowserExtensions, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <RevealOnScroll />
      {children}
    </>
  );
}
