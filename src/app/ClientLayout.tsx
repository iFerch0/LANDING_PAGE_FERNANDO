"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Clean up any browser extension modifications that might cause hydration mismatches
    const cleanupBrowserExtensions = () => {
      // Remove ColorZilla extension attributes
      if (typeof document !== 'undefined') {
        const body = document.body;
        if (body.hasAttribute('cz-shortcut-listen')) {
          body.removeAttribute('cz-shortcut-listen');
        }
        // Remove any other common browser extension attributes that might cause issues
        const extensionAttributes = ['data-extension', 'extension-installed', 'browser-extension'];
        extensionAttributes.forEach(attr => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr);
          }
        });
      }
    };

    // Run cleanup after a short delay to ensure extensions have loaded
    const timeoutId = setTimeout(cleanupBrowserExtensions, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
