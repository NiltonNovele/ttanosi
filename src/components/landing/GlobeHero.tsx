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

const DATA = [
  {
    id: 0,
    collection: "LIMITLESS ARCHIVE",
    title: "TRIBAL",
    title2: "HOODIE",
    description:
      "Oversized 450gsm heavyweight cotton featuring a custom acid wash finish and dropped shoulders for an architectural drape. Built for the streets. Designed for the bold.",
    image: "/men.png",
    tag: "01",
  },
  {
    id: 1,
    collection: "NEW SILHOUETTES",
    title: "FIGURE",
    title2: "DENIM",
    description:
      "Wide-leg architectural denim with high-contrast materiality. A reimagining of street staples that rejects conventional proportions.",
    image: "/women.png",
    tag: "02",
  },
  {
    id: 2,
    collection: "HIGH-SPEED DROPS",
    title: "MOTOR",
    title2: "JACKET",
    description:
      "Vintage-inspired racing outerwear with custom embroidery, contrast piping and a boxy retro-futurist silhouette.",
    image: "/drwaing1.png",
    tag: "03",
  },
  {
    id: 3,
    collection: "CORE ESSENTIALS",
    title: "TECHNICAL",
    title2: "CARGO",
    description:
      "Technical nylon cargo construction with adjustable details, multiple pockets and a water-resistant finish.",
    image: "/drwaing1.png",
    tag: "04",
  },
  {
    id: 4,
    collection: "ANIME COLLAB",
    title: "CYBER",
    title2: "PULSE",
    description:
      "Heavy-distressed denim with signature hardware and custom detailing inspired by the digital underground.",
    image: "/men.png",
    tag: "05",
  },
  {
    id: 5,
    collection: "THE COLLECTIVE",
    title: "HYPER",
    title2: "TEAM",
    description:
      "Not just a brand. A collective of creators, outsiders and people pushing culture forward.",
    image: "/women.png",
    tag: "06",
  },
];

export function GlobeHero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeRef = React.useRef(0);
  const animatingRef = React.useRef(false);
  const pausedRef = React.useRef(false);
  const autoplayRef =
    React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

      const getLayout = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const mobile = width < 768;
        const tablet = width >= 768 && width < 1100;

        const cardWidth = mobile
          ? Math.min(width * 0.34, 145)
          : tablet
            ? 205
            : 255;

        const cardHeight = mobile ? 205 : tablet ? 300 : 370;

        const gap = mobile ? 10 : tablet ? 18 : 24;

        const visibleCards = mobile ? 3 : tablet ? 3 : 4;

        const totalWidth =
          cardWidth * visibleCards +
          gap * (visibleCards - 1);

        const left = mobile
          ? Math.max(18, (width - totalWidth) / 2)
          : Math.max(40, width - totalWidth - 70);

        const top = mobile
          ? height - cardHeight - 42
          : height - cardHeight - 70;

        return {
          width,
          height,
          mobile,
          cardWidth,
          cardHeight,
          gap,
          left,
          top,
        };
      };

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

      /*
       * Position all archive cards.
       */
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

          if (index === active) {
            gsap.set(card, {
              x: 0,
              y: 0,
              width,
              height,
              borderRadius: 0,
              zIndex: 20,
              scale: 1,
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
          } else {
            const distance =
              index > active
                ? index - active - 1
                : DATA.length + index - active - 1;

            const visiblePosition = Math.min(
              distance,
              3,
            );

            const x =
              left +
              visiblePosition * (cardWidth + gap);

            gsap.set(card, {
              x,
              y: top,
              width: cardWidth,
              height: cardHeight,
              borderRadius: mobile ? 6 : 8,
              zIndex: 30,
              scale: 1,
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
          }
        });
      };

      /*
       * Preload every image before the hero starts.
       */
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

      /*
       * Initial reveal.
       *
       * This cover is ONLY used during initial loading.
       * It never participates in slide transitions.
       */
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

      /*
       * Main slide transition.
       *
       * The incoming image is placed outside the viewport
       * and slides directly over the current image.
       *
       * The black background is therefore NEVER exposed.
       */
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

        /*
         * Incoming card.
         *
         * It sits ABOVE the current card.
         */
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
        });

        /*
         * Prepare incoming image.
         */
        const newImage = getImage(nextIndex);

        if (newImage) {
          gsap.set(newImage, {
            scale: 1.08,
          });
        }

        /*
         * Prepare incoming overlay.
         */
        const newOverlay =
          getOverlay(nextIndex);

        if (newOverlay) {
          gsap.set(newOverlay, {
            opacity: 0.3,
          });
        }

        /*
         * Animate current text away.
         */
        if (oldContent) {
          gsap.to(oldContent, {
            opacity: 0,
            y: 25,
            duration: reducedMotion ? 0 : 0.3,
            ease: "power2.in",
          });
        }

        const tl = gsap.timeline({
          onComplete: () => {
            /*
             * Move old image into archive.
             */
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

            /*
             * New slide becomes active.
             */
            gsap.set(newCard, {
              x: 0,
              y: 0,
              width,
              height,
              borderRadius: 0,
              zIndex: 20,
            });

            /*
             * Reposition archive cards.
             */
            DATA.forEach((_, index) => {
              if (
                index === nextIndex ||
                index === oldIndex
              ) {
                return;
              }

              const distance =
                index > nextIndex
                  ? index - nextIndex - 1
                  : DATA.length +
                    index -
                    nextIndex -
                    1;

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
                  opacity: 1,
                  zIndex: 40,
                });
              }
            });

            animatingRef.current = false;

            scheduleAutoplay();
          },
        });

        /*
         * IMAGE TRANSITION
         */
        tl.to(
          newCard,
          {
            x: 0,
            duration: reducedMotion
              ? 0
              : 1.25,
            ease: "expo.inOut",
          },
          0,
        );

        /*
         * Incoming image zoom.
         */
        if (newImage) {
          tl.to(
            newImage,
            {
              scale: 1,
              duration: reducedMotion
                ? 0
                : 1.5,
              ease: "power2.out",
            },
            0,
          );
        }

        /*
         * Incoming overlay.
         */
        if (newOverlay) {
          tl.to(
            newOverlay,
            {
              opacity: 0.38,
              duration: reducedMotion
                ? 0
                : 0.9,
              ease: "power2.out",
            },
            0.15,
          );
        }

        /*
         * Move archive cards.
         */
        DATA.forEach((_, index) => {
          if (
            index === nextIndex ||
            index === oldIndex
          ) {
            return;
          }

          const distance =
            index > nextIndex
              ? index - nextIndex - 1
              : DATA.length +
                index -
                nextIndex -
                1;

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
                opacity: 1,
                duration: reducedMotion
                  ? 0
                  : 0.85,
                ease: "expo.inOut",
              },
              0.1,
            );
          }
        });

        /*
         * Incoming hero copy.
         */
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

        /*
         * Counter animation.
         */
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

      /*
       * Autoplay.
       */
      const scheduleAutoplay = () => {
        if (autoplayRef.current) {
          clearTimeout(
            autoplayRef.current,
          );
        }

        if (pausedRef.current) return;

        autoplayRef.current =
          setTimeout(() => {
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

      /*
       * Resize.
       */
      const handleResize = () => {
        if (animatingRef.current) return;

        positionCards();
      };

      /*
       * Navigation event listener.
       */
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
          nextIndex ===
            activeRef.current ||
          animatingRef.current
        ) {
          return;
        }

        goTo(nextIndex, direction);
      };

      /*
       * INITIALIZATION
       */
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
        "ttanosi-gsap-go",
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
          "ttanosi-gsap-go",
          handleNavigation,
        );

        if (autoplayRef.current) {
          clearTimeout(
            autoplayRef.current,
          );
        }

        gsap.killTweensOf(container);
      };
    },
    {
      scope: containerRef,
    },
  );

  const nextSlide = () => {
    if (animatingRef.current) return;

    const next =
      (activeRef.current + 1) %
      DATA.length;

    containerRef.current?.dispatchEvent(
      new CustomEvent(
        "ttanosi-gsap-go",
        {
          detail: {
            index: next,
            direction: 1,
          },
        },
      ),
    );
  };

  const previousSlide = () => {
    if (animatingRef.current) return;

    const previous =
      (activeRef.current - 1 + DATA.length) %
      DATA.length;

    containerRef.current?.dispatchEvent(
      new CustomEvent(
        "ttanosi-gsap-go",
        {
          detail: {
            index: previous,
            direction: -1,
          },
        },
      ),
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-black text-white"
      onMouseEnter={() => {
        pausedRef.current = true;
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        setIsPaused(false);
      }}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="absolute inset-0 z-0 bg-black" />

      {/* Main cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.48)_38%,rgba(0,0,0,.08)_75%,rgba(0,0,0,.28)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(0deg,rgba(0,0,0,.82)_0%,transparent_38%,rgba(0,0,0,.18)_100%)]" />

      {/* =========================================================
          TECHNICAL LABEL
      ========================================================== */}

      <div className="pointer-events-none absolute left-5 top-12 z-50 hidden md:block lg:left-12">
        <div className="space-y-1 font-mono">
          <div className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            TTN / ARCHIVE
          </div>

          <div className="text-[8px] uppercase tracking-[0.22em] text-white/20">
            VISUAL SYSTEM 01
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN COPY
      ========================================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-40 px-5 sm:top-[21%] sm:px-8 md:left-12 md:right-auto md:top-[25%] md:px-0 lg:left-16">
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

      {/* =========================================================
          IMAGE SLIDER
      ========================================================== */}

      <div
        id="ttanosi-slider"
        className="absolute inset-0 z-10"
      >
        {DATA.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="absolute overflow-hidden bg-zinc-950"
          >
            {/* Actual image layer */}
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
          </div>
        ))}

        {/* =======================================================
            ARCHIVE CARD CAPTIONS
        ======================================================== */}

        {DATA.map((item, index) => (
          <div
            key={item.id}
            id={`card-content-${index}`}
            className="pointer-events-none absolute z-40 w-[145px] text-white sm:w-[200px] md:w-[255px]"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="h-px w-4 bg-white/50" />

              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[8px]">
                {item.collection}
              </span>
            </div>

            <div className="text-[15px] font-black uppercase leading-none tracking-[-0.05em] sm:text-lg md:text-xl">
              {item.title}
            </div>

            <div className="text-[15px] font-black uppercase leading-none tracking-[-0.05em] text-white/35 sm:text-lg md:text-xl">
              {item.title2}
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
          MOBILE INFO
      ========================================================== */}

      <div className="absolute bottom-[270px] left-5 right-5 z-50 block sm:bottom-[285px] md:hidden">
        <div className="flex items-end justify-between gap-5">
          <div>
            <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/40">
              Selected piece
            </div>

            <div className="text-xl font-black uppercase tracking-[-0.06em]">
              {activeData.title}{" "}
              {activeData.title2}
            </div>
          </div>

          <Link
            href="/collections/all"
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-90"
            aria-label="Shop collection"
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      {/* =========================================================
          DESKTOP CTA
      ========================================================== */}

      <Link
        href="/collections/all"
        className="pointer-events-auto absolute bottom-12 right-8 z-[60] hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] md:flex lg:right-16"
      >
        <span className="text-white/50 transition-colors hover:text-white">
          Explore collection
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-all hover:border-white hover:bg-white hover:text-black">
          <ArrowDownRight size={17} />
        </span>
      </Link>

      {/* =========================================================
          CONTROLS
      ========================================================== */}

      <div className="absolute bottom-7 left-5 z-[60] flex items-center gap-4 sm:left-8 md:bottom-12 md:left-auto md:right-[360px]">
        <button
          type="button"
          onClick={previousSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:text-white disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous slide"
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:text-white disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next slide"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* =========================================================
          PROGRESS
      ========================================================== */}

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

      {/* =========================================================
          INITIAL LOADER
      ========================================================== */}

      <div className="hero-cover pointer-events-none absolute inset-y-0 left-0 z-[100] w-full bg-black" />

      {/* =========================================================
          SCAN LINE
      ========================================================== */}

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[75] h-px animate-[scan_5s_linear_infinite] bg-white/10" />

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
      `}</style>
    </section>
  );
}