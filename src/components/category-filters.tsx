"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export function CategoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "featured";

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sortValue = e.target.value;
      const params = new URLSearchParams(searchParams.toString());

      if (sortValue === "featured") {
        params.delete("sort");
      } else {
        params.set("sort", sortValue);
      }

      const query = params.toString();

      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="mt-6 flex items-center justify-end md:mt-0">
      <div className="flex items-center gap-2">
        {/* Filter indicator */}
        <div className="hidden items-center gap-2 text-white/30 sm:flex">
          <SlidersHorizontal
            className="h-3.5 w-3.5"
            strokeWidth={1.7}
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
            Sort
          </span>
        </div>

        {/* Select */}
        <div className="group relative">
          <select
            aria-label="Sort products"
            value={currentSort}
            onChange={handleSortChange}
            className="
              h-10
              min-w-[175px]
              appearance-none
              rounded-lg
              border
              border-white/[0.10]
              bg-[#0d0d0f]
              px-3
              pr-10
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/65
              outline-none
              transition-all
              duration-300
              hover:border-white/[0.22]
              hover:text-white
              focus:border-white/[0.30]
              focus:ring-1
              focus:ring-white/[0.12]
            "
          >
            <option value="featured">Featured</option>
            <option value="latest">Latest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Custom arrow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-white/35
              transition-colors
              duration-300
              group-hover:text-white/70
            "
          >
            <ChevronDown
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />
          </div>

          {/* Subtle chrome highlight */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-3
              right-3
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
              opacity-60
            "
          />
        </div>
      </div>
    </div>
  );
}