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

  React.useEffect(() => {
    if (product?.sizes?.length === 1) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const images = product.images?.length
    ? product.images
    : ["/placeholder.jpg"];

  const hasSizes = product.sizes && product.sizes.length > 0;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error("Select a size first", {
        description: "Choose your preferred size before adding this item.",
      });
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize || "os"}`,
      name: `${product.name}${selectedSize ? ` (${selectedSize})` : ""}`,
      price: product.price,
      quantity,
      image: images[0],
    });

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name}${
        selectedSize ? ` — ${selectedSize}` : ""
      }`,
      action: {
        label: "View Cart",
        onClick: () => {
          useCartStore.getState().toggleCart();
        },
      },
    });
  };

  const handleWishlist = () => {
    setIsWishlisted((current) => !current);

    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
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

        toast.success("Link copied", {
          description: "Product link copied to your clipboard.",
        });
      }
    } catch {
      // User cancelled the native share dialog.
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =====================================================
          PAGE HEADER / BREADCRUMB
          ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="flex items-center justify-between">
          <nav className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:flex">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <span className="text-muted-foreground/40">/</span>

            <Link
              href={`/collections/${product.category}`}
              className="transition-colors hover:text-foreground"
            >
              {product.category}
            </Link>

            <span className="text-muted-foreground/40">/</span>

            <span className="max-w-[180px] truncate text-foreground/60">
              {product.name}
            </span>
          </nav>

          <Link
            href={`/collections/${product.category}`}
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back
          </Link>

          <div className="ml-auto hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 sm:flex">
            TTANOSI
            <span>✦</span>
            STAY WEIRD
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT
          ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:gap-20">
          {/* =================================================
              PRODUCT MEDIA
              ================================================= */}

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="grid gap-3 sm:grid-cols-[76px_minmax(0,1fr)]">
              {/* Thumbnails */}

              {images.length > 1 && (
                <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View product image ${index + 1}`}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-all sm:h-[72px] sm:w-[72px] ${
                        activeImage === index
                          ? "border-foreground"
                          : "border-border opacity-60 hover:border-foreground/40 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {activeImage === index && (
                        <span className="absolute inset-0 border-2 border-foreground/70" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative order-1 overflow-hidden rounded-xl bg-muted sm:order-2"
              >
                <div className="aspect-[4/5] w-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[activeImage]}
                      src={images[activeImage]}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </AnimatePresence>
                </div>

                {/* New badge */}

                {(product.isNewArrival || product.badge) && (
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-foreground shadow-lg backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {product.badge || "New Arrival"}
                    </span>
                  </div>
                )}

                {/* Image counter */}

                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[9px] text-white backdrop-blur-md">
                    {String(activeImage + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
              ================================================= */}

          <div className="flex flex-col lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Category */}

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-foreground/30" />

                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {product.category}
                </span>
              </div>

              {/* Title */}

              <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>

              {/* Price */}

              <div className="mt-5 flex items-center gap-4">
                <span className="text-xl font-bold tracking-tight sm:text-2xl">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                  Tax included
                </span>
              </div>

              {/* Description */}

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
                {product.description}
              </p>

              {/* Divider */}

              <div className="my-8 h-px bg-border" />

              {/* Size */}

              {hasSizes && (
                <section className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Select Size
                      </h2>

                      {selectedSize && (
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          Selected:{" "}
                          <span className="font-bold text-foreground">
                            {selectedSize}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      Size Guide
                    </button>
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
                          className={`relative flex h-12 items-center justify-center rounded-md border text-xs font-bold uppercase tracking-wider transition-all ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-background hover:border-foreground/50 hover:bg-muted"
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

              {/* Quantity + Cart */}

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Quantity */}

                <div className="flex h-14 items-center justify-between rounded-full border border-border bg-background px-2 sm:w-[140px]">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-8 text-center text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add */}

                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.98 }}
                  className="group flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-foreground px-6 text-xs font-black uppercase tracking-[0.15em] text-background shadow-xl transition-all hover:bg-foreground/90"
                >
                  <ShoppingBag className="h-4 w-4" />

                  <span>
                    Add to Cart — ₹
                    {(product.price * quantity).toLocaleString("en-IN")}
                  </span>

                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.button>
              </div>

              {/* Secondary actions */}

              <div className="mt-5 flex items-center gap-5 border-b border-border pb-7">
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isWishlisted
                        ? "fill-current text-foreground"
                        : "group-hover:scale-105"
                    }`}
                  />

                  {isWishlisted ? "Saved" : "Wishlist"}
                </button>

                <span className="h-4 w-px bg-border" />

                <button
                  type="button"
                  onClick={handleShare}
                  className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Share2 className="h-4 w-4 transition-transform group-hover:scale-105" />
                  Share
                </button>
              </div>

              {/* Product information */}

              <div className="mt-2">
                {[
                  {
                    title: "Details & Fit",
                    content:
                      "Designed for everyday movement. Refer to the size guide for the best fit. Product imagery may vary slightly depending on lighting and display.",
                  },
                  {
                    title: "Shipping & Returns",
                    content:
                      "Orders are carefully prepared before dispatch. Shipping times and return eligibility may vary depending on your location and the product.",
                  },
                  {
                    title: "The Ttanosi Philosophy",
                    content:
                      "Stay weird. Make art. Confuse people. Wear what feels like you. Ttanosi exists for people who would rather create their own lane than follow one.",
                  },
                ].map((item) => (
                  <details
                    key={item.title}
                    className="group border-b border-border"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[10px] font-black uppercase tracking-[0.16em] marker:hidden">
                      {item.title}

                      <Plus className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
                    </summary>

                    <div className="max-w-xl pb-5 pr-8 text-xs leading-6 text-muted-foreground">
                      {item.content}
                    </div>
                  </details>
                ))}
              </div>

              {/* Manifesto */}

              <div className="mt-8 flex items-center justify-between border border-border bg-muted/30 px-4 py-4">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    TTANOSI
                  </p>

                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em]">
                    Stay Weird ✦
                  </p>
                </div>

                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
                  Wear what feels like you.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}