"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    id: "tshirts",
    title: "T-Shirts",
    subtitle: "ESSENTIALS",
    description:
      "T-shirts premium com cortes contemporâneos, materiais cuidadosamente seleccionados e uma identidade visual criada para quem prefere marcar presença.",
    images: [
      "/women.png",
      "/design/5.jpeg",
      "/design/6.jpeg",
    ],
    href: "/collections/tshirts",
    stats: "MOÇAMBIQUE",
    tag: "ESSENTIALS // 01",
    batch: "B-774-T-CORE",
  },
  {
    id: "accessories",
    title: "Acessórios",
    subtitle: "DETAILS",
    description:
      "Acessórios seleccionados para completar a composição. Peças de destaque, detalhes funcionais e elementos essenciais para elevar qualquer visual.",
    images: [
      "/product/cap1.png",
      "/product/14.png",
      "/product/21.png",
    ],
    href: "/collections/accessories",
    stats: "MAPUTO",
    tag: "ACCESSORIES // 02",
    batch: "B-912-A-CORE",
  },
];

const features = [
  {
    icon: Zap,
    label: "Eco-Sync",
    detail: "Tecidos sustentáveis",
    id: "V.1.0",
  },
  {
    icon: ShieldCheck,
    label: "Hyper-Grade",
    detail: "Acabamento premium",
    id: "V.2.1",
  },
  {
    icon: Globe,
    label: "Express Drop",
    detail: "Envios internacionais",
    id: "V.3.4",
  },
  {
    icon: Sparkles,
    label: "Edições Limitadas",
    detail: "Peças especiais",
    id: "V.4.2",
  },
];

const SLIDE_DURATION = 4500;

export function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      aria-labelledby="archive-heading"
      className="
        relative
        flex
        min-h-screen
        flex-col
        justify-center
        overflow-hidden
        bg-background
        px-4
        py-16
        sm:px-6
        sm:py-20
        md:px-10
        md:py-24
        lg:px-12
        lg:py-28
      "
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[18%]
          h-64
          w-64
          rounded-full
          bg-primary/[0.035]
          blur-[100px]
          sm:h-96
          sm:w-96
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-10%]
          right-[-12%]
          h-72
          w-72
          rounded-full
          bg-primary/[0.025]
          blur-[110px]
          sm:h-[28rem]
          sm:w-[28rem]
        "
      />

      {/* Technical grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:60px_60px]
          sm:[background-size:80px_80px]
        "
      />

      {/* =========================================================
          LARGE WATERMARK
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-[24%]
          flex
          select-none
          justify-center
          overflow-hidden
          opacity-[0.018]
        "
      >
        <span
          className="
            whitespace-nowrap
            font-display
            text-[5.5rem]
            font-bold
            leading-none
            tracking-[-0.08em]
            text-outline
            sm:text-[9rem]
            md:text-[13rem]
            lg:text-[16rem]
          "
        >
          2026 // ARQUIVO
        </span>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
        "
      >
        {/* =======================================================
            HEADER
        ======================================================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-7
            sm:mb-10
            md:mb-12
            md:flex-row
            md:items-end
            md:justify-between
            md:gap-10
          "
        >
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Eyebrow */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-primary
                  shadow-[0_0_12px_rgba(196,240,0,0.5)]
                  sm:w-8
                "
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.38em]
                  text-primary
                  sm:text-[9px]
                  sm:tracking-[0.5em]
                "
              >
                S/N 774-32 // ARQUIVO_V3
              </span>
            </div>

            {/* Heading */}

            <h2
              id="archive-heading"
              className="
                font-display
                text-[3rem]
                font-bold
                uppercase
                leading-[0.82]
                tracking-[-0.07em]
                sm:text-6xl
                md:text-7xl
                lg:text-[5.5rem]
              "
            >
              O{" "}
              <span className="italic text-primary">
                Arquivo
              </span>
            </h2>
          </motion.div>

          {/* Header description */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-md md:max-w-sm"
          >
            <div className="mb-3 flex items-center gap-2 text-primary/40">
              <span className="font-mono text-[8px] tracking-[0.25em]">
                SISTEMA // CURADO
              </span>

              <span className="h-px w-8 bg-primary/20" />
            </div>

            <p
              className="
                text-[11px]
                font-medium
                uppercase
                leading-[1.8]
                tracking-[0.13em]
                text-muted-foreground
                sm:text-xs
                md:text-sm
              "
            >
              Descobre a nossa selecção de peças e
              acessórios premium, concebidos para
              quem não se veste para passar despercebido.
            </p>
          </motion.div>
        </div>

        {/* =======================================================
            COLLECTION GRID
        ======================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            md:grid-cols-2
            md:gap-8
            lg:gap-10
          "
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <CollectionCard
                category={category}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* =======================================================
            TECHNICAL FEATURE BAR
        ======================================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-2
            gap-x-5
            gap-y-7
            border-t
            border-white/[0.06]
            pt-7
            sm:mt-12
            sm:gap-6
            sm:pt-8
            md:grid-cols-4
            md:gap-8
            lg:mt-14
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  delay: 0.35 + index * 0.08,
                  duration: 0.7,
                }}
                className="group/feature flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.07]
                      bg-white/[0.015]
                      transition-all
                      duration-500
                      group-hover/feature:border-primary/40
                      group-hover/feature:bg-primary/[0.04]
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <Icon
                      className="
                        h-4
                        w-4
                        text-primary
                        transition-transform
                        duration-500
                        group-hover/feature:scale-110
                        sm:h-5
                        sm:w-5
                      "
                      strokeWidth={1.5}
                    />
                  </div>

                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.18em]
                      text-white/10
                      sm:text-[8px]
                    "
                  >
                    {item.id}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span
                    className="
                      font-display
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white/80
                      sm:text-[10px]
                    "
                  >
                    {item.label}
                  </span>

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.08em]
                      text-muted-foreground/60
                      sm:text-[9px]
                    "
                  >
                    {item.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom system line */}

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.04] pt-4 sm:mt-10">
          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/15">
            TANOSI / EST. 2026
          </span>

          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/15">
            MAPUTO // MOÇAMBIQUE
          </span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   COLLECTION CARD
============================================================= */

function CollectionCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalImages = category.images.length;

  /* =========================================================
      AUTOMATIC SLIDESHOW
  ========================================================== */

  useEffect(() => {
    if (totalImages <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentImage((previous) =>
        previous === totalImages - 1
          ? 0
          : previous + 1
      );
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [totalImages, isPaused]);

  /* =========================================================
      MANUAL NAVIGATION
  ========================================================== */

  const previousImage = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage((previous) =>
      previous === 0
        ? totalImages - 1
        : previous - 1
    );
  };

  const nextImage = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage((previous) =>
      previous === totalImages - 1
        ? 0
        : previous + 1
    );
  };

  return (
    <motion.div
      className="relative h-full w-full"
      whileHover={{ y: -3 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={category.href}
        className="
          group/card
          relative
          block
          h-full
          overflow-hidden
          rounded-[1.35rem]
          outline-none
          sm:rounded-[1.75rem]
          md:rounded-[2rem]
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-4
          focus-visible:ring-offset-background
        "
        aria-label={`Explorar ${category.title}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* =======================================================
            IMAGE CONTAINER
        ======================================================== */}

        <div
          className="
            relative
            aspect-[0.82]
            overflow-hidden
            border
            border-white/[0.09]
            bg-zinc-900
            transition-colors
            duration-700
            group-hover/card:border-primary/40
            sm:aspect-[0.88]
            md:aspect-[0.91]
            lg:aspect-[0.94]
          "
        >
          {/* =====================================================
              SLIDESHOW
          ====================================================== */}

          <AnimatePresence mode="sync">
            <motion.img
              key={`${category.id}-${currentImage}`}
              src={category.images[currentImage]}
              alt=""
              loading={
                index === 0 && currentImage === 0
                  ? "eager"
                  : "lazy"
              }
              initial={{
                opacity: 0,
                scale: 1.04,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.02,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover/card:scale-[1.07]
              "
            />
          </AnimatePresence>

          {/* Cinematic gradient */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              z-10
              bg-gradient-to-t
              from-black
              via-black/35
              to-black/5
              opacity-95
              transition-opacity
              duration-700
              group-hover/card:opacity-85
            "
          />

          {/* Colour wash */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              z-10
              bg-primary/[0.025]
              opacity-0
              mix-blend-screen
              transition-opacity
              duration-700
              group-hover/card:opacity-100
            "
          />

          {/* Scanline texture */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              opacity-[0.035]
              transition-opacity
              duration-700
              group-hover/card:opacity-[0.10]
            "
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 3px, rgba(196, 240, 0, 0.28) 4px)",
            }}
          />

          {/* Top shine */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-20
              h-32
              bg-gradient-to-b
              from-white/[0.07]
              to-transparent
              opacity-70
            "
          />

          {/* =====================================================
              SLIDESHOW CONTROLS
          ====================================================== */}

          {totalImages > 1 && (
            <>
              {/* Progress indicators */}

              <div
                className="
                  absolute
                  left-4
                  right-4
                  top-16
                  z-30
                  flex
                  gap-1
                  sm:left-6
                  sm:right-6
                  sm:top-[4.75rem]
                  md:left-8
                  md:right-8
                  md:top-[5.25rem]
                "
              >
                {category.images.map((_, imageIndex) => (
                  <span
                    key={imageIndex}
                    className="
                      relative
                      h-[2px]
                      flex-1
                      overflow-hidden
                      rounded-full
                      bg-white/20
                    "
                  >
                    <span
                      className={`
                        absolute
                        inset-y-0
                        left-0
                        rounded-full
                        bg-primary
                        transition-all
                        duration-500
                        ${
                          imageIndex === currentImage
                            ? "w-full"
                            : imageIndex < currentImage
                              ? "w-full opacity-60"
                              : "w-0"
                        }
                      `}
                    />
                  </span>
                ))}
              </div>

              {/* Desktop navigation */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-40
                  hidden
                  gap-2
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover/card:opacity-100
                  sm:flex
                  md:bottom-7
                  md:left-7
                "
              >
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label={`Imagem anterior de ${category.title}`}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/30
                    text-white
                    backdrop-blur-xl
                    transition-all
                    hover:border-primary
                    hover:bg-primary
                    hover:text-background
                  "
                >
                  <ChevronLeft
                    className="h-4 w-4"
                    strokeWidth={1.7}
                  />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label={`Próxima imagem de ${category.title}`}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/30
                    text-white
                    backdrop-blur-xl
                    transition-all
                    hover:border-primary
                    hover:bg-primary
                    hover:text-background
                  "
                >
                  <ChevronRight
                    className="h-4 w-4"
                    strokeWidth={1.7}
                  />
                </button>
              </div>
            </>
          )}

          {/* =====================================================
              TOP METADATA
          ====================================================== */}

          <div
            className="
              absolute
              left-4
              right-4
              top-4
              z-30
              flex
              items-center
              justify-between
              gap-2
              sm:left-6
              sm:right-6
              sm:top-6
              md:left-8
              md:right-8
              md:top-8
            "
          >
            {/* Location */}

            <div
              className="
                rounded-full
                border
                border-white/[0.12]
                bg-black/20
                px-3
                py-1.5
                shadow-2xl
                backdrop-blur-xl
                sm:px-4
                sm:py-2
              "
            >
              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/75
                  sm:text-[8px]
                  md:text-[9px]
                "
              >
                {category.stats}
              </span>
            </div>

            {/* Category number */}

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.12]
                bg-black/20
                font-mono
                text-[8px]
                text-white/50
                backdrop-blur-xl
                sm:h-9
                sm:w-9
              "
            >
              0{index + 1}
            </div>
          </div>

          {/* =====================================================
              CATEGORY TAG
          ====================================================== */}

          <div
            className="
              absolute
              left-4
              top-[6.75rem]
              z-30
              sm:left-6
              sm:top-[7.25rem]
              md:left-8
              md:top-[7.75rem]
            "
          >
            <div
              className="
                rounded-md
                border
                border-primary/20
                bg-primary/[0.08]
                px-2.5
                py-1.5
                backdrop-blur-xl
                sm:px-3
                sm:py-2
              "
            >
              <span
                className="
                  font-mono
                  text-[7px]
                  tracking-[0.1em]
                  text-primary
                  sm:text-[8px]
                "
              >
                {category.tag}
              </span>
            </div>
          </div>

          {/* =====================================================
              ARCHIVE CODE
          ====================================================== */}

          <div
            className="
              absolute
              bottom-5
              right-5
              z-30
              text-right
              opacity-50
              transition-opacity
              duration-500
              group-hover/card:opacity-100
              sm:bottom-7
              sm:right-7
              md:bottom-9
              md:right-9
            "
          >
            <span
              className="
                mb-1
                block
                font-mono
                text-[6px]
                uppercase
                tracking-[0.15em]
                text-white/35
                sm:text-[7px]
              "
            >
              ARQUIVO_SYS:
            </span>

            <span
              className="
                rounded
                bg-primary/[0.08]
                px-1.5
                py-1
                font-mono
                text-[8px]
                font-bold
                tracking-[-0.02em]
                text-primary
                sm:text-[9px]
              "
            >
              {category.batch}
            </span>
          </div>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-30
              p-5
              sm:p-7
              md:p-9
              lg:p-10
            "
          >
            {/* Subtitle */}

            <motion.div
              className="mb-3 overflow-hidden sm:mb-4"
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
                duration: 0.6,
              }}
            >
              <span
                className="
                  inline-block
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.38em]
                  text-primary
                  transition-transform
                  duration-700
                  group-hover/card:translate-x-1
                  sm:text-[9px]
                  sm:tracking-[0.5em]
                "
              >
                {category.subtitle}
              </span>
            </motion.div>

            {/* Title */}

            <h3
              className="
                font-display
                text-[2.5rem]
                font-bold
                uppercase
                leading-[0.82]
                tracking-[-0.065em]
                text-white
                sm:text-5xl
                md:text-[3.5rem]
                lg:text-[4rem]
              "
            >
              {category.id === "tshirts" ? (
                <>
                  T-
                  <br />
                  <span
                    className="
                      text-white/30
                      transition-colors
                      duration-700
                      group-hover/card:text-primary
                    "
                  >
                    Shirts
                  </span>
                </>
              ) : (
                <>
                  Acessó-
                  <br />
                  <span
                    className="
                      text-white/30
                      transition-colors
                      duration-700
                      group-hover/card:text-primary
                    "
                  >
                    rios
                  </span>
                </>
              )}
            </h3>

            {/* Description */}

            <p
              className="
                mt-4
                max-w-[34rem]
                text-[10px]
                font-medium
                leading-[1.75]
                text-white/55
                sm:mt-5
                sm:text-xs
                md:mt-6
                md:max-w-[360px]
                md:text-sm
                lg:opacity-0
                lg:translate-y-4
                lg:transition-all
                lg:duration-700
                lg:group-hover/card:translate-y-0
                lg:group-hover/card:opacity-100
              "
            >
              {category.description}
            </p>

            {/* CTA */}

            <div className="mt-5 flex items-center gap-4 sm:mt-7 sm:gap-5 md:mt-8">
              <div className="relative overflow-hidden">
                <span
                  className="
                    inline-block
                    py-1.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-white
                    sm:text-[9px]
                    sm:tracking-[0.42em]
                  "
                >
                  Explorar
                </span>

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-100
                    bg-primary
                    transition-transform
                    duration-700
                    lg:scale-x-0
                    lg:group-hover/card:scale-x-100
                  "
                />
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.15]
                  bg-black/10
                  transition-all
                  duration-500
                  group-hover/card:border-primary
                  group-hover/card:bg-primary
                  sm:h-11
                  sm:w-11
                  md:h-12
                  md:w-12
                "
              >
                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-white
                    transition-all
                    duration-500
                    group-hover/card:text-background
                    group-hover/card:rotate-45
                    sm:h-5
                    sm:w-5
                  "
                  strokeWidth={1.7}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}