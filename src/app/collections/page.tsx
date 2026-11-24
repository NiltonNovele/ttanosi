
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/footer";

const collections = [
  {
    title: "Homem",
    label: "01 / Coleção",
    description:
      "Peças essenciais criadas para acompanhar o movimento.",
    href: "/collections/mens",
    image: "/design/3.jpeg",
    imagePosition: "center",
  },
  {
    title: "Mulher",
    label: "02 / Coleção",
    description:
      "Criado para quem escolhe mover-se de forma diferente.",
    href: "/collections/womens",
    image: "/women.png",
    imagePosition: "center",
  },
  {
    title: "Tendências",
    label: "03 / Coleção",
    description:
      "O que o movimento está a usar agora.",
    href: "/collections/trending",
    image: "/logo2.png",
    imagePosition: "center",
  },
  {
    title: "Acessórios",
    label: "04 / Coleção",
    description:
      "Os detalhes que completam cada visual.",
    href: "/collections/accessories",
    image: "/product/cap1.png",
    imagePosition: "center",
  },
  {
    title: "Visuais",
    label: "05 / Coleção",
    description:
      "Conjuntos completos. Sem complicações.",
    href: "/collections/looks",
    image: "/design/2.jpeg",
    imagePosition: "center",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function CollectionsPage() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.65,
      ease,
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      {/* ============================================================
          PAGE INTRO
      ============================================================ */}

      <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Eyebrow */}

          <motion.div
            initial={reveal.initial}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-7 bg-black" />

            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
              TANOSI / COLEÇÕES
            </span>
          </motion.div>

          {/* Main heading */}

          <div className="mt-7 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.7,
                ease,
              }}
              className="max-w-4xl text-[clamp(3.6rem,9vw,8rem)] font-black uppercase leading-[0.8] tracking-[-0.085em]"
            >
              Escolhe
              <br />
              o teu mundo<span className="text-zinc-300">.</span>
            </motion.h1>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.65,
                ease,
              }}
              className="max-w-[270px] pb-1 md:pb-2"
            >
              <p className="text-xs leading-6 text-zinc-500 sm:text-sm">
                Descobre as coleções TANOSI. Peças, acessórios e visuais
                que representam a tua forma de estar.
              </p>
            </motion.div>
          </div>

          {/* Divider and metadata */}

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.25,
              duration: 0.8,
              ease,
            }}
            className="mt-10 h-px origin-left bg-zinc-200 sm:mt-14"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[9px]">
              Explora as coleções
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[9px]">
              05 / Categorias
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          COLLECTION GRID
      ============================================================ */}

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:gap-x-7 lg:gap-y-14">
          {collections.map((collection, index) => {
            const isWide = index === 4;

            return (
              <motion.article
                key={collection.title}
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                }}
                className={isWide ? "sm:col-span-2" : ""}
              >
                <Link
                  href={collection.href}
                  aria-label={`Explorar coleção ${collection.title}`}
                  className="group block outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  {/* Image */}

                  <div
                    className={`relative isolate overflow-hidden bg-zinc-100 ${
                      isWide
                        ? "aspect-[4/3] sm:aspect-[16/7] lg:aspect-[16/6]"
                        : "aspect-[4/5]"
                    }`}
                  >
                    <motion.img
                      src={collection.image}
                      alt={`Coleção TANOSI ${collection.title}`}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      style={{
                        objectPosition: collection.imagePosition,
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />

                    {/* Subtle image treatment */}

                    <div className="pointer-events-none absolute inset-0 bg-black/[0.025] transition-colors duration-500 group-hover:bg-black/[0.08]" />

                    {/* Top metadata */}

                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
                      <span className="bg-white/95 px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-black backdrop-blur-sm sm:text-[9px]">
                        {collection.label}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center border border-white/70 bg-white/90 text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white sm:h-11 sm:w-11">
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.6}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    {/* Bottom image gradient */}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Collection information */}

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-200 py-4 sm:py-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-[clamp(1.8rem,4vw,3.3rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] transition-colors duration-300 group-hover:text-zinc-500">
                          {collection.title}
                        </h2>
                      </div>

                      <p className="mt-2 max-w-md text-[11px] leading-5 text-zinc-500 sm:text-xs">
                        {collection.description}
                      </p>
                    </div>

                    <div className="mt-1 flex shrink-0 items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black sm:text-[9px]">
                      <span className="hidden sm:inline">Explorar</span>

                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          BRAND MARQUEE
      ============================================================ */}

      <section className="overflow-hidden border-y border-zinc-200 py-5 sm:py-6">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ["0%", "-50%"] }
          }
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-7 whitespace-nowrap sm:gap-10"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <React.Fragment key={index}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black sm:text-sm">
                TANOSI
              </span>

              <span className="text-[10px] text-zinc-300">✦</span>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
                Nunca te conformes
              </span>

              <span className="text-[10px] text-zinc-300">✦</span>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
                Feito para o movimento
              </span>

              <span className="text-[10px] text-zinc-300">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <Footer />
    </main>
  );
}
