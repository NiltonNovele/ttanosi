"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function IntroScreen() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Detectar se o dispositivo é um telemóvel
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  // Iniciar o temporizador de 5 segundos
  const startIntroTimer = React.useCallback(() => {
    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, []);

  // Quando o vídeo estiver pronto
  const handleVideoReady = () => {
    setIsLoaded(true);
    startIntroTimer();
  };

  // Caso o vídeo não consiga carregar
  const handleVideoError = () => {
    setIsLoaded(true);
    startIntroTimer();
  };

  // Limpar o temporizador
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const videoSrc = isMobile
    ? "/intro.mp4"
    : "/intro-pc.mp4";

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
          {/* Vídeo de introdução */}
          {isMobile !== null && (
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={handleVideoReady}
              onError={handleVideoError}
              className={`
                absolute inset-0
                h-full w-full
                object-cover
                transition-opacity duration-500
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
            />
          )}

          {/* Ecrã de carregamento */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
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