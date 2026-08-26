"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card.tsx";
import { getProductsByCategory, Product } from "@/lib/data";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  category: Product["category"];
  viewAllLink?: string;
}

export function ProductSection({ title, category, viewAllLink }: ProductSectionProps) {
  const products = getProductsByCategory(category);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 md:py-24 md:px-12 bg-background relative overflow-hidden bg-grid-dots">
      {/* Cyber Corner Markers */}
      <div className="corner-marker corner-tl"></div>
      <div className="corner-marker corner-tr"></div>
      <div className="corner-marker corner-bl"></div>
      <div className="corner-marker corner-br"></div>

        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 -z-10 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-row items-end justify-between mb-8 md:mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
              {title}
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
          <div className="flex flex-col items-end gap-4">
            {viewAllLink ? (
              <Link href={viewAllLink}>
                <button className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                  View All
                </button>
              </Link>
            ) : (
              <button className="text-xs font-bold uppercase tracking-widest px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors">
                View All
              </button>
            )}
            <p className="hidden md:block text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-medium max-w-[180px] text-right">
              Curated {category} selection for the next generation.
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
                staggerChildren: 0.1
              }
            }
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
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
