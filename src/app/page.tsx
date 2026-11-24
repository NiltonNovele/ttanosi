"use client";

import React from "react";
import { GlobeHero } from "@/components/landing/GlobeHero";
import { ProductSection } from "@/components/product-section";
import { MovementMarquee } from "@/components/movement-marquee";
import { CategoryShowcase } from "@/components/category-showcase";

export default function Home() {
  return (
    <div className="min-h-screen">
      <GlobeHero />
      <ProductSection 
        title="CURATED DROPS"
        category="trending" 
        viewAllLink="/collections/trending"
      />
      <MovementMarquee />
    </div>
  );
}
