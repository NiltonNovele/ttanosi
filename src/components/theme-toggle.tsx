"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void
  ) => {
    ready: Promise<void>;
  };
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;

    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    const doc = document as ViewTransitionDocument;

    /* =========================================================
       Fallback for browsers without View Transitions
       ========================================================= */

    if (!doc.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    /* =========================================================
       CLICK POSITION
       ========================================================= */

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    /* =========================================================
       VIEW TRANSITION
       ========================================================= */

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      /*
       * Light → Dark
       * Chrome/darkness expands from the toggle.
       */

      if (!isDark) {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        return;
      }

      /*
       * Dark → Light
       * Clean diagonal chrome wipe.
       */

      document.documentElement.animate(
        {
          clipPath: [
            "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            "polygon(100% 0%, 100% 100%, 0% 100%, 0% 100%)",
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  /* =========================================================
     SSR / HYDRATION STATE
     ========================================================= */

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="
          relative
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          overflow-hidden
          rounded-md
          border
          border-foreground/10
          bg-transparent
          text-foreground/50
          transition-all
          duration-300
          hover:border-foreground/20
          hover:bg-foreground/[0.05]
          hover:text-foreground
        "
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        group
        relative
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        overflow-hidden
        rounded-md
        border
        border-foreground/10
        bg-transparent
        text-foreground/50
        transition-all
        duration-300
        hover:border-foreground/20
        hover:bg-foreground/[0.05]
        hover:text-foreground
        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-foreground/40
      "
    >
      {/* =====================================================
          SUBTLE HOVER GLOW
          ===================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.06]
          via-transparent
          to-white/[0.02]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* =====================================================
          ICON
          ===================================================== */}

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              text-[#c9c9c9]
              transition-colors
              duration-300
              group-hover:text-white
            "
          >
            <Sun className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              text-[#2b2b2e]
              transition-colors
              duration-300
              group-hover:text-[#0d0d0f]
            "
          >
            <Moon className="h-[16px] w-[16px]" strokeWidth={1.8} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SCREEN READER LABEL
          ===================================================== */}

      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}