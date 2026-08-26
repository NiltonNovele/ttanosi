import * as React from "react";
import { getProductsByCategory, mockProducts } from "@/lib/data";
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
            category as Parameters<typeof getProductsByCategory>[0]
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

  /*
   * Featured should always follow the original product
   * order defined inside mockProducts.
   */
  if (sort === "featured") {
    const originalOrder = new Map(
      mockProducts.map((product, index) => [product.id, index])
    );

    products.sort(
      (a, b) =>
        (originalOrder.get(a.id) ?? Infinity) -
        (originalOrder.get(b.id) ?? Infinity)
    );
  }

  /*
   * ============================================================
   * PAGE TITLE
   * ============================================================
   */

  const title =
    category === "all"
      ? "All Collections"
      : category
          .split("-")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ");

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <main className="min-h-[80vh]">
      <div
        className="
          container mx-auto max-w-7xl
          px-4
          pt-28 pb-16
          sm:px-6 sm:pt-28
          md:pt-24
          lg:px-8 lg:pt-24
        "
      >
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Collection / {category}
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl md:text-6xl">
              {title}
            </h1>

            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Explore {products.length}{" "}
              {products.length === 1 ? "item" : "items"} in this
              collection.
            </p>
          </div>

          <CategoryFilters />
        </div>

        {/* =====================================================
            PRODUCT GRID
            ===================================================== */}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* ===================================================
             EMPTY STATE
             =================================================== */

          <div className="flex min-h-[40vh] flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
              Collection / Empty
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              No Items Found
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn&apos;t find any products in this collection.
              Try exploring another collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}