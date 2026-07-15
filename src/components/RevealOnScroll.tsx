'use client';

import { useEffect, useRef } from 'react';

/**
 * RevealOnScroll — Zero-dependency replacement for AOS.
 *
 * Observes all [data-reveal] elements and adds .revealed when they enter viewport.
 * Also assigns --stagger-index to children of [data-reveal-stagger] containers.
 *
 * Usage:
 *   <div data-reveal="up">Content</div>
 *   <div data-reveal-stagger>
 *     <div data-reveal="scale">Card 1</div>
 *     <div data-reveal="scale">Card 2</div>
 *   </div>
 */
export default function RevealOnScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Skip if reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    // Assign stagger indices
    document.querySelectorAll('[data-reveal-stagger]').forEach((container) => {
      const children = container.querySelectorAll(':scope > [data-reveal]');
      children.forEach((child, i) => {
        (child as HTMLElement).style.setProperty('--stagger-index', String(i));
      });
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
}
