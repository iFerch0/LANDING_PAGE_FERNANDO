import { useEffect } from 'react';
import type React from 'react';

export function useResizeObserver(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    if (!ref.current) return;
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(callback);
    ro.observe(ref.current as Element);
    return () => ro.disconnect();
  }, [ref, callback]);
}
