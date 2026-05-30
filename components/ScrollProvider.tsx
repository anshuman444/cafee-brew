"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        // If the component unmounted or changed path before the import resolved, abort
        if (!isMounted) return;

        // Destroy any existing instance just in case
        if (scrollRef.current) {
          if (typeof scrollRef.current.destroy === "function") {
            scrollRef.current.destroy();
          }
          scrollRef.current = null;
        }

        // Initialize new Locomotive Scroll instance
        scrollRef.current = new LocomotiveScroll();
      } catch (error) {
        console.error("Failed to initialize Locomotive Scroll:", error);
      }
    };

    // Destroy any existing instance immediately on pathname change to unlock scroll
    if (scrollRef.current) {
      if (typeof scrollRef.current.destroy === "function") {
        scrollRef.current.destroy();
      }
      scrollRef.current = null;
    }

    // Delay initialization until the page transition has finished mounting and animating the new DOM
    timer = setTimeout(() => {
      initScroll();
    }, 900);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (scrollRef.current) {
        if (typeof scrollRef.current.destroy === "function") {
          scrollRef.current.destroy();
        }
        scrollRef.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
