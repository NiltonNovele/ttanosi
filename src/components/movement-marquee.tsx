
"use client";

import React from "react";

export function MovementMarquee() {
  const text = "STAY WEIRD, MAKE ART, CONFUSE PEOPLE AND LET GOD DO THE REST.";
  const repeatedText = Array(15)
    .fill(text)
    .join("                    ✦                    ");

  return (
    <div className="relative mt-24 mb-0 w-full overflow-hidden border-y border-zinc-200 bg-white py-5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[0, 1].map((item) => (
          <span
            key={item}
            className="inline-block px-12 text-xs font-black uppercase tracking-[0.3em] text-black/80 leading-none md:text-sm"
          >
            {repeatedText}
          </span>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
