
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
    e.preventDefault();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });

    toast.success(`${product.name} foi adicionado ao carrinho.`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-zinc-200 transition-all duration-300 hover:border-zinc-400 hover:shadow-xl hover:shadow-black/5"
      >
        {/* Contentor da imagem */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Etiqueta de novidade */}
          {product.isNewArrival && (
            <div className="absolute left-4 top-4 z-10 flex rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
              Novidade
            </div>
          )}

          {/* Sobreposição de adição rápida */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-black/95 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur transition-all duration-300 hover:bg-zinc-800 active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Adicionar rapidamente
            </button>
          </div>
        </div>

        {/* Informação do produto */}
        <div className="flex flex-1 flex-col justify-between bg-white p-5">
          <div>
            <h3 className="line-clamp-2 text-lg font-bold uppercase tracking-tight text-black transition-colors group-hover:text-zinc-600">
              {product.name}
            </h3>

            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-zinc-500">
              {product.category}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
            <p className="text-lg font-bold tracking-tight text-black">
              MZN {product.price.toLocaleString("pt-PT")}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
