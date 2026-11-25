
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const DATA = [
  {
    id: 0,
    collection: "TANOSI CORE",
    title: "T-SHIRT",
    title2: "ESSENTIAL",
    description:
      "A base de qualquer guarda-roupa. Uma T-shirt oversized em algodão premium, com uma silhueta descontraída, ombros descaídos e uma presença minimalista. Simples na forma. Forte na identidade.",
    image: "/lookbook/shirt/2.png",
    tag: "01",
    type: "T-SHIRT",
  },
  {
    id: 1,
    collection: "SIGNAL SERIES",
    title: "T-SHIRT",
    title2: "SIGNAL",
    description:
      "Uma peça que transforma o essencial numa declaração. Corte oversized, construção robusta e identidade gráfica marcante, criada para quem não precisa de seguir tendências para definir o seu estilo.",
    image: "/lookbook/shirt/3.png",
    tag: "02",
    type: "T-SHIRT",
  },
  {
    id: 2,
    collection: "TANOSI HEADWEAR",
    title: "BONÉ",
    title2: "Vermelho",
    description:
      "Um clássico reinterpretado. Boné de inspiração trucker, com painel frontal marcante e construção confortável. Um essencial de streetwear que acrescenta personalidade a qualquer combinação.",
    image: "/lookbook/caps/7.jpg",
    tag: "03",
    type: "BONÉ",
  },
  {
    id: 3,
    collection: "TANOSI HEADWEAR",
    title: "BONÉ",
    title2: "Azul",
    description:
      "Um clássico reinterpretado. Boné de inspiração trucker, com painel frontal marcante e construção confortável. Um essencial de streetwear que acrescenta personalidade a qualquer combinação.",
    image: "/lookbook/caps/8.jpg",
    tag: "04",
    type: "T-SHIRT",
  },
  {
    id: 4,
    collection: "Archive",
    title: "T-SHIRT",
    title2: "Azul",
    description:
      "Uma peça que transforma o essencial numa declaração. Corte oversized, construção robusta e identidade gráfica marcante, criada para quem não precisa de seguir tendências para definir o seu estilo.",
    image: "/lookbook/shirt/4.png",
    tag: "05",
    type: "BONÉ FITTED",
  },
  {
    id: 5,
    collection: "MOVEMENT SERIES",
    title: "T-SHIRT",
    title2: "MOVEMENT",
    description:
      "Criada para acompanhar o movimento. Corte amplo, tecido de presença e uma linguagem visual que representa a energia da cultura urbana. Mais do que uma peça básica, uma expressão de identidade.",
    image: "/lookbook/shirt/5.png",
    tag: "06",
    type: "T-SHIRT",
  },
  {
    id: 6,
    collection: "TANOSI HEADWEAR",
    title: "SKULLIE",
    title2: "ARCHIVE",
    description:
      "Conforto essencial com uma atitude discreta. Um skullie de inspiração urbana, pensado para um ajuste confortável e uma estética simples que funciona em qualquer estação.",
    image: "/lookbook/shirt/6.png",
    tag: "07",
    type: "SKULLIE",
  },
  {
    id: 7,
    collection: "FITTED SERIES",
    title: "BONÉ",
    title2: "FITTED 02",
    description:
      "Uma segunda interpretação da linha fitted. Construção estruturada, perfil definido e uma estética limpa que equilibra o carácter clássico do boné com a identidade Tanosi.",
    image: "/lookbook/shirt/7.png",
    tag: "08",
    type: "BONÉ FITTED",
  },
  {
    id: 8,
    collection: "TANOSI CORE",
    title: "T-SHIRT",
    title2: "BLACK",
    description:
      "Preto. Sem excessos. Uma T-shirt oversized com uma silhueta descontraída e uma presença intemporal. Concebida para combinar com tudo e destacar-se sem precisar de chamar a atenção.",
    image: "/lookbook/shirt/8.png",
    tag: "09",
    type: "T-SHIRT",
  },
];

const FIRST_PHASE_LIMIT = 30;

interface GlobeHeroProps {
  purchasesCount?: number;
}

export function GlobeHero({
  purchasesCount = 6,
}: GlobeHeroProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const activeProduct = DATA[activeIndex];

  const completedPurchases = Math.min(
    Math.max(purchasesCount, 0),
    FIRST_PHASE_LIMIT
  );

  const remainingPurchases =
    FIRST_PHASE_LIMIT - completedPurchases;

  const progress =
    (completedPurchases / FIRST_PHASE_LIMIT) * 100;

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex((index + DATA.length) % DATA.length);
  }, []);

  const nextSlide = React.useCallback(() => {
    setActiveIndex((current) => (current + 1) % DATA.length);
  }, []);

  const previousSlide = React.useCallback(() => {
    setActiveIndex((current) => (
      current - 1 + DATA.length
    ) % DATA.length);
  }, []);

  React.useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % DATA.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  React.useEffect(() => {
    DATA.forEach((product) => {
      const image = new Image();
      image.src = product.image;
    });
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) return;

    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const deltaX =
      event.changedTouches[0].clientX - touchStartX.current;

    const deltaY =
      event.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (
      Math.abs(deltaX) < 45 ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) nextSlide();
    else previousSlide();
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white pt-20 text-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Announcement bar */}
      <div className="relative z-20 flex min-h-9 items-center justify-center gap-2 bg-black px-3 py-2 text-center text-[8px] font-bold uppercase tracking-[0.15em] text-white sm:text-[9px] sm:tracking-[0.2em]">
        <Sparkles className="h-3 w-3 shrink-0 text-zinc-400" />

        <span>Pré-encomendas abertas</span>
        <span className="text-zinc-500">·</span>

        <span className="text-zinc-300">
          Primeira fase limitada a 30 compras
        </span>
      </div>

      {/* Main hero */}
      <div className="mx-auto flex min-h-0 max-w-[1600px] flex-col px-4 pb-7 pt-5 sm:px-7 sm:pb-9 sm:pt-7 lg:min-h-[calc(100svh-36px)] lg:justify-center lg:px-12 lg:py-6 xl:px-16">

        {/* Main content */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:gap-14">

          {/* Product information */}
          <div className="order-2 flex min-w-0 flex-col lg:order-1">

            <div className="mb-3 flex items-center gap-3 lg:mb-4">
              <span className="h-px w-7 bg-black" />

              <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-zinc-500">
                {activeProduct.collection}
              </span>
            </div>

            <div
              key={activeProduct.id}
              className="animate-[fadeUp_.5s_ease_both]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                {activeProduct.type}
              </p>

              <h2 className="mt-2 text-[13vw] font-black uppercase leading-[0.78] tracking-[-0.09em] sm:text-7xl md:text-8xl lg:text-[5.2vw] xl:text-[82px] 2xl:text-[94px]">
                {activeProduct.title}

                <span className="mt-2 block text-zinc-300">
                  {activeProduct.title2}
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-[11px] leading-5 text-zinc-500 sm:text-xs sm:leading-6 lg:mt-5">
                {activeProduct.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-6">
              <Link
                href="/collections/all"
                className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-black px-6 text-[9px] font-bold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98]"
              >
                Explorar colecção

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <span className="text-center text-[8px] font-medium uppercase tracking-[0.15em] text-zinc-400 sm:text-left">
                Reserva a tua peça
              </span>
            </div>

            {/* First phase counter */}
            <div className="mt-7 max-w-sm border-t border-zinc-200 pt-4 lg:mt-8">

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />

                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Primeira fase
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-bold uppercase tracking-tight">
                    As primeiras 30 compras
                  </p>

                  <p className="mt-1 text-[9px] text-zinc-400">
                    Lugares limitados nesta primeira fase.
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="block text-2xl font-black tracking-[-0.07em] tabular-nums">
                    {String(remainingPurchases).padStart(2, "0")}
                  </span>

                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                    Restantes
                  </span>
                </div>
              </div>

              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-black transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[8px] font-medium uppercase tracking-wider text-zinc-400">
                  {completedPurchases} compras realizadas
                </span>

                <span className="text-[8px] font-medium uppercase tracking-wider text-zinc-400">
                  {FIRST_PHASE_LIMIT} lugares
                </span>
              </div>

              {remainingPurchases === 0 && (
                <p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-black">
                  Primeira fase esgotada.
                </p>
              )}
            </div>
          </div>

          {/* Product image */}
          <div className="order-1 min-w-0 lg:order-2">

            <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">

              {/* Image frame */}
              <div className="group relative aspect-[5/4.5] w-full overflow-hidden bg-zinc-100 sm:aspect-[5/4] lg:aspect-[1.12/1] lg:max-h-[min(64vh,590px)]">

                {DATA.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? "scale-100 opacity-100"
                        : "scale-[1.03] opacity-0"
                    }`}
                    aria-hidden={index !== activeIndex}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={`${product.title} ${product.title2} - TANOSI`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                {/* Top labels */}
                <div className="absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] text-black backdrop-blur-md sm:text-[8px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    Pré-encomenda
                  </span>
                </div>

                <div className="absolute right-3 top-3 z-10 font-mono text-[9px] tracking-[0.15em] text-white sm:right-5 sm:top-5">
                  {activeProduct.tag}
                  <span className="mx-1 text-white/50">/</span>
                  {String(DATA.length).padStart(2, "0")}
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-3 left-3 z-10 sm:bottom-5 sm:left-5">
                  <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/70 sm:text-[8px]">
                    TANOSI ARCHIVE
                  </p>

                  <p className="mt-1 text-lg font-black uppercase tracking-[-0.05em] text-white sm:text-2xl">
                    {activeProduct.title2}
                  </p>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 sm:bottom-5 sm:right-5">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Produto anterior"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-90"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Produto seguinte"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-90"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-3 flex items-center justify-between gap-3">

                <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
                  {DATA.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Ver produto ${index + 1}`}
                      aria-pressed={index === activeIndex}
                      className={`relative h-11 w-9 shrink-0 overflow-hidden border transition-all duration-300 sm:h-12 sm:w-10 ${
                        index === activeIndex
                          ? "border-black opacity-100"
                          : "border-zinc-200 opacity-45 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <span className="hidden shrink-0 font-mono text-[9px] tracking-[0.15em] text-zinc-400 sm:block">
                  {String(activeIndex + 1).padStart(2, "0")} — 09
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-4 sm:mt-9 sm:grid-cols-3 sm:gap-6 lg:mt-5 lg:pt-4">

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-black">
              Pré-encomenda
            </p>

            <p className="mt-1 text-[8px] text-zinc-400 sm:text-[9px]">
              Reserva antes da disponibilidade geral.
            </p>
          </div>

          <div className="border-l border-zinc-200 pl-3 sm:pl-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-black">
              Edição limitada
            </p>

            <p className="mt-1 text-[8px] text-zinc-400 sm:text-[9px]">
              Primeira fase com apenas 30 compras.
            </p>
          </div>

          <div className="col-span-2 border-t border-zinc-200 pt-3 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-black">
              TANOSI
            </p>

            <p className="mt-1 text-[8px] text-zinc-400 sm:text-[9px]">
              Stay Weird. Make Art.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
