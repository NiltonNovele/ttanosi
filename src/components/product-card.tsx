"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    
    toast.success(`Added ${product.name} to cart.`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-card transition-shadow hover:shadow-xl dark:border dark:border-border dark:hover:shadow-primary/5"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          {product.isNewArrival && (
            <div className="absolute top-4 left-4 z-10 flex px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-sm">
              New Arrival
            </div>
          )}

          {/* Quick Add overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground/95 px-4 py-3 text-sm font-bold uppercase tracking-widest text-background backdrop-blur transition-transform active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" /> Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="text-lg font-bold tracking-tight uppercase line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground uppercase tracking-wider font-medium">
              {product.category}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold tracking-tight">
              MZN{product.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
