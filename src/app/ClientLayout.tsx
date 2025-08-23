"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return <>{children}</>;
}
