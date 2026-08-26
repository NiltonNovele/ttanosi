"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      closeButton
      richColors={false}
      toastOptions={{
        duration: 4000,

        classNames: {
          /* =====================================================
             TOAST
             ===================================================== */

          toast: [
            "group-[.toaster]:bg-[#111113]",
            "group-[.toaster]:text-[#f5f5f5]",
            "group-[.toaster]:border",
            "group-[.toaster]:border-white/[0.12]",
            "group-[.toaster]:rounded-xl",
            "group-[.toaster]:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            "group-[.toaster]:backdrop-blur-xl",
            "group-[.toaster]:relative",
            "group-[.toaster]:overflow-hidden",
          ].join(" "),

          /* =====================================================
             TITLE
             ===================================================== */

          title: [
            "group-[.toast]:font-semibold",
            "group-[.toast]:text-sm",
            "group-[.toast]:tracking-[-0.01em]",
            "group-[.toast]:text-white",
          ].join(" "),

          /* =====================================================
             DESCRIPTION
             ===================================================== */

          description: [
            "group-[.toast]:mt-1",
            "group-[.toast]:text-xs",
            "group-[.toast]:leading-relaxed",
            "group-[.toast]:text-[#8a8a8e]",
          ].join(" "),

          /* =====================================================
             ACTION
             ===================================================== */

          actionButton: [
            "group-[.toast]:rounded-md",
            "group-[.toast]:border",
            "group-[.toast]:border-white/20",
            "group-[.toast]:bg-white",
            "group-[.toast]:px-3",
            "group-[.toast]:py-1.5",
            "group-[.toast]:text-[11px]",
            "group-[.toast]:font-bold",
            "group-[.toast]:uppercase",
            "group-[.toast]:tracking-[0.08em]",
            "group-[.toast]:text-[#0d0d0f]",
            "group-[.toast]:transition-all",
            "group-[.toast]:duration-200",
            "hover:group-[.toast]:bg-[#c9c9c9]",
          ].join(" "),

          /* =====================================================
             CANCEL
             ===================================================== */

          cancelButton: [
            "group-[.toast]:rounded-md",
            "group-[.toast]:bg-white/[0.06]",
            "group-[.toast]:px-3",
            "group-[.toast]:py-1.5",
            "group-[.toast]:text-[11px]",
            "group-[.toast]:font-medium",
            "group-[.toast]:text-[#8a8a8e]",
            "group-[.toast]:transition-colors",
            "group-[.toast]:duration-200",
            "hover:group-[.toast]:bg-white/[0.1]",
            "hover:group-[.toast]:text-white",
          ].join(" "),

          /* =====================================================
             CLOSE BUTTON
             ===================================================== */

          closeButton: [
            "group-[.toast]:border-white/10",
            "group-[.toast]:bg-white/[0.04]",
            "group-[.toast]:text-[#8a8a8e]",
            "group-[.toast]:transition-all",
            "group-[.toast]:duration-200",
            "hover:group-[.toast]:border-white/20",
            "hover:group-[.toast]:bg-white/[0.08]",
            "hover:group-[.toast]:text-white",
          ].join(" "),

          /* =====================================================
             ICONS
             ===================================================== */

          success: [
            "group-[.toaster]:border-white/[0.15]",
          ].join(" "),

          error: [
            "group-[.toaster]:border-[#a8442e]/40",
          ].join(" "),

          warning: [
            "group-[.toaster]:border-[#d8c9a8]/30",
          ].join(" "),

          info: [
            "group-[.toaster]:border-[#8b8593]/30",
          ].join(" "),

          loading: [
            "group-[.toaster]:border-white/[0.12]",
          ].join(" "),
        },
      }}
      {...props}
    />
  );
}