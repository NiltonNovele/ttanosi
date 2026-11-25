
"use client";

import { useEffect, useState } from "react";

const showcaseImages = [
  "/showcase/1.png",
  "/showcase/2.png",
  "/showcase/3.png",
  "/showcase/4.png",
  "/showcase/5.png",
  "/showcase/6.png",
  "/showcase/7.png",
  "/showcase/8.png",
  "/showcase/9.png",
  "/showcase/10.png",
  "/showcase/11.png",
  "/showcase/12.png",
  "/showcase/13.png",
  "/showcase/14.png",
  "/showcase/15.png",
   "/showcase/16.png",
  "/showcase/17.png",
  "/showcase/18.png",
  "/showcase/19.png",
];

export function CategoryShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the images to create a seamless infinite track.
  const images = [...showcaseImages, ...showcaseImages];

  return (
    <section
      aria-label="TANOSI image showcase"
      className="relative w-full overflow-hidden bg-[#fafafa] py-8 sm:py-10 md:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex w-max items-center gap-3 sm:gap-4 md:gap-5 ${
            isPaused ? "pause-showcase" : "animate-showcase"
          }`}
        >
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative h-[190px] w-[135px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-[250px] sm:w-[175px] sm:rounded-2xl md:h-[310px] md:w-[220px] lg:h-[350px] lg:w-[250px]"
            >
              <img
                src={src}
                alt={`TANOSI showcase ${((index % showcaseImages.length) + 1)}`}
                draggable={false}
                loading={index < showcaseImages.length ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-showcase {
          animation: showcase-scroll 65s linear infinite;
          will-change: transform;
        }

        .pause-showcase {
          animation-play-state: paused;
        }

        @keyframes showcase-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-showcase {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
