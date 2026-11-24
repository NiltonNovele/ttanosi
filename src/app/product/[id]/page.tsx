
"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { getProductById } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = getProductById(id);

  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [activeImage, setActiveImage] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  if (!product) {
    notFound();
  }

  const images = product.images?.length
    ? product.images
    : ["/placeholder.jpg"];

  const hasSizes = Boolean(product.sizes?.length);

  React.useEffect(() => {
    setSelectedSize(product.sizes?.length === 1 ? product.sizes[0] : null);
    setQuantity(1);
    setActiveImage(0);
  }, [product.id]);

  const formattedPrice = new Intl.NumberFormat("pt-PT").format(
    product.price
  );

  const formattedTotal = new Intl.NumberFormat("pt-PT").format(
    product.price * quantity
  );

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error("Seleciona um tamanho", {
        description:
          "Escolhe o teu tamanho antes de adicionares este artigo ao carrinho.",
      });
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize || "os"}`,
      name: `${product.name}${selectedSize ? ` (${selectedSize})` : ""}`,
      price: product.price,
      quantity,
      image: images[activeImage] || images[0],
    });

    toast.success("Adicionado ao carrinho", {
      description: `${quantity} × ${product.name}${
        selectedSize ? ` — ${selectedSize}` : ""
      }`,
      action: {
        label: "Ver carrinho",
        onClick: () => {
          useCartStore.getState().toggleCart();
        },
      },
    });
  };

  const handleWishlist = () => {
    const nextState = !isWishlisted;

    setIsWishlisted(nextState);

    toast.success(
      nextState
        ? "Adicionado aos favoritos"
        : "Removido dos favoritos"
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        toast.success("Ligação copiada", {
          description:
            "A ligação deste produto foi copiada para a área de transferência.",
        });
      }
    } catch {
      // O utilizador cancelou a partilha.
    }
  };

  return (
    <main className="min-h-screen bg-white pb-24 text-black sm:pb-0">
      {/* TOP NAVIGATION */}

      <div className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <div className="flex min-h-12 items-center justify-between border-b border-zinc-200 pb-4">
          <nav
            aria-label="Navegação estrutural"
            className="hidden items-center gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-400 sm:flex"
          >
            <Link
              href="/"
              className="transition-colors hover:text-black"
            >
              Início
            </Link>

            <span className="text-zinc-300">/</span>

            <Link
              href={`/collections/${product.category}`}
              className="transition-colors hover:text-black"
            >
              {product.category}
            </Link>

            <span className="text-zinc-300">/</span>

            <span className="max-w-[220px] truncate text-black">
              {product.name}
            </span>
          </nav>

          <Link
            href={`/collections/${product.category}`}
            className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-black sm:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Voltar
          </Link>

          <div className="ml-auto flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400">
            <span className="font-bold text-black">TANOSI</span>
            <span>✦</span>
            <span>NUNCA TE CONFORMES</span>
          </div>
        </div>
      </div>

      {/* PRODUCT CONTENT */}

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.78fr)] lg:gap-20 xl:gap-28">
          {/* PRODUCT GALLERY */}

          <section className="min-w-0 lg:sticky lg:top-24">
            <div className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)] lg:grid-cols-[72px_minmax(0,1fr)]">
              {/* THUMBNAILS */}

              {images.length > 1 && (
                <div className="order-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:order-1 sm:flex-col sm:overflow-visible">
                  {images.map((image, index) => {
                    const active = activeImage === index;

                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Ver imagem ${index + 1}`}
                        aria-current={active}
                        className={`relative h-[62px] w-[62px] shrink-0 overflow-hidden border transition-all duration-300 lg:h-[70px] lg:w-[70px] ${
                          active
                            ? "border-black"
                            : "border-transparent opacity-50 hover:border-zinc-300 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} — imagem ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MAIN IMAGE */}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative order-1 min-w-0 overflow-hidden bg-[#f4f4f2] sm:order-2"
              >
                <div className="relative aspect-[4/5] w-full max-h-[780px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${images[activeImage]}-${activeImage}`}
                      src={images[activeImage]}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </AnimatePresence>

                  {/* PRODUCT LABEL */}

                  {(product.isNewArrival || product.badge) && (
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <span className="inline-flex items-center gap-2 bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.16em] text-black">
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                        {product.badge || "Novidade"}
                      </span>
                    </div>
                  )}

                  {/* IMAGE NAVIGATION */}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        aria-label="Imagem anterior"
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-black opacity-100 backdrop-blur-sm transition-all hover:bg-black hover:text-white sm:left-5"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Imagem seguinte"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-black opacity-100 backdrop-blur-sm transition-all hover:bg-black hover:text-white sm:right-5"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 font-mono text-[9px] tracking-wider text-black backdrop-blur-sm">
                        {String(activeImage + 1).padStart(2, "0")}
                        <span className="mx-1.5 text-zinc-400">/</span>
                        {String(images.length).padStart(2, "0")}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* MOBILE IMAGE INDICATORS */}

            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                    className={`h-1 transition-all duration-300 ${
                      activeImage === index
                        ? "w-6 bg-black"
                        : "w-2 bg-zinc-300"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="mt-4 hidden items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-400 sm:flex">
              <span>TANOSI — PRODUCT ARCHIVE</span>
              <span>EST. 2025</span>
            </div>
          </section>

          {/* PRODUCT INFORMATION */}

          <section className="min-w-0 lg:pt-2">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* CATEGORY */}

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-6 bg-black" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  {product.category}
                </span>
              </div>

              {/* TITLE */}

              <h1 className="max-w-xl text-[clamp(2.6rem,5vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
                {product.name}
              </h1>

              {/* PRICE */}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xl font-semibold tracking-tight sm:text-2xl">
                  MZN {formattedPrice}
                </span>

                <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-zinc-400">
                  IVA incluído
                </span>
              </div>

              {/* DESCRIPTION */}

              <p className="mt-6 max-w-lg text-[13px] leading-7 text-zinc-500 sm:text-sm">
                {product.description}
              </p>

              <div className="my-8 h-px bg-zinc-200" />

              {/* SIZE SELECTOR */}

              {hasSizes && (
                <section className="mb-8">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-[9px] font-bold uppercase tracking-[0.18em]">
                        Tamanho
                      </h2>

                      {selectedSize && (
                        <p className="mt-1.5 text-[10px] text-zinc-500">
                          Selecionado:{" "}
                          <span className="font-semibold text-black">
                            {selectedSize}
                          </span>
                        </p>
                      )}
                    </div>

                    <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                      Escolhe o teu tamanho
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {product.sizes.map((size) => {
                      const active = selectedSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          aria-pressed={active}
                          className={`relative flex h-12 items-center justify-center border text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                            active
                              ? "border-black bg-black text-white"
                              : "border-zinc-200 bg-white text-black hover:border-black"
                          }`}
                        >
                          {size}

                          {active && (
                            <Check className="absolute right-1.5 top-1.5 h-2.5 w-2.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* QUANTITY + ADD TO CART */}

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="flex h-14 w-full items-center justify-between border border-zinc-200 px-2 sm:w-[132px] sm:shrink-0">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                    className="flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>

                  <span className="min-w-8 text-center text-xs font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Aumentar quantidade"
                    className="flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-black"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.985 }}
                  className="group flex h-14 min-w-0 flex-1 items-center justify-center gap-3 bg-black px-5 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-zinc-800 sm:text-[10px]"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0" />

                  <span className="truncate">
                    Adicionar ao carrinho — MZN {formattedTotal}
                  </span>

                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.button>
              </div>

              {/* SECONDARY ACTIONS */}

              <div className="mt-5 flex items-center gap-6 border-b border-zinc-200 pb-7">
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-pressed={isWishlisted}
                  className="group flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition-colors hover:text-black sm:text-[9px]"
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isWishlisted
                        ? "fill-black text-black"
                        : "group-hover:scale-105"
                    }`}
                  />

                  {isWishlisted ? "Nos favoritos" : "Guardar"}
                </button>

                <span className="h-4 w-px bg-zinc-200" />

                <button
                  type="button"
                  onClick={handleShare}
                  className="group flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition-colors hover:text-black sm:text-[9px]"
                >
                  <Share2 className="h-4 w-4 transition-transform group-hover:scale-105" />
                  Partilhar
                </button>
              </div>


              {/* BRAND SIGNATURE */}

              <div className="mt-8 flex items-center justify-between gap-4 border border-zinc-200 px-4 py-4 sm:px-5">
                <div>
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                    TANOSI
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                    Nunca te conformes.
                  </p>
                </div>

                <span className="text-right font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-400">
                  Veste aquilo que te representa.
                </span>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* MOBILE STICKY PURCHASE BAR */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur-xl sm:hidden">
        <div className="flex gap-2">
          <div className="flex h-12 w-[96px] shrink-0 items-center justify-between border border-zinc-200 px-1">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
              className="flex h-10 w-9 items-center justify-center text-zinc-500 disabled:opacity-25"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="text-xs font-semibold">{quantity}</span>

            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Aumentar quantidade"
              className="flex h-10 w-9 items-center justify-center text-zinc-500"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 bg-black px-4 text-[9px] font-bold uppercase tracking-[0.12em] text-white"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />

            <span className="truncate">
              Adicionar — MZN {formattedTotal}
            </span>
          </motion.button>
        </div>
      </div>
    </main>
  );
}
