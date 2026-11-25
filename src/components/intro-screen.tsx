
"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function IntroScreen() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const startIntroTimer = React.useCallback(() => {
    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    startIntroTimer();
  };

  const handleImageError = () => {
    setIsLoaded(true);
    startIntroTimer();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          aria-label="Introdução Tanosi"
          role="status"
        >
          <Image
            src="/intro.mp4"
            alt="Tanosi — Introdução"
            fill
            priority
            unoptimized
            sizes="100vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`
              object-cover
              transition-opacity duration-500
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
          />

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black uppercase tracking-[0.35em] text-white">
                TANOSI<span className="text-white/40">.</span>
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
