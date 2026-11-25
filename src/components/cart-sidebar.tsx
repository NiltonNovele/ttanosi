
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Trash2,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export function CartSidebar() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
  } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const formatPrice = (price: number) =>
    `MZN ${price.toLocaleString("pt-MZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  /* =========================================================
      ESCAPE KEY
  ========================================================== */

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  /* =========================================================
      PREVENT BACKGROUND SCROLL
  ========================================================== */

  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* =====================================================
              BACKDROP
          ===================================================== */}

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="fixed inset-0 z-[60] cursor-default bg-black/35 backdrop-blur-[3px]"
          />

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 32,
              stiffness: 280,
              mass: 0.85,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            className="
              fixed inset-y-0 right-0 z-[70]
              flex w-full max-w-[460px] flex-col
              border-l border-zinc-200
              bg-[#fafafa] text-zinc-950
              shadow-[-20px_0_70px_rgba(0,0,0,0.12)]
            "
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="shrink-0 border-b border-zinc-200 bg-white px-5 py-5 sm:px-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
                    <ShoppingBag
                      className="h-[17px] w-[17px] text-zinc-800"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-black uppercase tracking-[0.08em] text-zinc-950">
                        O teu carrinho
                      </h2>

                      {totalItems > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[9px] font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      {totalItems === 0
                        ? "Sem artigos"
                        : totalItems === 1
                          ? "1 artigo seleccionado"
                          : `${totalItems} artigos seleccionados`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Fechar carrinho"
                  className="
                    group flex h-10 w-10 items-center justify-center
                    rounded-full border border-zinc-200 bg-white
                    text-zinc-500 transition-all duration-300
                    hover:border-black hover:bg-black hover:text-white
                    active:scale-95
                  "
                >
                  <X
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                CART CONTENT
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7">
              {items.length === 0 ? (
                /* =================================================
                    EMPTY CART
                ================================================= */

                <div className="flex h-full flex-col items-center justify-center px-5 py-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex h-24 w-24 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  >
                    <ShoppingBag
                      className="h-8 w-8 text-zinc-300"
                      strokeWidth={1.2}
                    />

                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#fafafa] bg-black text-white">
                      <Plus size={11} strokeWidth={2.5} />
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.45 }}
                    className="mt-7"
                  >
                    <p className="text-[13px] font-black uppercase tracking-[0.08em] text-zinc-900">
                      O teu carrinho está vazio
                    </p>

                    <p className="mx-auto mt-3 max-w-[260px] text-xs leading-6 text-zinc-500">
                      Ainda não adicionaste nenhuma peça. Descobre a colecção
                      TANOSI e encontra algo que combine contigo.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    type="button"
                    onClick={closeCart}
                    className="
                      group mt-8 inline-flex h-12 items-center gap-3
                      rounded-xl bg-black px-6
                      text-[9px] font-black uppercase tracking-[0.18em]
                      text-white transition-all duration-300
                      hover:bg-zinc-800 active:scale-[0.97]
                    "
                  >
                    Explorar colecção

                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </motion.button>

                  <p className="mt-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
                    TANOSI · Estilo sem limites
                  </p>
                </div>
              ) : (
                /* =================================================
                    CART ITEMS
                ================================================= */

                <div className="py-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 30,
                          height: 0,
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.035,
                          layout: {
                            duration: 0.3,
                          },
                        }}
                        className="overflow-hidden border-b border-zinc-200 py-5"
                      >
                        <div className="flex gap-4">
                          {/* PRODUCT IMAGE */}

                          <div className="group relative h-[112px] w-[88px] shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 sm:h-[124px] sm:w-[100px]">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.image}
                                alt={item.name}
                                className="
                                  h-full w-full object-cover object-center
                                  transition-transform duration-700
                                  group-hover:scale-105
                                "
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-zinc-300" />
                              </div>
                            )}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.08] to-transparent" />
                          </div>

                          {/* PRODUCT DETAILS */}

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="truncate text-[11px] font-black uppercase tracking-[0.06em] text-zinc-900">
                                  {item.name}
                                </h3>

                                <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.13em] text-zinc-400">
                                  TANOSI · Colecção
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remover ${item.name} do carrinho`}
                                className="
                                  flex h-8 w-8 shrink-0 items-center
                                  justify-center rounded-lg
                                  text-zinc-400 transition-all
                                  hover:bg-red-50 hover:text-red-500
                                  active:scale-90
                                "
                              >
                                <Trash2 size={14} strokeWidth={1.7} />
                              </button>
                            </div>

                            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                              {/* QUANTITY */}

                              <div className="flex h-9 items-center rounded-lg border border-zinc-200 bg-white">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity - 1,
                                    )
                                  }
                                  aria-label={`Diminuir quantidade de ${item.name}`}
                                  className="
                                    flex h-full w-8 items-center
                                    justify-center rounded-l-lg
                                    text-zinc-500 transition-colors
                                    hover:bg-zinc-100 hover:text-black
                                    active:bg-zinc-200
                                  "
                                >
                                  <Minus size={12} strokeWidth={2} />
                                </button>

                                <span className="min-w-7 text-center text-[10px] font-bold tabular-nums text-zinc-900">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1,
                                    )
                                  }
                                  aria-label={`Aumentar quantidade de ${item.name}`}
                                  className="
                                    flex h-full w-8 items-center
                                    justify-center rounded-r-lg
                                    text-zinc-500 transition-colors
                                    hover:bg-zinc-100 hover:text-black
                                    active:bg-zinc-200
                                  "
                                >
                                  <Plus size={12} strokeWidth={2} />
                                </button>
                              </div>

                              {/* PRICE */}

                              <div className="text-right">
                                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                                  Subtotal
                                </p>

                                <p className="mt-1 text-[12px] font-black tracking-[-0.02em] text-zinc-950">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* =================================================
                FOOTER / CHECKOUT
            ================================================= */}

            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 border-t border-zinc-200 bg-white px-5 pb-6 pt-5 sm:px-7"
                >
                  {/* ITEM COUNT */}

                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {totalItems} {totalItems === 1 ? "artigo" : "artigos"}
                    </span>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-black"
                    >
                      <ArrowLeft size={12} />
                      Continuar a comprar
                    </button>
                  </div>

                  {/* TOTAL */}

                  <div className="border-t border-zinc-100 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-900">
                          Subtotal
                        </p>

                        <p className="mt-1.5 text-[9px] text-zinc-400">
                          Portes calculados no checkout
                        </p>
                      </div>

                      <p className="text-xl font-black tracking-[-0.05em] text-zinc-950">
                        {formatPrice(total)}
                      </p>
                    </div>
                  </div>

                  {/* CHECKOUT BUTTON */}

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="
                      group mt-5 flex h-[52px] w-full
                      items-center justify-center gap-3
                      rounded-xl bg-black
                      text-[10px] font-black uppercase tracking-[0.2em]
                      text-white transition-all duration-300
                      hover:bg-zinc-800 active:scale-[0.99]
                    "
                  >
                    Finalizar compra

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.8}
                    />
                  </Link>

                  {/* TRUST NOTE */}

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <ShoppingCart
                      size={11}
                      className="text-zinc-300"
                      strokeWidth={1.7}
                    />

                    <p className="text-center text-[8px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      A tua próxima peça começa aqui
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
