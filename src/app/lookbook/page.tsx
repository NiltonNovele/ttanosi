
"use client";

import Image from "next/image";

type LookbookItem = {
  id: number;
  src: string;
  alt: string;
};

// Adiciona aqui as imagens das T-shirts
const tshirtImages: LookbookItem[] = [
  { id: 1, src: "/lookbook/shirt/1.png", alt: "T-shirt 1" },
  { id: 2, src: "/lookbook/shirt/2.png", alt: "T-shirt 2" },
  { id: 3, src: "/lookbook/shirt/3.png", alt: "T-shirt 3" },
  { id: 4, src: "/lookbook/shirt/4.png", alt: "T-shirt 4" },
  { id: 5, src: "/lookbook/shirt/5.png", alt: "T-shirt 5" },
  { id: 6, src: "/lookbook/shirt/6.png", alt: "T-shirt 6" },
  { id: 7, src: "/lookbook/shirt/7.png", alt: "T-shirt 7" },
  { id: 8, src: "/lookbook/shirt/8.png", alt: "T-shirt 8" },
  { id: 9, src: "/lookbook/shirt/9.png", alt: "T-shirt 9" },
  { id: 10, src: "/lookbook/shirt/10.png", alt: "T-shirt 10" },
  { id: 11, src: "/lookbook/shirt/11.png", alt: "T-shirt 11" },
  { id: 12, src: "/lookbook/shirt/12.png", alt: "T-shirt 12" },
];

// Adiciona aqui as imagens dos bonés
const capImages: LookbookItem[] = [
  { id: 1, src: "/lookbook/caps/1.jpeg", alt: "Boné 1" },
  { id: 2, src: "/lookbook/caps/2.jpeg", alt: "Boné 2" },
  { id: 3, src: "/lookbook/caps/3.jpeg", alt: "Boné 3" },
  { id: 4, src: "/lookbook/caps/4.jpeg", alt: "Boné 4" },
  { id: 5, src: "/lookbook/caps/5.jpeg", alt: "Boné 5" },
  { id: 6, src: "/lookbook/caps/6.jpeg", alt: "Boné 6" },
  { id: 7, src: "/lookbook/caps/7.jpg", alt: "Boné 7" },
  { id: 8, src: "/lookbook/caps/8.jpg", alt: "Boné 8" },
  { id: 9, src: "/lookbook/caps/9.jpg", alt: "Boné 9" },
];

// Adiciona aqui as imagens dos gorros
const skulliesImages: LookbookItem[] = [
  { id: 1, src: "/lookbook/gorro/1.png", alt: "Gorro 1" },
  { id: 2, src: "/lookbook/gorro/2.png", alt: "Gorro 2" },
  { id: 2, src: "/lookbook/gorro/3.png", alt: "Gorro 2" },
];

const collections = [
  {
    id: "t-shirts",
    number: "01",
    title: "T-shirts",
    description: "Os essenciais. Criados para se destacarem.",
    images: tshirtImages,
  },
  {
    id: "caps",
    number: "02",
    title: "Bonés",
    description: "Uma nova perspectiva sobre o estilo do dia a dia.",
    images: capImages,
  },
  {
    id: "skullies",
    number: "03",
    title: "Gorros",
    description: "O toque final. Uma expressão de individualidade.",
    images: skulliesImages,
  },
];

function CollectionSection({
  collection,
}: {
  collection: (typeof collections)[number];
}) {
  return (
    <section id={collection.id} className="scroll-mt-28">
      <div className="mb-7 flex items-end justify-between border-b border-black/10 pb-4">
        <div>
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Colecção {collection.number}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            {collection.title}
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            {collection.description}
          </p>
        </div>

        <span className="hidden text-xs uppercase tracking-widest text-neutral-400 sm:block">
          {String(collection.images.length).padStart(2, "0")} Peças
        </span>
      </div>

      {collection.images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {collection.images.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex aspect-[3/4] items-center justify-center bg-neutral-100"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-300">
                Imagem {String(item).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Destaque inicial */}
      <section className="px-5 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <span className="mb-5 block text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
            Tanosi — Colecções
          </span>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              O
              <br />
              Lookbook<span className="text-neutral-300">.</span>
            </h1>

            <p className="max-w-xs text-sm leading-6 text-neutral-500 md:pb-2">
              Explora as nossas colecções. Uma selecção de peças, detalhes e
              essenciais do dia a dia da Tanosi.
            </p>
          </div>

          {/* Navegação por categorias */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-5">
            {collections.map((collection) => (
              <a
                key={collection.id}
                href={`#${collection.id}`}
                className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-black"
              >
                {collection.title}
                <span className="ml-2 text-neutral-300">
                  {collection.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Colecções */}
      <div className="mx-auto max-w-[1600px] space-y-20 px-5 pb-24 sm:space-y-28 sm:px-10 lg:px-16">
        {collections.map((collection) => (
          <CollectionSection
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    </main>
  );
}
