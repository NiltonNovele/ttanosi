import * as React from "react";
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
   * PRODUTOS
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
   * ORDENAÇÃO
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

  /*
   * A ordenação "Destaques" mantém sempre a ordem
   * original definida em mockProducts.
   */
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
   * TÍTULO
   * ============================================================
   */

  const title = formatCategoryTitle(category);

  /*
   * ============================================================
   * CONTADOR
   * ============================================================
   */

  const productLabel =
    products.length === 1
      ? "artigo"
      : "artigos";

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <header className="mb-10 border-b border-border pb-7 sm:mb-12 sm:pb-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* TITLE */}
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-foreground/30" />

                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Coleção / {category}
                </span>
              </div>

              <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black uppercase leading-[0.85] tracking-[-0.06em]">
                {title}
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                Explora a nossa seleção de{" "}
                <span className="font-semibold text-foreground">
                  {products.length} {productLabel}
                </span>{" "}
                nesta coleção.
              </p>
            </div>

            {/* FILTERS */}
            <div className="shrink-0">
              <CategoryFilters />
            </div>
          </div>

          {/* META */}
          <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-4">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
              {products.length}{" "}
              {products.length === 1
                ? "artigo disponível"
                : "artigos disponíveis"}
            </span>

            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
              Tanosi / 2026
            </span>
          </div>
        </header>

        {/* =====================================================
            PRODUCT GRID
            ===================================================== */}

        {products.length > 0 ? (
          <section aria-label={`Produtos da coleção ${title}`}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
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
            className="flex min-h-[45vh] flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-border" />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Coleção / Vazia
              </span>

              <span className="h-px w-6 bg-border" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl">
              Nenhum artigo
              <br />
              encontrado
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              De momento, não encontrámos artigos nesta
              coleção. Explora as restantes coleções para
              descobrires mais peças.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
