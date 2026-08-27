"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "T-Shirts",
    tagline: "O Arquivo",
    href: "/collections/tshirts",
    image:
      "https://i.pinimg.com/736x/c4/98/0f/c4980f2fa30eafa51b9fe04adea01d58.jpg",
    color: "from-blue-500/80",
    number: "01",
  },
  {
    name: "Gorros",
    tagline: "Nova Colecção",
    href: "/collections/gorros",
    image:
      "https://i.pinimg.com/736x/f6/f4/9f/f6f49f093242d166b56c00e3d0b78932.jpg",
    color: "from-pink-500/80",
    number: "02",
  },
  {
    name: "Fitted",
    tagline: "Headwear",
    href: "/collections/fitted",
    image:
      "https://i.pinimg.com/736x/17/0b/3c/170b3c0d9d6ec71db1404ee694ec58fb.jpg",
    color: "from-yellow-500/80",
    number: "03",
  },
  {
    name: "Destaques",
    tagline: "Mais Procurados",
    href: "/collections/destaques",
    image:
      "https://i.pinimg.com/736x/6f/42/73/6f42733cc652defd36546fdbf409f702.jpg",
    color: "from-purple-500/80",
    number: "04",
  },
];

export function CategoryCircles() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    null,
  );

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-zinc-950 py-16 md:py-20">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-indigo-500/[0.04] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-500/[0.035] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            {/* Eyebrow */}

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-white/40" />

              <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/30">
                Explorar / Colecções
              </span>
            </div>

            {/* Heading */}

            <h2 className="flex flex-wrap items-end gap-x-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-white">
                Explora
              </span>

              <span className="mb-1 font-serif text-2xl font-light lowercase italic tracking-normal text-zinc-500 sm:text-3xl md:text-4xl">
                o
              </span>

              <span className="relative">
                Movimento

                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-indigo-500 md:h-3"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 10 Q 50 20 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500 md:mt-5 md:text-base">
              Descobre as peças que definem a Tanosi.
              T-shirts, gorros e bonés fitted criados para
              quem prefere destacar-se em vez de seguir
              tendências.
            </p>
          </div>

          {/* =================================================
              DESKTOP CTA
          ================================================= */}

          <Link
            href="/collections"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-200 active:scale-95 md:flex"
          >
            Ver colecção

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* =====================================================
            CATEGORY PANELS
        ===================================================== */}

        <div
          className="
            flex
            h-[540px]
            w-full
            flex-col
            gap-2
            sm:h-[600px]
            md:h-[460px]
            md:flex-row
            md:gap-3
          "
        >
          {categories.map((category, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered =
              hoveredIndex !== null;

            const notHovered =
              isAnyHovered && !isHovered;

            return (
              <motion.div
                key={category.name}
                className="
                  group
                  relative
                  min-h-0
                  cursor-pointer
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-zinc-900
                  shadow-2xl
                  md:rounded-[1.5rem]
                "
                onMouseEnter={() => {
                  if (!isTouchDevice) {
                    setHoveredIndex(idx);
                  }
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice) {
                    setHoveredIndex(null);
                  }
                }}
                onTouchStart={() => {
                  setHoveredIndex((current) =>
                    current === idx ? null : idx,
                  );
                }}
                animate={{
                  flex: isHovered
                    ? 4
                    : isAnyHovered
                      ? 0.75
                      : 1,

                  opacity: notHovered ? 0.42 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                <Link
                  href={category.href}
                  className="relative block h-full w-full"
                  aria-label={`Explorar ${category.name}`}
                >
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <motion.img
                    src={category.image}
                    alt={`Colecção Tanosi — ${category.name}`}
                    loading={
                      idx === 0
                        ? "eager"
                        : "lazy"
                    }
                    draggable={false}
                    className="absolute inset-0 h-[120%] w-full origin-center object-cover"
                    animate={{
                      y: isHovered
                        ? "0%"
                        : "-8%",

                      scale: isHovered
                        ? 1.04
                        : 1.18,

                      filter: isHovered
                        ? "grayscale(0%) brightness(0.82)"
                        : "grayscale(75%) brightness(0.4)",
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                  />

                  {/* =================================================
                      COLOUR OVERLAY
                  ================================================= */}

                  <motion.div
                    className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-t ${category.color} to-transparent mix-blend-overlay`}
                    animate={{
                      opacity: isHovered
                        ? 0.7
                        : 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* Dark gradient */}

                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-black/10" />

                  {/* =================================================
                      TOP META
                  ================================================= */}

                  <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

                    <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/40">
                      TANOSI
                    </span>
                  </div>

                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <motion.div
                    className="absolute right-4 top-4 z-20"
                    animate={{
                      opacity: isHovered
                        ? 1
                        : 0.55,

                      scale: isHovered
                        ? 1
                        : 0.85,

                      rotate: isHovered
                        ? 0
                        : -8,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[9px] font-black text-white backdrop-blur-xl md:h-11 md:w-11 md:text-xs">
                      {category.number}
                    </div>
                  </motion.div>

                  {/* =================================================
                      BACKGROUND MARQUEE
                  ================================================= */}

                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center overflow-hidden opacity-[0.035]">
                    <motion.div
                      className="whitespace-nowrap text-[7rem] font-black uppercase leading-none tracking-[-0.08em] text-white md:text-[14rem]"
                      animate={{
                        x: isHovered
                          ? ["0%", "-45%"]
                          : "0%",
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                      }}
                    >
                      {category.name} •{" "}
                      {category.name} •{" "}
                      {category.name}
                    </motion.div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="absolute inset-x-0 bottom-0 z-30 p-5 md:p-6">
                    <motion.div
                      animate={{
                        y: isHovered
                          ? 0
                          : 8,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      {/* Tagline */}

                      <motion.div
                        className="mb-2 flex items-center gap-2"
                        animate={{
                          opacity: isHovered
                            ? 1
                            : 0.75,

                          x: isHovered
                            ? 0
                            : -6,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <Sparkles
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                          {category.tagline}
                        </span>
                      </motion.div>

                      {/* Title */}

                      <h3
                        className="truncate text-4xl font-black uppercase leading-none tracking-[-0.06em] transition-all duration-500 sm:text-5xl md:text-5xl lg:text-6xl"
                        style={{
                          WebkitTextStroke:
                            isHovered
                              ? "0px transparent"
                              : "1px rgba(255,255,255,0.65)",

                          color: isHovered
                            ? "#ffffff"
                            : "transparent",

                          textShadow: isHovered
                            ? "0 8px 30px rgba(0,0,0,0.7)"
                            : "none",
                        }}
                      >
                        {category.name}
                      </h3>

                      {/* Description / micro label */}

                      <motion.div
                        className="mt-3 flex items-center gap-2"
                        animate={{
                          opacity: isHovered
                            ? 1
                            : 0,
                          y: isHovered
                            ? 0
                            : 5,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <span className="h-px w-5 bg-white/40" />

                        <span className="text-[7px] font-medium uppercase tracking-[0.22em] text-white/50">
                          Descobrir peças
                        </span>
                      </motion.div>

                      {/* Shop button */}

                      <motion.div
                        animate={{
                          opacity: isHovered
                            ? 1
                            : 0,

                          height: isHovered
                            ? "auto"
                            : 0,

                          marginTop: isHovered
                            ? 14
                            : 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="inline-flex items-center rounded-full bg-white px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.18em] text-black shadow-xl transition-transform duration-300 hover:scale-105">
                          Ver peças

                          <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            MOBILE CTA
        ===================================================== */}

        <div className="mt-7 flex flex-col items-center gap-3 md:hidden">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-xl transition-all duration-300 active:scale-95"
          >
            Ver todas as peças

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
            T-Shirts · Gorros · Fitted
          </span>
        </div>
      </div>
    </section>
  );
}