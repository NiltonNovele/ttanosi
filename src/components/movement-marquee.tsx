"use client";

import React from "react";

export function MovementMarquee() {
  const text = "STAY WEIRD, MAKE ART, CONFUSE PEOPLE AND LET GOD DO THE REST.";
  const repeatedText = Array(15).fill(text).join("                  ✦                  ");

  return (
    <div className="relative w-full overflow-hidden bg-foreground py-5 mt-24 mb-0 border-t border-white/10">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-xs md:text-sm font-black text-background/80 uppercase tracking-[0.4em] inline-block px-12 leading-none">
          {repeatedText}
        </span>
        <span className="text-xs md:text-sm font-black text-background/80 uppercase tracking-[0.4em] inline-block px-12 leading-none">
          {repeatedText}
        </span>
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
      `}</style>
    </div>
  );
}