
"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  MessageCircle,
  Music2,
  ArrowUpRight,
} from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ttanosi/",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ttanosi_?_r=1&_t=ZS-9BhvyXaf1e9",
    icon: Music2,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/845558193",
    icon: MessageCircle,
  },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Acessórios", href: "/collections/accessories" },
  { label: "LookBook", href: "/lookbook" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 md:py-14">

        {/* Main footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Página inicial da Ttanosi"
            >
              <div className="h-10 w-14 overflow-hidden border border-zinc-200 bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Logótipo da Ttanosi"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div>
                <span className="block text-base font-black uppercase tracking-[-0.04em]">
                  tanosi
                </span>
                <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  Why not?
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-zinc-500">
              Why not you?
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-wrap gap-x-7 gap-y-4"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 transition-colors duration-300 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400">
            © {currentYear} TANOSI. Todos os direitos reservados.
          </p>

          <a
            href="https://synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-black"
          >
            Desenvolvido pela
            <span className="font-bold text-zinc-600 transition-colors group-hover:text-black">
              SyncTechX
            </span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
