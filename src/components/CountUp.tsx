"use client";

import React, { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  end: number;
  duration?: number; // ms
  suffix?: string;
  decimals?: number;
  className?: string;
  start?: number;
  separator?: boolean;
  ssrValue?: number | string;
};

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 900,
  suffix = '',
  decimals = 0,
  className = '',
  start = 0,
  separator = true,
  ssrValue,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState<number>(start);
  const [mounted, setMounted] = useState(false);
  const started = useRef(false);

  useEffect(() => {
  setMounted(true);
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not available, start immediately
    const startAnimation = () => {
      if (started.current) return;
      started.current = true;
      const from = start;
      const to = end;
      const t0 = performance.now();

      const frame = (t: number) => {
        const progress = Math.min((t - t0) / duration, 1);
        const current = from + (to - from) * progress;
        setValue(Number(current.toFixed(decimals)));
        if (progress < 1) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, [end, duration, decimals, start]);

  const formatted = separator
    ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);

  // During SSR (not mounted) avoid rendering 0; use ssrValue if provided or render empty string
  if (!mounted) {
    const ssr = typeof ssrValue !== 'undefined' ? ssrValue : '';
    return (
      <span ref={ref} className={className} aria-hidden>
        {ssr}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-hidden>
      {formatted}{suffix}
    </span>
  );
};

export default CountUp;
