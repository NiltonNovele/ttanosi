
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { getProductsByCategory, Product } from "@/lib/data";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  category: Product["category"];
  viewAllLink?: string;
}

export function ProductSection({
  title,
  category,
  viewAllLink,
}: ProductSectionProps) {
  const products = getProductsByCategory(category);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 md:py-24 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Subtle silver background details */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,#ffffff_0%,#fafafa_50%,#f4f4f5_100%)]" />

      {/* Corner markers */}
      <div className="corner-marker corner-tl !border-zinc-300"></div>
      <div className="corner-marker corner-tr !border-zinc-300"></div>
      <div className="corner-marker corner-bl !border-zinc-300"></div>
      <div className="corner-marker corner-br !border-zinc-300"></div>

      {/* Subtle silver highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-300/30 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-row items-end justify-between mb-8 md:mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4 text-black">
              {title}
            </h2>

            <div className="h-1 w-24 bg-zinc-400 rounded-full"></div>
          </div>

          <div className="flex flex-col items-end gap-4">
            {viewAllLink ? (
              <Link
                href={viewAllLink}
                className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-zinc-300 rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                Ver tudo
              </Link>
            ) : (
              <button className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-zinc-300 rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                Ver tudo
              </button>
            )}

            <p className="hidden md:block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium max-w-[180px] text-right">
              Selecção criteriosa de {category}, criada para a próxima geração.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  filter: "blur(10px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
