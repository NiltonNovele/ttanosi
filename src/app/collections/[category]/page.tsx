
import * as React from "react";
import Link from "next/link";
import {
  getProductsByCategory,
  mockProducts,
} from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { CategoryFilters } from "@/components/category-filters";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

/**
 * Converte o slug da categoria para um título
 * apresentado em português de Portugal.
 */
function formatCategoryTitle(category: string) {
  const categoryNames: Record<string, string> = {
    all: "Todas as coleções",
    mens: "Homem",
    womens: "Mulher",
    trending: "Tendências",
    accessories: "Acessórios",
    looks: "Visuais",
  };

  if (categoryNames[category]) {
    return categoryNames[category];
  }

  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const sort = resolvedSearchParams?.sort || "featured";

  /*
   * ============================================================
   * PRODUCTS
   * ============================================================
   */

  const products =
    category === "all"
      ? [...mockProducts]
      : [
          ...getProductsByCategory(
            category as Parameters<
              typeof getProductsByCategory
            >[0]
          ),
        ];

  /*
   * ============================================================
   * SORTING
   * ============================================================
   */

  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  }

  if (sort === "latest") {
    products.sort((a, b) => {
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
      return 0;
    });
  }

  if (sort === "featured") {
    const originalOrder = new Map(
      mockProducts.map((product, index) => [
        product.id,
        index,
      ])
    );

    products.sort(
      (a, b) =>
        (originalOrder.get(a.id) ?? Infinity) -
        (originalOrder.get(b.id) ?? Infinity)
    );
  }

  /*
   * ============================================================
   * PAGE DATA
   * ============================================================
   */

  const title = formatCategoryTitle(category);

  const productLabel =
    products.length === 1 ? "artigo" : "artigos";

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-28">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <nav
          aria-label="Navegação estrutural"
          className="mb-10 flex items-center gap-2 border-b border-zinc-200 pb-5 text-[8px] font-medium uppercase tracking-[0.2em] text-zinc-400 sm:mb-14 sm:text-[9px]"
        >
          <Link
            href="/"
            className="transition-colors hover:text-black"
          >
            Início
          </Link>

          <span className="text-zinc-300">/</span>

          <Link
            href="/collections"
            className="transition-colors hover:text-black"
          >
            Coleções
          </Link>

          <span className="text-zinc-300">/</span>

          <span className="font-bold text-black">
            {title}
          </span>
        </nav>

        {/* =====================================================
            COLLECTION HEADER
        ===================================================== */}

        <header className="mb-10 sm:mb-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* TITLE */}

            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-black" />

                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                  TANOSI / PRODUCT ARCHIVE
                </span>
              </div>

              <h1 className="max-w-4xl text-[clamp(3.2rem,9vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
                {title}
              </h1>

              <p className="mt-6 max-w-md text-[12px] leading-6 text-zinc-500 sm:text-sm">
                Descobre a nossa seleção de peças,
                pensadas para acompanhar o teu movimento.
              </p>
            </div>

            {/* FILTERS */}

            <div className="w-full lg:w-auto lg:min-w-[220px]">
              <CategoryFilters />
            </div>
          </div>

          {/* COLLECTION META */}

          <div className="mt-9 flex items-center justify-between border-y border-zinc-200 py-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />

              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-[9px]">
                {products.length}{" "}
                {products.length === 1
                  ? "artigo disponível"
                  : "artigos disponíveis"}
              </span>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[9px]">
              Coleção / 2026
            </span>
          </div>
        </header>

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        {products.length > 0 ? (
          <section aria-label={`Produtos da coleção ${title}`}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* ===================================================
             EMPTY STATE
          =================================================== */

          <section
            aria-label="Coleção sem produtos"
            className="flex min-h-[45vh] flex-col items-center justify-center border-y border-zinc-200 px-5 py-24 text-center"
          >
            <span className="mb-8 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              00 / Sem resultados
            </span>

            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.85] tracking-[-0.07em]">
              Nada por
              <br />
              aqui.
            </h2>

            <p className="mt-6 max-w-sm text-xs leading-6 text-zinc-500 sm:text-sm">
              De momento, não existem artigos nesta
              coleção. Explora outras categorias e
              descobre a próxima peça que te representa.
            </p>

            <Link
              href="/collections"
              className="group mt-9 inline-flex h-12 items-center gap-4 bg-black px-6 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-zinc-800"
            >
              Explorar coleções

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </section>
        )}

        {/* =====================================================
            BOTTOM SIGNATURE
        ===================================================== */}

        {products.length > 0 && (
          <div className="mt-16 flex items-center justify-between border-t border-zinc-200 pt-5 sm:mt-20">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400">
              TANOSI — NUNCA TE CONFORMES
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400">
              FICA DIFERENTE.
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
