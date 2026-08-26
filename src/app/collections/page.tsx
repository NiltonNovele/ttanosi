"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";

const collections = [
  {
    title: "Mens",
    label: "01 / Collection",
    description: "Essential pieces built for the movement.",
    href: "/collections/mens",
    image:
      "/men.png",
  },
  {
    title: "Womens",
    label: "02 / Collection",
    description: "Designed to move differently.",
    href: "/collections/womens",
    image:
      "/women.png",
  },
  {
    title: "Trending",
    label: "03 / Collection",
    description: "What the movement is wearing now.",
    href: "/collections/trending",
    image:
      "/silver.jpg",
  },
  {
    title: "Accessories",
    label: "04 / Collection",
    description: "The details complete the look.",
    href: "/collections/accessories",
    image:
      "/drawing1.png",
  },
  {
    title: "Looks",
    label: "05 / Collection",
    description: "Complete fits. No second guessing.",
    href: "/collections/looks",
    image:
      "/logo.jpg",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <section className="px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30"
              >
                Ttanosi / Collections
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-8xl"
              >
                Choose
                <br />
                Your World.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden max-w-xs pb-1 text-right text-xs leading-relaxed text-zinc-600 md:block"
            >
              Five ways into Ttanosi.
              <br />
              Find your category and make it yours.
            </motion.div>
          </div>

          <div className="mt-12 h-px bg-white/10" />

          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
              Select collection
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
              05 categories
            </span>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={index === 4 ? "md:col-span-2" : ""}
            >
              <Link
                href={collection.href}
                className="group relative block overflow-hidden bg-zinc-950"
              >
                {/* IMAGE */}
                <div
                  className={`relative overflow-hidden ${
                    index === 4
                      ? "aspect-[16/8] sm:aspect-[16/7]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5 transition-opacity duration-500 group-hover:from-black/80" />

                  {/* TOP META */}
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/60">
                      {collection.label}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                          {collection.title}
                        </h2>

                        <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                          {collection.description}
                        </p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:flex">
                        Explore
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM MARQUEE */}
      <section className="overflow-hidden border-y border-white/10 py-5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-8 whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <React.Fragment key={index}>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                TTANOSI
              </span>

              <span className="text-white/20">✦</span>

              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                NEVER SETTLE
              </span>

              <span className="text-white/20">✦</span>

              <span className="text-sm font-black uppercase tracking-[0.2em] text-white/20 sm:text-base">
                MADE FOR THE MOVEMENT
              </span>

              <span className="text-white/20">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </section>
    </main>
  );
}