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
