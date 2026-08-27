"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
  },
  {
    title: "Mulher",
    label: "02 / Coleção",
    description:
      "Criado para quem escolhe mover-se de forma diferente.",
    href: "/collections/womens",
    image: "/women.png",
  },
  {
    title: "Tendências",
    label: "03 / Coleção",
    description:
      "O que o movimento está a usar agora.",
    href: "/collections/trending",
    image: "/logo2.png",
  },
  {
    title: "Acessórios",
    label: "04 / Coleção",
    description:
      "Os detalhes que completam cada visual.",
    href: "/collections/accessories",
    image: "/product/cap1.png",
  },
  {
    title: "Visuais",
    label: "05 / Coleção",
    description:
      "Conjuntos completos. Sem complicações.",
    href: "/collections/looks",
    image: "/design/2.jpeg",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* ============================================================
          HEADER
      ============================================================ */}
      <section className="px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            {/* TITLE */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-7 bg-white/25" />

                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                  Tanosi / Coleções
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
              >
                Escolhe
                <br />
                o teu mundo.
              </motion.h1>
            </div>
          </div>

          {/* DIVIDER */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 h-px origin-left bg-white/10"
          />

          {/* META */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              Selecionar coleção
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              05 categorias
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          COLLECTION CARDS
      ============================================================ */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{
                opacity: 0,
                y: 35,
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
                delay: index * 0.06,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                index === 4
                  ? "md:col-span-2"
                  : ""
              }
            >
              <Link
                href={collection.href}
                aria-label={`Explorar coleção ${collection.title}`}
                className="group relative block overflow-hidden bg-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {/* IMAGE */}
                <div
                  className={`relative overflow-hidden ${
                    index === 4
                      ? "aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
                  />

                  {/* BASE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/5 transition-all duration-700 group-hover:via-black/15 group-hover:from-black/75" />

                  {/* EDGE / FRAME */}
                  <div className="pointer-events-none absolute inset-0 border border-white/0 transition-all duration-500 group-hover:border-white/10" />

                  {/* TOP META */}
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-white/55 transition-colors duration-300 group-hover:text-white/80 sm:text-[9px]">
                      {collection.label}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black sm:h-10 sm:w-10">
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
                    <div className="flex items-end justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black uppercase leading-[0.88] tracking-[-0.055em]">
                          {collection.title}
                        </h2>

                        <p className="mt-3 max-w-md text-[11px] leading-5 text-white/45 transition-colors duration-300 group-hover:text-white/70 sm:text-xs sm:leading-6">
                          {collection.description}
                        </p>
                      </div>

                      {/* DESKTOP EXPLORE */}
                      <div className="hidden shrink-0 items-center gap-2 pb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:flex">
                        Explorar
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* MOBILE ARROW */}
                  <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/60 backdrop-blur-md sm:hidden">
                    <ArrowRight size={14} />
                  </div>

                  {/* HOVER LINE */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================
          MARQUEE
      ============================================================ */}
      <section className="overflow-hidden border-y border-white/10 py-5">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-8 whitespace-nowrap"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index}>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                TANOSI
              </span>

              <span className="text-white/20">
                ✦
              </span>

              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                NUNCA TE CONFORMES
              </span>

              <span className="text-white/20">
                ✦
              </span>

              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                FEITO PARA O MOVIMENTO
              </span>

              <span className="text-white/20">
                ✦
              </span>
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
