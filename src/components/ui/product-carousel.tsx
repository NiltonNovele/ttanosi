"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductCarousel({
  title,
  products,
  viewAllLink,
}: ProductCarouselProps) {
  const addItem = useCartStore(
    (state) => state.addItem,
  );

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-7 flex items-end justify-between gap-6 sm:mb-9">
          <div>
            {/* Small label */}

            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-px w-6 bg-white/30" />

              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                Tanosi / Selecção
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-2xl font-black uppercase tracking-[-0.05em] text-foreground sm:text-3xl md:text-5xl">
              {title}
            </h2>
          </div>

          {/* =================================================
              VIEW ALL
          ================================================= */}

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="
                group
                flex
                shrink-0
                items-center
                gap-2
                pb-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-foreground/40
                transition-colors
                duration-300
                hover:text-foreground
              "
            >
              <span className="hidden sm:inline">
                Ver todas
              </span>

              <span className="sm:hidden">
                Ver
              </span>

              <motion.span
                className="flex"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{
                  duration: 0.2,
                }}
              >
                <ArrowRight
                  className="h-3.5 w-3.5"
                  strokeWidth={1.7}
                />
              </motion.span>
            </Link>
          )}
        </div>

        {/* =====================================================
            CAROUSEL
        ===================================================== */}

        <div
          className="
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            pb-5
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-5
            lg:gap-6
          "
        >
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="
                w-[72vw]
                max-w-[280px]
                shrink-0
                snap-start
                sm:w-[280px]
                md:w-[320px]
                lg:w-[340px]
              "
              initial={{
                opacity: 0,
                y: 20,
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
                delay: Math.min(
                  index * 0.07,
                  0.35,
                ),
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-lg
                  border
                  border-white/[0.08]
                  bg-[#0d0d0f]
                  transition-all
                  duration-500
                  hover:border-white/[0.16]
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <Link
                  href={`/product/${product.id}`}
                  className="block"
                  aria-label={`Ver ${product.name}`}
                >
                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      bg-[#1a1a1a]
                    "
                  >
                    {/* Product image */}

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading={
                        index < 2
                          ? "eager"
                          : "lazy"
                      }
                      draggable={false}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.045]
                      "
                    />

                    {/* =================================================
                        CINEMATIC GRADIENT
                    ================================================= */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-transparent
                        to-white/[0.04]
                        opacity-70
                      "
                    />

                    {/* Chrome edge */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/[0.08]
                        via-transparent
                        to-black/20
                      "
                    />

                    {/* =================================================
                        BADGE
                    ================================================= */}

                    {product.badge ||
                    product.isNewArrival ? (
                      <div
                        className="
                          absolute
                          left-3
                          top-3
                          z-10
                          rounded-full
                          border
                          border-white/[0.15]
                          bg-[#0d0d0f]/75
                          px-2.5
                          py-1
                          text-[7px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-white/75
                          backdrop-blur-md
                        "
                      >
                        {product.badge ||
                          "NOVIDADE"}
                      </div>
                    ) : null}

                    {/* =================================================
                        PRODUCT NUMBER
                    ================================================= */}

                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        z-10
                        font-mono
                        text-[8px]
                        text-white/35
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </div>

                    {/* =================================================
                        QUICK ADD
                    ================================================= */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        z-20
                        flex
                        justify-center
                        p-4
                        opacity-100
                        transition-all
                        duration-300
                        sm:opacity-0
                        sm:group-hover:opacity-100
                      "
                    >
                      <motion.button
                        type="button"
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image:
                              product.images[0],
                          });
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-md
                          border
                          border-white/20
                          bg-white
                          px-5
                          py-3
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-[#0d0d0f]
                          shadow-2xl
                          transition-colors
                          duration-300
                          hover:bg-[#e8e8e8]
                        "
                      >
                        <ShoppingBag
                          className="h-3.5 w-3.5"
                          strokeWidth={1.8}
                        />

                        Adicionar
                      </motion.button>
                    </div>
                  </div>
                </Link>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${product.id}`}
                      className="
                        min-w-0
                        transition-colors
                        duration-300
                        hover:text-white
                      "
                    >
                      <h3
                        className="
                          line-clamp-1
                          text-[11px]
                          font-black
                          uppercase
                          tracking-[0.06em]
                          text-foreground/80
                          sm:text-xs
                        "
                      >
                        {product.name}
                      </h3>
                    </Link>

                    {/* =================================================
                        PRICE — MZN
                    ================================================= */}

                    <span className="shrink-0 text-[11px] font-bold text-foreground/65 sm:text-xs">
                      {new Intl.NumberFormat(
                        "pt-MZ",
                        {
                          style: "currency",
                          currency: "MZN",
                          maximumFractionDigits: 0,
                        },
                      ).format(product.price)}
                    </span>
                  </div>

                  {/* Description */}

                  <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-foreground/35 sm:text-[11px]">
                    {product.description}
                  </p>

                  {/* =================================================
                      BOTTOM DETAIL
                  ================================================= */}

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                    <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/20">
                      Tanosi
                    </span>

                    <Link
                      href={`/product/${product.id}`}
                      className="
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-white/25
                        transition-colors
                        hover:text-white/70
                      "
                    >
                      Ver peça
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =====================================================
            MOBILE SCROLL INDICATOR
        ===================================================== */}

        {products.length > 1 && (
          <div className="mt-1 flex items-center justify-center gap-2 sm:hidden">
            <span className="h-px w-8 bg-white/20" />

            <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
              Desliza
            </span>

            <span className="h-px w-8 bg-white/20" />
          </div>
        )}
      </div>
    </section>
  );
}