"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 40 }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-foreground text-background py-4 flex whitespace-nowrap border-y border-border">
      <motion.div
        className="flex space-x-8 lg:space-x-16 px-4"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {/* We repeat the array a few times to ensure seamless looping */}
        {[...items, ...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-lg md:text-xl font-black uppercase tracking-widest inline-flex items-center"
          >
            {item}
            <span className="mx-8 text-primary">✽</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
