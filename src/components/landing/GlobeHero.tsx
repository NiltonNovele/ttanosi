"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

/* =========================================================
   TANOSI ARCHIVE
   Apenas: T-shirts · Gorros · Bonés Fitted
========================================================= */

const DATA = [
  {
    id: 0,
    collection: "ARQUIVO ESSENCIAL",
    title: "T-SHIRT",
    title2: "CORE",
    description:
      "T-shirt de corte oversized em algodão premium, construída para um caimento descontraído e uma presença minimalista. Uma peça essencial para todos os dias.",
    image: "/design/3.jpeg",
    tag: "01",
    type: "T-SHIRT",
  },
  {
    id: 1,
    collection: "NOVA COLECÇÃO",
    title: "T-SHIRT",
    title2: "SIGNAL",
    description:
      "Uma interpretação contemporânea da T-shirt clássica, com corte amplo, construção pesada e uma identidade gráfica criada para se destacar.",
    image: "/women.jpeg",
    tag: "02",
    type: "T-SHIRT",
  },
  {
    id: 2,
    collection: "ARQUIVO TANOSI",
    title: "GORRO",
    title2: "CORE",
    description:
      "Gorro de malha com construção confortável e estética limpa. Um essencial para completar qualquer combinação Tanosi.",
    image: "/product/14.png",
    tag: "03",
    type: "GORRO",
  },
  {
    id: 3,
    collection: "LIMITLESS",
    title: "T-SHIRT",
    title2: "ARCHIVE",
    description:
      "Silhueta oversized inspirada no arquivo Tanosi. Algodão de peso elevado, ombros descaídos e uma construção pensada para durar.",
    image: "/product/11.png",
    tag: "04",
    type: "T-SHIRT",
  },
  {
    id: 4,
    collection: "HEADWEAR",
    title: "FITTED",
    title2: "01",
    description:
      "Boné fitted de perfil estruturado, concebido para um ajuste preciso e uma presença discreta. O essencial elevado ao detalhe.",
    image: "/product/17.png",
    tag: "05",
    type: "BONÉ FITTED",
  },
  {
    id: 5,
    collection: "THE MOVEMENT",
    title: "T-SHIRT",
    title2: "MOVEMENT",
    description:
      "Uma T-shirt criada para representar o movimento. Corte relaxado, construção robusta e uma linguagem visual directamente ligada à identidade Tanosi.",
    image: "/product/TANO7.png",
    tag: "06",
    type: "T-SHIRT",
  },
  {
    id: 6,
    collection: "HEADWEAR",
    title: "GORRO",
    title2: "ARCHIVE",
    description:
      "Uma peça de headwear essencial com acabamento minimalista e construção confortável. Criada para acompanhar o ritmo da rua.",
    image: "/product/15.png",
    tag: "07",
    type: "GORRO",
  },
  {
    id: 7,
    collection: "FITTED SERIES",
    title: "FITTED",
    title2: "02",
    description:
      "Boné fitted de construção estruturada com uma abordagem limpa e contemporânea. Um clássico reinterpretado pela Tanosi.",
    image: "/product/cap1.png",
    tag: "08",
    type: "BONÉ FITTED",
  },
  {
    id: 8,
    collection: "CORE SERIES",
    title: "T-SHIRT",
    title2: "BLACK",
    description:
      "A T-shirt essencial em preto. Silhueta ampla, presença forte e uma construção simples que deixa a identidade falar por si.",
    image: "/design/4.jpeg",
    tag: "09",
    type: "T-SHIRT",
  },
];

export function GlobeHero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeRef = React.useRef(0);
  const animatingRef = React.useRef(false);
  const pausedRef = React.useRef(false);

  const autoplayRef =
    React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const activeData = DATA[activeIndex];

  React.useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* =====================================================
         LAYOUT
      ===================================================== */

      const getLayout = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const mobile = width < 768;
        const tablet = width >= 768 && width < 1100;

        /*
         * Mobile:
         * 3 cards visíveis
         *
         * Tablet:
         * 3 cards
         *
         * Desktop:
         * 4 cards
         */

        const cardWidth = mobile
          ? Math.min(Math.max(width * 0.29, 92), 135)
          : tablet
            ? 205
            : 255;

        const cardHeight = mobile
          ? Math.min(Math.max(height * 0.24, 175), 210)
          : tablet
            ? 300
            : 370;

        const gap = mobile ? 9 : tablet ? 18 : 24;

        const visibleCards = mobile ? 3 : tablet ? 3 : 4;

        const totalWidth =
          cardWidth * visibleCards +
          gap * (visibleCards - 1);

        const left = mobile
          ? Math.max(16, (width - totalWidth) / 2)
          : Math.max(40, width - totalWidth - 70);

        const top = mobile
          ? height - cardHeight - 42
          : height - cardHeight - 70;

        return {
          width,
          height,
          mobile,
          tablet,
          cardWidth,
          cardHeight,
          gap,
          visibleCards,
          left,
          top,
        };
      };

      /* =====================================================
         ELEMENT HELPERS
      ===================================================== */

      const getCard = (index: number) =>
        container.querySelector<HTMLElement>(
          `#card-${index}`,
        );

      const getCardContent = (index: number) =>
        container.querySelector<HTMLElement>(
          `#card-content-${index}`,
        );

      const getOverlay = (index: number) =>
        container.querySelector<HTMLElement>(
          `#overlay-${index}`,
        );

      const getImage = (index: number) =>
        container.querySelector<HTMLElement>(
          `#image-${index}`,
        );

      /* =====================================================
         POSITION ARCHIVE
      ===================================================== */

      const getArchiveDistance = (
        index: number,
        active: number,
      ) => {
        if (index === active) return 0;

        return (
          (index - active - 1 + DATA.length) %
          DATA.length
        );
      };

      const positionCards = () => {
        const {
          width,
          height,
          cardWidth,
          cardHeight,
          gap,
          left,
          top,
          mobile,
        } = getLayout();

        const active = activeRef.current;

        DATA.forEach((_, index) => {
          const card = getCard(index);
          const content = getCardContent(index);
          const image = getImage(index);

          if (!card || !content) return;

          /* =================================================
             ACTIVE IMAGE
          ================================================= */

          if (index === active) {
            gsap.set(card, {
              x: 0,
              y: 0,
              width,
              height,
              borderRadius: 0,
              zIndex: 20,
              scale: 1,
              opacity: 1,
            });

            gsap.set(content, {
              x: mobile ? 20 : 0,
              y: mobile ? 0 : 35,
              opacity: 0,
              zIndex: 50,
            });

            if (image) {
              gsap.set(image, {
                scale: 1.08,
              });
            }

            return;
          }

          /* =================================================
             ARCHIVE IMAGES
          ================================================= */

          const distance = getArchiveDistance(
            index,
            active,
          );

          const visiblePosition = Math.min(
            distance,
            3,
          );

          const x =
            left +
            visiblePosition *
              (cardWidth + gap);

          gsap.set(card, {
            x,
            y: top,
            width: cardWidth,
            height: cardHeight,
            borderRadius: mobile ? 6 : 8,
            zIndex: 30,
            scale: 1,
            opacity: 1,
          });

          gsap.set(content, {
            x,
            y: top + cardHeight - 58,
            opacity:
              visiblePosition < 3 ? 1 : 0,
            zIndex: 40,
          });

          if (image) {
            gsap.set(image, {
              scale: 1,
            });
          }
        });
      };

      /* =====================================================
         IMAGE PRELOAD
      ===================================================== */

      const preloadImages = async () => {
        await Promise.all(
          DATA.map(
            (item) =>
              new Promise<void>((resolve) => {
                const img = new Image();

                img.onload = () => resolve();
                img.onerror = () => resolve();

                img.src = item.image;
              }),
          ),
        );
      };

      /* =====================================================
         INITIAL REVEAL
      ===================================================== */

      const reveal = () => {
        const { width } = getLayout();

        const cover =
          container.querySelector<HTMLElement>(
            ".hero-cover",
          );

        if (cover) {
          gsap.to(cover, {
            x: width + 100,
            duration: reducedMotion ? 0 : 1.3,
            delay: 0.1,
            ease: "expo.inOut",
          });
        }

        const activeContent = getCardContent(
          activeRef.current,
        );

        if (activeContent) {
          gsap.to(activeContent, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: reducedMotion ? 0 : 1,
            delay: 0.45,
            ease: "expo.out",
          });
        }

        gsap.fromTo(
          ".hero-kicker",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: reducedMotion ? 0 : 0.8,
            delay: 0.5,
            ease: "expo.out",
          },
        );

        gsap.fromTo(
          ".hero-wordmark",
          {
            y: 70,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: reducedMotion ? 0 : 1.1,
            delay: 0.55,
            ease: "expo.out",
          },
        );

        gsap.fromTo(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: reducedMotion ? 0 : 0.8,
            delay: 0.75,
            ease: "expo.out",
          },
        );
      };

      /* =====================================================
         AUTOPLAY
      ===================================================== */

      const scheduleAutoplay = () => {
        if (autoplayRef.current) {
          clearTimeout(autoplayRef.current);
        }

        if (pausedRef.current) return;

        autoplayRef.current = setTimeout(() => {
          if (
            pausedRef.current ||
            animatingRef.current
          ) {
            scheduleAutoplay();
            return;
          }

          const next =
            (activeRef.current + 1) %
            DATA.length;

          goTo(next, 1);
        }, 5500);
      };

      /* =====================================================
         MAIN SLIDE TRANSITION
      ===================================================== */

      const goTo = (
        nextIndex: number,
        direction: 1 | -1 = 1,
      ) => {
        if (
          nextIndex === activeRef.current ||
          animatingRef.current
        ) {
          return;
        }

        animatingRef.current = true;

        if (autoplayRef.current) {
          clearTimeout(autoplayRef.current);
        }

        const {
          width,
          height,
          cardWidth,
          cardHeight,
          gap,
          left,
          top,
          mobile,
        } = getLayout();

        const oldIndex = activeRef.current;

        const oldCard = getCard(oldIndex);
        const newCard = getCard(nextIndex);

        const oldContent =
          getCardContent(oldIndex);

        const newContent =
          getCardContent(nextIndex);

        if (!oldCard || !newCard) {
          animatingRef.current = false;
          return;
        }

        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);

        /* =================================================
           INCOMING CARD
        ================================================= */

        gsap.set(newCard, {
          x:
            direction > 0
              ? width
              : -width,
          y: 0,
          width,
          height,
          borderRadius: 0,
          zIndex: 25,
          scale: 1,
          opacity: 1,
        });

        const newImage = getImage(nextIndex);

        if (newImage) {
          gsap.set(newImage, {
            scale: 1.08,
          });
        }

        const newOverlay =
          getOverlay(nextIndex);

        if (newOverlay) {
          gsap.set(newOverlay, {
            opacity: 0.3,
          });
        }

        /* =================================================
           OLD TEXT OUT
        ================================================= */

        if (oldContent) {
          gsap.to(oldContent, {
            opacity: 0,
            y: 25,
            duration: reducedMotion ? 0 : 0.3,
            ease: "power2.in",
          });
        }

        /* =================================================
           TIMELINE
        ================================================= */

        const tl = gsap.timeline({
          onComplete: () => {
            /* =============================================
               OLD CARD → ARCHIVE
            ============================================= */

            const archiveX =
              left +
              3 * (cardWidth + gap);

            gsap.set(oldCard, {
              x: archiveX,
              y: top,
              width: cardWidth,
              height: cardHeight,
              borderRadius: mobile ? 6 : 8,
              zIndex: 30,
              scale: 1,
              opacity: 1,
            });

            const oldImage =
              getImage(oldIndex);

            if (oldImage) {
              gsap.set(oldImage, {
                scale: 1,
              });
            }

            if (oldContent) {
              gsap.set(oldContent, {
                x: archiveX,
                y: top + cardHeight - 58,
                opacity: 0,
                zIndex: 40,
              });
            }

            /* =============================================
               NEW CARD → ACTIVE
            ============================================= */

            gsap.set(newCard, {
              x: 0,
              y: 0,
              width,
              height,
              borderRadius: 0,
              zIndex: 20,
            });

            /* =============================================
               REPOSITION ARCHIVE
            ============================================= */

            DATA.forEach((_, index) => {
              if (
                index === nextIndex ||
                index === oldIndex
              ) {
                return;
              }

              const distance =
                getArchiveDistance(
                  index,
                  nextIndex,
                );

              if (distance > 3) return;

              const x =
                left +
                distance *
                  (cardWidth + gap);

              const card = getCard(index);
              const content =
                getCardContent(index);

              if (card) {
                gsap.set(card, {
                  x,
                  y: top,
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: mobile
                    ? 6
                    : 8,
                  zIndex: 30,
                });
              }

              if (content) {
                gsap.set(content, {
                  x,
                  y:
                    top +
                    cardHeight -
                    58,
                  opacity:
                    distance < 3 ? 1 : 0,
                  zIndex: 40,
                });
              }
            });

            animatingRef.current = false;

            scheduleAutoplay();
          },
        });

        /* =================================================
           IMAGE SLIDE
        ================================================= */

        tl.to(
          newCard,
          {
            x: 0,
            duration: reducedMotion ? 0 : 1.25,
            ease: "expo.inOut",
          },
          0,
        );

        /* =================================================
           IMAGE ZOOM
        ================================================= */

        if (newImage) {
          tl.to(
            newImage,
            {
              scale: 1,
              duration: reducedMotion ? 0 : 1.5,
              ease: "power2.out",
            },
            0,
          );
        }

        /* =================================================
           OVERLAY
        ================================================= */

        if (newOverlay) {
          tl.to(
            newOverlay,
            {
              opacity: 0.38,
              duration: reducedMotion ? 0 : 0.9,
              ease: "power2.out",
            },
            0.15,
          );
        }

        /* =================================================
           ARCHIVE CARDS
        ================================================= */

        DATA.forEach((_, index) => {
          if (
            index === nextIndex ||
            index === oldIndex
          ) {
            return;
          }

          const distance =
            getArchiveDistance(
              index,
              nextIndex,
            );

          if (distance > 3) return;

          const x =
            left +
            distance *
              (cardWidth + gap);

          const card = getCard(index);
          const content =
            getCardContent(index);

          if (card) {
            tl.to(
              card,
              {
                x,
                y: top,
                width: cardWidth,
                height: cardHeight,
                borderRadius: mobile
                  ? 6
                  : 8,
                duration: reducedMotion
                  ? 0
                  : 0.85,
                ease: "expo.inOut",
              },
              0.1,
            );
          }

          if (content) {
            tl.to(
              content,
              {
                x,
                y:
                  top +
                  cardHeight -
                  58,
                opacity:
                  distance < 3 ? 1 : 0,
                duration: reducedMotion
                  ? 0
                  : 0.85,
                ease: "expo.inOut",
              },
              0.1,
            );
          }
        });

        /* =================================================
           HERO COPY
        ================================================= */

        if (newContent) {
          tl.fromTo(
            newContent,
            {
              opacity: 0,
              x: mobile ? 20 : -45,
              y: mobile ? 0 : 35,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: reducedMotion
                ? 0
                : 0.85,
              ease: "expo.out",
            },
            0.75,
          );
        }

        /* =================================================
           COUNTER
        ================================================= */

        tl.fromTo(
          ".slide-counter",
          {
            opacity: 0.2,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion
              ? 0
              : 0.35,
          },
          0.65,
        );
      };

      /* =====================================================
         RESIZE
      ===================================================== */

      const handleResize = () => {
        if (animatingRef.current) return;

        positionCards();
      };

      /* =====================================================
         NAVIGATION EVENT
      ===================================================== */

      const handleNavigation = (
        event: Event,
      ) => {
        const customEvent =
          event as CustomEvent<{
            index: number;
            direction: 1 | -1;
          }>;

        const nextIndex =
          customEvent.detail?.index;

        const direction =
          customEvent.detail?.direction ??
          1;

        if (
          typeof nextIndex !== "number" ||
          nextIndex === activeRef.current ||
          animatingRef.current
        ) {
          return;
        }

        goTo(nextIndex, direction);
      };

      /* =====================================================
         INITIALIZATION
      ===================================================== */

      positionCards();

      const initialize = async () => {
        await preloadImages();

        const activeCard =
          getCard(activeRef.current);

        const activeImage =
          getImage(activeRef.current);

        if (activeCard) {
          gsap.set(activeCard, {
            opacity: 1,
          });
        }

        if (activeImage) {
          gsap.set(activeImage, {
            opacity: 1,
          });
        }

        reveal();
        scheduleAutoplay();
      };

      initialize();

      container.addEventListener(
        "tanosi-gsap-go",
        handleNavigation,
      );

      window.addEventListener(
        "resize",
        handleResize,
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize,
        );

        container.removeEventListener(
          "tanosi-gsap-go",
          handleNavigation,
        );

        if (autoplayRef.current) {
          clearTimeout(autoplayRef.current);
        }

        gsap.killTweensOf(container);
      };
    },
    {
      scope: containerRef,
    },
  );

  /* =========================================================
     NEXT / PREVIOUS
  ========================================================= */

  const nextSlide = () => {
    if (animatingRef.current) return;

    const next =
      (activeRef.current + 1) %
      DATA.length;

    containerRef.current?.dispatchEvent(
      new CustomEvent("tanosi-gsap-go", {
        detail: {
          index: next,
          direction: 1,
        },
      }),
    );
  };

  const previousSlide = () => {
    if (animatingRef.current) return;

    const previous =
      (activeRef.current - 1 + DATA.length) %
      DATA.length;

    containerRef.current?.dispatchEvent(
      new CustomEvent("tanosi-gsap-go", {
        detail: {
          index: previous,
          direction: -1,
        },
      }),
    );
  };

  /* =========================================================
     MOBILE SWIPE
  ========================================================= */

  const handleTouchStart = (
    event: React.TouchEvent,
  ) => {
    if (event.touches.length !== 1) return;

    touchStartX.current =
      event.touches[0].clientX;

    touchStartY.current =
      event.touches[0].clientY;

    pausedRef.current = true;
  };

  const handleTouchEnd = (
    event: React.TouchEvent,
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const endX =
      event.changedTouches[0].clientX;

    const endY =
      event.changedTouches[0].clientY;

    const deltaX =
      endX - touchStartX.current;

    const deltaY =
      endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Only interpret reasonably horizontal
     * gestures as carousel navigation.
     */

    if (
      Math.abs(deltaX) < 45 ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      pausedRef.current = isPaused;
      return;
    }

    if (deltaX < 0) {
      nextSlide();
    } else {
      previousSlide();
    }

    /*
     * Allow autoplay to resume after
     * the interaction.
     */

    setTimeout(() => {
      if (!isPaused) {
        pausedRef.current = false;
      }
    }, 700);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-black text-white select-none"
      onMouseEnter={() => {
        pausedRef.current = true;
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        setIsPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 z-0 bg-black" />

      {/* =====================================================
          CINEMATIC OVERLAYS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.48)_38%,rgba(0,0,0,.08)_75%,rgba(0,0,0,.28)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(0deg,rgba(0,0,0,.82)_0%,transparent_38%,rgba(0,0,0,.18)_100%)]" />

      {/* =====================================================
          TECHNICAL LABEL
      ===================================================== */}

      <div className="pointer-events-none absolute left-5 top-12 z-50 hidden md:block lg:left-12">
        <div className="space-y-1 font-mono">
          <div className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            TANOSI / ARQUIVO
          </div>

          <div className="text-[8px] uppercase tracking-[0.22em] text-white/20">
            SISTEMA VISUAL 01
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN COPY
      ===================================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-[17%] z-40 px-5 sm:top-[20%] sm:px-8 md:left-12 md:right-auto md:top-[25%] md:px-0 lg:left-16">
        <div className="max-w-[650px]">
          <div className="hero-kicker mb-4 flex items-center gap-3 opacity-0">
            <span className="h-px w-8 bg-white/50" />

            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/60">
              {activeData.collection}
            </span>
          </div>

          <h1 className="hero-wordmark text-[17vw] font-black uppercase leading-[0.76] tracking-[-0.09em] sm:text-[15vw] md:text-[10vw] lg:text-[9vw]">
            <span className="block">
              {activeData.title}
            </span>

            <span className="block text-white/25">
              {activeData.title2}
            </span>
          </h1>

          <p className="hero-description mt-7 max-w-[440px] text-xs font-medium leading-relaxed text-white/55 sm:text-sm">
            {activeData.description}
          </p>
        </div>
      </div>

      {/* =====================================================
          IMAGE SLIDER
      ===================================================== */}

      <div
        id="tanosi-slider"
        className="absolute inset-0 z-10"
      >
        {DATA.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="absolute overflow-hidden bg-zinc-950"
            aria-hidden={index !== activeIndex}
          >
            {/* Actual image */}
            <div
              id={`image-${index}`}
              className="absolute -inset-[3%] bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            />

            {/* Dark treatment */}
            <div
              id={`overlay-${index}`}
              className="absolute inset-0 bg-black/35"
            />

            {/* Bottom cinematic gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

            {/* Archive number */}
            <div className="absolute right-3 top-3 z-10 font-mono text-[8px] tracking-[0.2em] text-white/50">
              {item.tag}
            </div>

            {/* Product type */}
            <div className="absolute bottom-3 left-3 z-10 font-mono text-[7px] uppercase tracking-[0.18em] text-white/45">
              {item.type}
            </div>
          </div>
        ))}

        {/* ===================================================
            ARCHIVE CAPTIONS
        =================================================== */}

        {DATA.map((item, index) => (
          <div
            key={item.id}
            id={`card-content-${index}`}
            className="pointer-events-none absolute z-40 w-[135px] text-white sm:w-[200px] md:w-[255px]"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="h-px w-4 bg-white/50" />

              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[8px]">
                {item.collection}
              </span>
            </div>

            <div className="text-[14px] font-black uppercase leading-none tracking-[-0.05em] sm:text-lg md:text-xl">
              {item.title}
            </div>

            <div className="text-[14px] font-black uppercase leading-none tracking-[-0.05em] text-white/35 sm:text-lg md:text-xl">
              {item.title2}
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          MOBILE INFO
      ===================================================== */}

      <div className="absolute bottom-[255px] left-5 right-5 z-50 block sm:bottom-[275px] md:hidden">
        <div className="flex items-end justify-between gap-5">
          <div>
            <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/40">
              Peça seleccionada
            </div>

            <div className="text-xl font-black uppercase leading-none tracking-[-0.06em]">
              {activeData.title}{" "}
              {activeData.title2}
            </div>

            <div className="mt-2 text-[8px] font-medium uppercase tracking-[0.2em] text-white/35">
              {activeData.type}
            </div>
          </div>

          <Link
            href="/collections/all"
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-90"
            aria-label="Explorar colecção"
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      {/* =====================================================
          DESKTOP CTA
      ===================================================== */}

      <Link
        href="/collections/all"
        className="pointer-events-auto absolute bottom-12 right-8 z-[60] hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] md:flex lg:right-16"
      >
        <span className="text-white/50 transition-colors hover:text-white">
          Explorar colecção
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-all hover:border-white hover:bg-white hover:text-black">
          <ArrowDownRight size={17} />
        </span>
      </Link>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div className="absolute bottom-7 left-5 z-[60] flex items-center gap-4 sm:left-8 md:bottom-12 md:left-auto md:right-[360px]">
        <button
          type="button"
          onClick={previousSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:text-white active:scale-90"
          aria-label="Peça anterior"
        >
          <ChevronLeft size={17} />
        </button>

        <div className="slide-counter min-w-[55px] text-center font-mono text-[9px] tracking-[0.25em] text-white/50">
          {String(activeIndex + 1).padStart(
            2,
            "0",
          )}

          <span className="mx-2 text-white/20">
            /
          </span>

          {String(DATA.length).padStart(
            2,
            "0",
          )}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:text-white active:scale-90"
          aria-label="Peça seguinte"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* =====================================================
          MOBILE SWIPE INDICATOR
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-[215px] left-5 z-50 flex items-center gap-2 md:hidden">
        <span className="h-px w-5 bg-white/30" />

        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">
          Deslize para explorar
        </span>
      </div>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-[60] h-px bg-white/10">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{
            width: `${
              ((activeIndex + 1) /
                DATA.length) *
              100
            }%`,
          }}
        />
      </div>

      {/* =====================================================
          INITIAL LOADER
      ===================================================== */}

      <div className="hero-cover pointer-events-none absolute inset-y-0 left-0 z-[100] w-full bg-black" />

      {/* =====================================================
          SCAN LINE
      ===================================================== */}

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[75] h-px animate-[scan_5s_linear_infinite] bg-white/10" />

      {/* =====================================================
          MOTION
      ===================================================== */}

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 767px) {
          #tanosi-slider {
            touch-action: pan-y;
          }
        }
      `}</style>
    </section>
  );
}