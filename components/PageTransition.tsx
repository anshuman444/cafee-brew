"use client";

import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const secondaryControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    setMounted(true);

    const handleError = (event: ErrorEvent) => {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          message: event.message || 'Unknown Error',
          stack: event.error ? event.error.stack : ''
        })
      }).catch(console.error);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          message: 'Unhandled Promise Rejection: ' + (event.reason ? event.reason.message || event.reason : 'unknown'),
          stack: event.reason && event.reason.stack ? event.reason.stack : ''
        })
      }).catch(console.error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timerId: NodeJS.Timeout;

    const runTransition = async () => {
      // Instantly set curtains to cover the screen & hide content
      controls.set({ scaleY: 1 });
      secondaryControls.set({ scaleY: 1 });
      contentControls.set({ opacity: 0, y: 20 });

      // Animate curtains out and page content in
      timerId = setTimeout(() => {
        controls.start({
          scaleY: 0,
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        });

        secondaryControls.start({
          scaleY: 0,
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
        });

        contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.6, 0, 0.2, 1], delay: 0.3 }
        });
      }, 50);
    };

    runTransition();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [pathname, mounted, controls, secondaryControls, contentControls]);

  if (!mounted) return <div className="min-h-screen bg-primary" />;

  return (
    <div className="relative min-h-screen">
      {/* Luxury Sliding Slide Curtain Overlay */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-accent z-[9999] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={controls}
        style={{ originY: 1 }}
      />

      {/* Dark Secondary Slide Curtain for layered depth */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-primary z-[9998] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={secondaryControls}
        style={{ originY: 1 }}
      />

      {/* Page Content Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={contentControls}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
