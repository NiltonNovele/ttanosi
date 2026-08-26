"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useCartStore } from "@/store/useCartStore";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  {
    label: "MENS",
    href: "/collections/mens",
  },
  {
    label: "WOMENS",
    href: "/collections/womens",
  },
  {
    label: "TRENDING",
    href: "/collections/trending",
  },
  {
    label: "LOOKBOOK",
    href: "/collections/looks",
  },
];

export function MegaMenu() {
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* Close mobile menu when navigating */
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className="
            relative
            flex
            h-14
            items-center
            justify-between
            rounded-xl
            border
            border-white/[0.08]
            bg-[#0d0d0f]/50
            px-3
            backdrop-blur-xl
            transition-all
            duration-300
            sm:px-4
          "
        >
          {/* =================================================
              LEFT — MOBILE MENU + LOGO
              ================================================= */}

          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className="
                group
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-md
                text-white/55
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
                md:hidden
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" strokeWidth={1.8} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.8} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* =================================================
                LOGO
                ================================================= */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="group flex items-center gap-2.5"
              aria-label="Ttanosi home"
            >
              {/* Logo image */}

              {/* 
                CHANGE THIS IMAGE:
                Put your logo at /public/logo.jpg
              */}

              <div
                className="
                  relative
                  h-9
                  w-12
                  shrink-0
                  overflow-hidden
                  rounded-sm
                  bg-white/[0.03]
                  transition-all
                  duration-300
                "
              >
                <Image
                  src="/logo.jpg"
                  alt="Ttanosi"
                  fill
                  priority
                  sizes="48px"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Chrome overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25"
                />
              </div>

              {/* Wordmark */}

              <div className="leading-none">
                <div className="text-base font-black uppercase tracking-[-0.05em] text-white sm:text-lg">
                  ttanosi
                  <span className="chrome-text">.</span>
                </div>

                <div className="mt-1 text-[6px] font-bold uppercase tracking-[0.38em] text-white/35">
                  Stay Weird
                </div>
              </div>
            </Link>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  relative
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/45
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                {item.label}

                {/* Active/hover underline */}
                <span
                  className="
                    absolute
                    -bottom-0.5
                    left-0
                    h-px
                    w-0
                    bg-gradient-to-r
                    from-white/30
                    via-white
                    to-white/30
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            ))}
          </nav>

          {/* =================================================
              RIGHT ACTIONS
              ================================================= */}

          <div className="flex items-center gap-1">
            <ThemeToggle />

            {/* Cart */}
            <button
              type="button"
              onClick={toggleCart}
              aria-label={
                totalItems > 0
                  ? `Open cart, ${totalItems} items`
                  : "Open cart"
              }
              className="
                group
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-md
                text-white/50
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <ShoppingBag
                className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.8}
              />

              {/* Cart count */}
              {mounted && totalItems > 0 && (
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#0d0d0f]
                    bg-[#c9c9c9]
                    px-1
                    text-[8px]
                    font-black
                    text-[#0d0d0f]
                  "
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
            ===================================================== */}

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-2
                overflow-hidden
                rounded-xl
                border
                border-white/[0.08]
                bg-[#0d0d0f]/95
                backdrop-blur-xl
                md:hidden
              "
            >
              <nav
                aria-label="Mobile navigation"
                className="p-2"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.2,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        px-3
                        py-3.5
                        transition-colors
                        duration-200
                        hover:bg-white/[0.05]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[8px] text-white/20">
                          0{index + 1}
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 transition-colors group-hover:text-white">
                          {item.label}
                        </span>
                      </div>

                      <ArrowUpRight
                        className="
                          h-3.5
                          w-3.5
                          text-white/20
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-white
                        "
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile menu footer */}
              <div className="border-t border-white/[0.06] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/20">
                    TTANOSI
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Stay Weird ✦
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}