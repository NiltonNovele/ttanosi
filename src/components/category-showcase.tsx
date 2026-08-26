"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Globe } from "lucide-react";

const categories = [
  {
    id: "mens",
    title: "Mens Collection",
    subtitle: "THE ARCHIVE",
    description:
      "Rugged textures and architectural silhouettes. A curated selection of high-end streetwear essentials designed for the digital generation.",
    image: "/men.png",
    href: "/collections/mens",
    stats: "MAPUTO",
    tag: "STREETWEAR // 01",
    batch: "B-774-M-ARCHIVE",
  },
  {
    id: "womens",
    title: "Womens Collection",
    subtitle: "NEW SILHOUETTES",
    description:
      "A reimagining of classic street staples with a focus on high-contrast materiality and futuristic draped forms.",
    image: "/women.png",
    href: "/collections/womens",
    stats: "MOZAMBIQUE",
    tag: "STREETWEAR // 02",
    batch: "B-912-W-CORE",
  },
];

export function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-6 md:py-12 px-4 md:px-12 bg-background relative overflow-hidden bg-grid-dots"
    >
      {/* Flattened Luxury Watermark - Ultra Light Opacity */}
      <div className="absolute top-1/4 left-0 right-0 select-none pointer-events-none flex flex-col items-center opacity-[0.01]">
        <span className="text-[8rem] md:text-[15rem] font-bold leading-none tracking-tighter whitespace-nowrap font-display text-outline">
          2026 // ARCHIVE
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">
        {/* Luxury Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-4 md:mb-6 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-6 md:w-8 h-[1px] bg-primary animate-pulse" />
              <span className="text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] glow-primary">
                S/N 774-32 // ARCHIVE_V2
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.8] font-display">
              The <span className="text-primary italic">Archive</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-[280px] md:max-w-sm"
          >
            <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
              Explore our curated selection of high-end streetwear essentials
              designed for the digital generation <span className="text-primary/40 font-mono">(SYS_REFINED)</span>.
            </p>
          </motion.div>
        </div>

        {/* Responsive Grid - Synchronized Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <CollectionCard category={category} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Polish */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/5 pt-4 md:pt-6">
          {[
            { icon: Zap, label: "Eco-Sync", detail: "Sustainable Fabrics", id: "V.1.0" },
            { icon: ShieldCheck, label: "Hyper-Grade", detail: "Italian Finish", id: "V.2.1" },
            { icon: Globe, label: "Express Drop", detail: "Worldwide Archive", id: "V.3.4" },
            { icon: Zap, label: "Hyper Limits", detail: "Special Edition", id: "V.4.2" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary transition-all duration-500">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[9px] font-mono text-white/10 tracking-widest">{item.id}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-[11px] font-bold uppercase tracking-widest font-display">
                  {item.label}
                </span>
                <span className="text-muted-foreground text-[10px] uppercase tracking-tighter font-mono">
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ category, index }: { category: any; index: number }) {
  return (
    <motion.div
      className="relative w-full h-full"
    >
      <Link href={category.href} className="block relative">
        {/* Trendy Image Container with Scanlines */}
        <div className="relative aspect-[4/4.2] md:aspect-[3/2.8] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/10 group-hover:border-primary/50 transition-colors duration-700">
          <img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-80" />
          
          {/* Subtle Scanline Filter */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-700"
               style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(196, 240, 0, 0.3) 3px)" }} />

          {/* Glassmorphic Tags */}
          <div className="absolute top-10 left-10 flex items-center gap-3 z-30">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 px-5 py-2.5 rounded-full shadow-2xl">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                {category.stats}
              </span>
            </div>
            <div className="backdrop-blur-xl bg-primary/20 border border-primary/30 px-5 py-2.5 rounded-full shadow-2xl">
              <span className="text-primary text-[10px] font-mono tracking-tighter">
                {category.tag}
              </span>
            </div>
          </div>

          {/* Batch Code Tooltip */}
          <div className="absolute bottom-10 right-10 z-30 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-white/40 mb-1">ARCHIVE_SYS:</span>
              <span className="text-xs font-mono text-primary font-bold tracking-tighter bg-primary/10 px-2 py-1 rounded">
                {category.batch}
              </span>
            </div>
          </div>
        </div>

        {/* Flat Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-12 z-20">
          <motion.div 
            className="overflow-hidden mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="inline-block text-primary text-[12px] font-bold uppercase tracking-[0.6em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
              {category.subtitle}
            </span>
          </motion.div>

          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-4 md:mb-6 leading-[0.8] font-display">
            {category.title.split(" ")[0]} <br />
            <span className="text-white/30 group-hover:text-primary transition-colors duration-700">
              {category.title.split(" ")[1]}
            </span>
          </h3>

          <p className="text-white/60 text-sm md:text-base max-w-[340px] mb-8 md:mb-10 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0">
            {category.description}
          </p>

          <div className="flex items-center gap-6 group/btn">
            <div className="relative overflow-hidden">
              <span className="text-white text-xs font-bold uppercase tracking-[0.5em] inline-block py-2">
                Launch Access
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-background transition-colors duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
