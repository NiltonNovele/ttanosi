
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
    if (product?.sizes?.length === 1) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  React.useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

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
      image: images[0],
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
    <main className="min-h-screen bg-background text-foreground">
      {/* =====================================================
          BREADCRUMB / TOP BAR
          ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="flex items-center justify-between border-b border-border pb-5">
          {/* Desktop breadcrumb */}

          <nav
            aria-label="Navegação estrutural"
            className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:flex"
          >
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Início
            </Link>

            <span className="text-muted-foreground/30">/</span>

            <Link
              href={`/collections/${product.category}`}
              className="transition-colors hover:text-foreground"
            >
              {product.category}
            </Link>

            <span className="text-muted-foreground/30">/</span>

            <span className="max-w-[220px] truncate text-foreground/60">
              {product.name}
            </span>
          </nav>

          {/* Mobile back */}

          <Link
            href={`/collections/${product.category}`}
            className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar
          </Link>

          {/* Brand marker */}

          <div className="ml-auto flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/40 sm:text-[9px]">
            TANOSI
            <span>✦</span>
            NUNCA TE CONFORMES
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT AREA
          ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-20">
          {/* =================================================
              PRODUCT MEDIA
              ================================================= */}

          <section className="min-w-0 lg:sticky lg:top-24">
            <div className="grid gap-3 sm:grid-cols-[76px_minmax(0,1fr)]">
              {/* Thumbnails */}

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
                        className={`group relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border bg-muted transition-all duration-300 sm:h-[72px] sm:w-[72px] ${
                          active
                            ? "border-foreground"
                            : "border-border opacity-55 hover:border-foreground/40 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} — imagem ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {active && (
                          <span className="pointer-events-none absolute inset-0 border-2 border-foreground/70" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Main image */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative order-1 overflow-hidden rounded-xl bg-muted sm:order-2"
              >
                <div className="relative aspect-[4/5] w-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${images[activeImage]}-${activeImage}`}
                      src={images[activeImage]}
                      alt={product.name}
                      initial={{
                        opacity: 0,
                        scale: 1.025,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                    />
                  </AnimatePresence>

                  {/* Subtle image gradient */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 opacity-60" />

                  {/* Product badge */}

                  {(product.isNewArrival || product.badge) && (
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.17em] text-white shadow-lg backdrop-blur-xl sm:text-[9px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        {product.badge || "Novidade"}
                      </span>
                    </div>
                  )}

                  {/* Image navigation */}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        aria-label="Imagem anterior"
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-100 backdrop-blur-md transition-all hover:bg-white hover:text-black sm:left-5 sm:h-10 sm:w-10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Imagem seguinte"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-100 backdrop-blur-md transition-all hover:bg-white hover:text-black sm:right-5 sm:h-10 sm:w-10"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Counter */}

                      <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 font-mono text-[8px] text-white backdrop-blur-md sm:bottom-5 sm:right-5 sm:text-[9px]">
                        {String(activeImage + 1).padStart(2, "0")} /{" "}
                        {String(images.length).padStart(2, "0")}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Mobile image indicators */}

            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeImage === index
                        ? "w-6 bg-foreground"
                        : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
            )}
          </section>

          {/* =================================================
              PRODUCT INFORMATION
              ================================================= */}

          <section className="min-w-0 lg:pt-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Category */}

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-foreground/30" />

                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground sm:text-[9px]">
                  {product.category}
                </span>
              </div>

              {/* Product title */}

              <h1 className="max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] font-black uppercase leading-[0.86] tracking-[-0.065em]">
                {product.name}
              </h1>

              {/* Price */}

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-xl font-bold tracking-tight sm:text-2xl">
                  MZN {formattedPrice} 
                </span>

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 sm:text-[9px]">
                  IVA incluído
                </span>
              </div>

              {/* Description */}

              <p className="mt-6 max-w-xl text-[13px] leading-7 text-muted-foreground sm:text-sm sm:leading-7">
                {product.description}
              </p>

              {/* Divider */}

              <div className="my-7 h-px bg-border sm:my-8" />

              {/* =================================================
                  SIZE
                  ================================================= */}

              {hasSizes && (
                <section className="mb-8">
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-[9px] font-black uppercase tracking-[0.2em] sm:text-[10px]">
                        Selecionar tamanho
                      </h2>

                      {selectedSize && (
                        <p className="mt-1.5 text-[10px] text-muted-foreground">
                          Selecionado:{" "}
                          <span className="font-bold text-foreground">
                            {selectedSize}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="shrink-0 text-[8px] font-bold uppercase tracking-[0.15em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground sm:text-[9px]"
                    >
                      Guia de tamanhos
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
                          className={`relative flex h-12 items-center justify-center rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all duration-200 sm:h-[52px] ${
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

              {/* =================================================
                  QUANTITY + CART
                  ================================================= */}

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Quantity */}

                <div className="flex h-14 w-full items-center justify-between rounded-full border border-border bg-background px-2 sm:w-[142px] sm:shrink-0">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-8 text-center text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Aumentar quantidade"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to cart */}

                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.985 }}
                  className="group flex h-14 min-w-0 flex-1 items-center justify-center gap-2.5 rounded-full bg-foreground px-5 text-[9px] font-black uppercase tracking-[0.14em] text-background shadow-xl transition-all duration-300 hover:bg-foreground/90 sm:gap-3 sm:px-6 sm:text-[10px]"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0" />

                  <span className="truncate">
                    Adicionar ao carrinho — MZN {formattedTotal} 
                  </span>

                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.button>
              </div>

              {/* =================================================
                  SECONDARY ACTIONS
                  ================================================= */}

              <div className="mt-5 flex items-center gap-5 border-b border-border pb-7">
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-pressed={isWishlisted}
                  className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:text-[9px]"
                >
                  <Heart
                    className={`h-4 w-4 transition-all duration-300 ${
                      isWishlisted
                        ? "fill-current text-foreground"
                        : "group-hover:scale-105"
                    }`}
                  />

                  {isWishlisted
                    ? "Guardado nos favoritos"
                    : "Adicionar aos favoritos"}
                </button>

                <span className="h-4 w-px bg-border" />

                <button
                  type="button"
                  onClick={handleShare}
                  className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:text-[9px]"
                >
                  <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                  Partilhar
                </button>
              </div>

              {/* =================================================
                  SERVICE PROMISES
                  ================================================= */}

              <div className="grid grid-cols-1 divide-y divide-border border-b border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex items-center gap-3 py-4 sm:flex-col sm:items-start sm:px-3 sm:py-5 first:sm:pl-0">
                  <Truck className="h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.16em]">
                      Envio
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                      Preparação cuidada
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4 sm:flex-col sm:items-start sm:px-3 sm:py-5">
                  <RotateCcw className="h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.16em]">
                      Devoluções
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                      Processo simples
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4 sm:flex-col sm:items-start sm:px-3 sm:py-5 last:sm:pr-0">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.16em]">
                      Compra segura
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                      Pagamento protegido
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PRODUCT DETAILS
                  ================================================= */}

              <div className="mt-2">
                {[
                  {
                    title: "Detalhes e ajuste",
                    content:
                      "Criado para acompanhar o movimento do dia a dia. Consulta o guia de tamanhos para encontrares o ajuste ideal. As imagens do produto podem apresentar pequenas diferenças devido à iluminação e às definições do ecrã.",
                  },
                  {
                    title: "Envios e devoluções",
                    content:
                      "Cada encomenda é cuidadosamente preparada antes do envio. Os prazos de entrega e as condições de devolução podem variar consoante a localização e o artigo adquirido.",
                  },
                  {
                    title: "A filosofia Tanosi",
                    content:
                      "Não sigas o caminho só porque todos o seguem. Cria o teu próprio. Tanosi existe para quem prefere construir a sua identidade, desafiar expectativas e vestir aquilo que realmente sente.",
                  },
                ].map((item) => (
                  <details
                    key={item.title}
                    className="group border-b border-border"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[9px] font-black uppercase tracking-[0.16em] marker:hidden sm:text-[10px]">
                      <span>{item.title}</span>

                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
                    </summary>

                    <div className="max-w-xl pb-5 pr-6 text-[11px] leading-6 text-muted-foreground sm:text-xs">
                      {item.content}
                    </div>
                  </details>
                ))}
              </div>

              {/* =================================================
                  MANIFESTO
                  ================================================= */}

              <div className="mt-7 flex flex-col gap-4 border border-border bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    TANOSI
                  </p>

                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em]">
                    Nunca te conformes ✦
                  </p>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/50 sm:text-right">
                  Veste aquilo que te representa.
                </span>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* =====================================================
          MOBILE STICKY CART
          ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-xl sm:hidden">
        <div className="flex gap-2">
          <div className="flex h-12 w-[100px] shrink-0 items-center justify-between rounded-full border border-border bg-background px-1">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground disabled:opacity-25"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="text-xs font-bold">{quantity}</span>

            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Aumentar quantidade"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-[9px] font-black uppercase tracking-[0.12em] text-background"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />

            <span className="truncate">
              Adicionar — MZN {formattedTotal} 
            </span>
          </motion.button>
        </div>
      </div>

      {/* Extra space for mobile sticky CTA */}

      <div className="h-20 sm:hidden" />
    </main>
  );
}