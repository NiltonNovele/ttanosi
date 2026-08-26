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
    0
  );

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  // Prevent background scrolling while cart is open
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="
              fixed
              inset-0
              z-[60]
              bg-black/70
              backdrop-blur-md
            "
            aria-hidden="true"
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
              damping: 30,
              stiffness: 260,
              mass: 0.8,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="
              fixed
              inset-y-0
              right-0
              z-[70]
              flex
              w-full
              max-w-[430px]
              flex-col
              border-l
              border-white/[0.08]
              bg-[#0d0d0f]
              text-white
              shadow-[-20px_0_60px_rgba(0,0,0,0.35)]
            "
          >
            {/* =================================================
                HEADER
                ================================================= */}

            <div className="shrink-0 border-b border-white/[0.08] px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03]">
                    <ShoppingBag
                      className="h-3.5 w-3.5 text-white/60"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.08em] text-white">
                      Cart
                    </h2>

                    <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                      {items.length === 0
                        ? "No items"
                        : `${items.length} ${
                            items.length === 1 ? "item" : "items"
                          }`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="
                    group
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.08]
                    text-white/40
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <X
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={1.7}
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                CART CONTENT
                ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
              {items.length === 0 ? (
                /* =================================================
                    EMPTY CART
                    ================================================= */

                <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                    "
                  >
                    <ShoppingBag
                      className="h-7 w-7 text-white/20"
                      strokeWidth={1.2}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="mt-6"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.08em] text-white/80">
                      Your cart is empty
                    </p>

                    <p className="mx-auto mt-2 max-w-[250px] text-xs leading-5 text-white/30">
                      Nothing weird in here yet. Find something that feels
                      like you.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    type="button"
                    onClick={closeCart}
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-white/[0.15]
                      bg-white
                      px-5
                      py-2.5
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-[#0d0d0f]
                      transition-all
                      duration-300
                      hover:bg-white/90
                      hover:tracking-[0.25em]
                    "
                  >
                    Start Shopping
                    <ArrowRight
                      className="h-3 w-3"
                      strokeWidth={2}
                    />
                  </motion.button>
                </div>
              ) : (
                /* =================================================
                    CART ITEMS
                    ================================================= */

                <ul className="divide-y divide-white/[0.07]">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.3,
                      }}
                      className="py-5"
                    >
                      <div className="flex gap-4">
                        {/* Product image */}

                        <div
                          className="
                            relative
                            h-24
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-md
                            border
                            border-white/[0.08]
                            bg-[#1a1a1a]
                            sm:h-28
                            sm:w-24
                          "
                        >
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="
                                h-full
                                w-full
                                object-cover
                                object-center
                                transition-transform
                                duration-500
                                hover:scale-105
                              "
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white/20">
                                No Image
                              </span>
                            </div>
                          )}

                          {/* Image highlight */}
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
                        </div>

                        {/* Product details */}

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="min-w-0 truncate text-[11px] font-black uppercase tracking-[0.06em] text-white/80">
                              {item.name}
                            </h3>

                            <p className="shrink-0 text-[11px] font-bold text-white/70">
                              ₹{item.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity */}

                          <div className="mt-auto flex items-end justify-between pt-5">
                            <div
                              className="
                                flex
                                h-8
                                items-center
                                rounded-md
                                border
                                border-white/[0.10]
                                bg-white/[0.025]
                              "
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-white/35
                                  transition-colors
                                  hover:bg-white/[0.05]
                                  hover:text-white
                                "
                              >
                                <Minus
                                  className="h-3 w-3"
                                  strokeWidth={1.8}
                                />
                              </button>

                              <span className="min-w-8 text-center text-[10px] font-bold text-white/70">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-white/35
                                  transition-colors
                                  hover:bg-white/[0.05]
                                  hover:text-white
                                "
                              >
                                <Plus
                                  className="h-3 w-3"
                                  strokeWidth={1.8}
                                />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="
                                group
                                inline-flex
                                items-center
                                gap-1.5
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.14em]
                                text-white/25
                                transition-colors
                                hover:text-white/70
                              "
                            >
                              <Trash2
                                className="h-3 w-3 transition-transform duration-300 group-hover:scale-110"
                                strokeWidth={1.6}
                              />

                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* =================================================
                FOOTER / CHECKOUT
                ================================================= */}

            {items.length > 0 && (
              <div className="shrink-0 border-t border-white/[0.08] bg-[#0d0d0f] px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                {/* Subtotal */}

                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                      Subtotal
                    </span>

                    <p className="mt-1 text-[9px] text-white/20">
                      Shipping calculated at checkout
                    </p>
                  </div>

                  <span className="text-lg font-black tracking-[-0.03em] text-white">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout */}

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="
                    group
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    bg-white
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-[#0d0d0f]
                    transition-all
                    duration-300
                    hover:bg-[#e8e8e8]
                  "
                >
                  Checkout

                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    strokeWidth={2}
                  />
                </Link>

                {/* Continue shopping */}

                <button
                  type="button"
                  onClick={closeCart}
                  className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/25
                    transition-colors
                    hover:text-white/60
                  "
                >
                  Continue Shopping
                  <span className="ml-2">→</span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}