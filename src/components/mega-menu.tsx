
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Catálogo",
    href: "/collections/all",
  },
  {
    label: "Acessórios",
    href: "/collections/accessories",
  },
  {
    label: "LookBook",
    href: "/lookbook",
  },
];

export function MegaMenu() {
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const pathname = usePathname();

  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">

        {/* MAIN NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative flex h-16 items-center justify-between
            rounded-2xl border border-black/[0.07]
            bg-white/95 px-3
            shadow-[0_4px_30px_rgba(0,0,0,0.045)]
            backdrop-blur-2xl
            transition-all duration-300
            sm:px-5
          "
        >

          {/* LEFT: MOBILE MENU + LOGO */}
          <div className="flex items-center gap-2">

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              aria-expanded={mobileMenuOpen}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl text-black/65
                transition-all duration-300
                hover:bg-black/[0.05] hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/20
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
                    <X className="h-5 w-5" strokeWidth={1.7} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" strokeWidth={1.7} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* BRAND LOGO */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="group flex items-center gap-2.5"
              aria-label="Página inicial da Tanosi"
            >
              <div className="
                relative h-10 w-12 shrink-0
                overflow-hidden rounded-lg bg-gray-50
                transition-all duration-300
                group-hover:scale-[1.03]
              ">
                <Image
                  src="/logo.png"
                  alt="Tanosi"
                  fill
                  priority
                  sizes="48px"
                  className="
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* BRAND NAME */}
              <div className="leading-none">
                <div className="
                  text-lg font-black uppercase
                  tracking-[-0.06em] text-black
                  sm:text-xl
                ">
                  tanosi
                  <span className="text-black/35">.</span>
                </div>

                <div className="
                  mt-1 text-[7px] font-bold uppercase
                  tracking-[0.32em] text-black/40
                ">
                  Seja Diferente
                </div>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Navegação principal"
            className="
              absolute left-1/2 hidden -translate-x-1/2
              items-center gap-8 md:flex
            "
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    group relative py-3
                    text-[10px] font-bold uppercase
                    tracking-[0.17em]
                    transition-colors duration-300
                    ${
                      active
                        ? "text-black"
                        : "text-black/45 hover:text-black"
                    }
                  `}
                >
                  {item.label}

                  <span
                    className={`
                      absolute -bottom-0.5 left-0 h-[1.5px]
                      bg-black transition-all duration-300
                      ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: SHOPPING CART */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleCart}
              aria-label={
                totalItems > 0
                  ? `Abrir carrinho, ${totalItems} ${
                      totalItems === 1 ? "artigo" : "artigos"
                    }`
                  : "Abrir carrinho"
              }
              className="
                group relative flex h-10 w-10
                items-center justify-center
                rounded-xl text-black/65
                transition-all duration-300
                hover:bg-black/[0.05] hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black/20
              "
            >
              <ShoppingBag
                className="
                  h-[19px] w-[19px]
                  transition-transform duration-300
                  group-hover:scale-110
                "
                strokeWidth={1.7}
              />

              {/* CART COUNTER */}
              {mounted && totalItems > 0 && (
                <span className="
                  absolute -right-0.5 -top-0.5
                  flex h-[17px] min-w-[17px]
                  items-center justify-center
                  rounded-full border-2 border-white
                  bg-black px-1
                  text-[8px] font-bold text-white
                ">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* MOBILE NAVIGATION */}
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
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-2 overflow-hidden rounded-2xl
                border border-black/[0.07]
                bg-white shadow-[0_10px_40px_rgba(0,0,0,0.07)]
                backdrop-blur-xl md:hidden
              "
            >
              <nav
                aria-label="Navegação mobile"
                className="p-2"
              >
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  return (
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
                        delay: index * 0.05,
                        duration: 0.25,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        aria-current={active ? "page" : undefined}
                        className={`
                          group flex items-center
                          justify-between rounded-xl
                          px-4 py-4
                          transition-all duration-200
                          ${
                            active
                              ? "bg-black/[0.045]"
                              : "hover:bg-black/[0.035]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`
                            font-mono text-[9px]
                            ${
                              active
                                ? "text-black/60"
                                : "text-black/25"
                            }
                          `}>
                            0{index + 1}
                          </span>

                          <span className={`
                            text-[11px] font-bold uppercase
                            tracking-[0.16em]
                            transition-colors duration-200
                            ${
                              active
                                ? "text-black"
                                : "text-black/55 group-hover:text-black"
                            }
                          `}>
                            {item.label}
                          </span>
                        </div>

                        <ArrowUpRight
                          className={`
                            h-4 w-4 transition-all duration-300
                            ${
                              active
                                ? "text-black"
                                : "text-black/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                            }
                          `}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* MOBILE MENU FOOTER */}
              <div className="
                border-t border-black/[0.06]
                px-5 py-4
              ">
                <div className="flex items-center justify-between">
                  <span className="
                    text-[8px] font-bold uppercase
                    tracking-[0.25em] text-black/40
                  ">
                    TANOSI
                  </span>

                  <span className="
                    text-[8px] uppercase
                    tracking-[0.2em] text-black/35
                  ">
                    Seja Diferente ✦
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
