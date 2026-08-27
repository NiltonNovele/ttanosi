"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  MessageCircle,
  Music2,
} from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ttanosi/",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@YOUR_TIKTOK",
    icon: Music2,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/YOUR_NUMBER",
    icon: MessageCircle,
  },
];

const footerLinks = [
  { label: "Homens", href: "/collections/mens" },
  { label: "Acessórios", href: "/collections/accessories" },
  { label: "Mulheres", href: "/collections/womens" },
  { label: "Hot", href: "/collections/trending" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#0d0d0f] text-white">
      {/* =====================================================
          AMBIENTE / BRILHO SUTIL
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-white/[0.025]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-72
          w-72
          rounded-full
          bg-[#6b4c7a]/[0.025]
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          py-8
          sm:px-6
          md:px-10
          md:py-10
        "
      >
        {/* =====================================================
            FOOTER PRINCIPAL
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* ===================================================
              MARCA
          =================================================== */}

          <div className="min-w-0">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Página inicial da Ttanosi"
            >
              {/* Logo */}

              <div
                className="
                  relative
                  h-10
                  w-14
                  shrink-0
                  overflow-hidden
                  border
                  border-white/15
                  bg-white/[0.03]
                  transition-all
                  duration-300
                  group-hover:border-white/40
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="Logótipo da Ttanosi"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/10
                    via-transparent
                    to-black/20
                  "
                />
              </div>

              {/* Nome */}

              <div>
                <div
                  className="
                    text-base
                    font-black
                    uppercase
                    tracking-[-0.04em]
                  "
                >
                  tanosi
                </div>

                <div
                  className="
                    mt-0.5
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.35em]
                    text-white/40
                  "
                >
                  Stay Weird
                </div>
              </div>
            </Link>

            <p
              className="
                mt-3
                max-w-xs
                text-xs
                leading-5
                text-white/35
              "
            >
              Mantém-te estranho, cria arte, confunde as pessoas
              e deixa Deus tratar do resto.
            </p>
          </div>

          {/* ===================================================
              NAVEGAÇÃO
          =================================================== */}

          <nav
            aria-label="Navegação do rodapé"
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
              md:justify-end
            "
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white/45
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                {link.label}

                <ArrowUpRight
                  className="
                    h-2.5
                    w-2.5
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/70
                  "
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* =====================================================
            STAY WEIRD BAR
        ===================================================== */}

        <div
          className="
            mt-7
            flex
            items-center
            gap-4
            border-y
            border-white/[0.06]
            py-4
          "
        >
          <span className="h-px w-6 shrink-0 bg-white/30" />

          <span
            className="
              chrome-text
              text-sm
              font-black
              uppercase
              tracking-[0.08em]
              sm:text-base
            "
          >
            Stay Weird
          </span>

          <span className="text-xs text-white/20">
            ✦
          </span>

          <span
            className="
              hidden
              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-white/20
              sm:block
            "
          >
            Nunca te acomodes
          </span>

          <span
            className="
              ml-auto
              font-mono
              text-[8px]
              text-white/20
            "
          >
            TTN / 01
          </span>
        </div>

        {/* =====================================================
            PARTE INFERIOR
        ===================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* ===================================================
              REDES SOCIAIS + WHATSAPP
          =================================================== */}

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    group
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/40
                    transition-all
                    duration-300
                    hover:border-white/40
                    hover:bg-white
                    hover:text-[#0d0d0f]
                  "
                >
                  <Icon
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </a>
              );
            })}

            {/* WhatsApp */}

            <a
              href="https://wa.me/YOUR_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar através do WhatsApp"
              className="
                group
                ml-2
                flex
                items-center
                gap-2
                border-l
                border-white/10
                pl-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white/35
                transition-colors
                duration-300
                hover:text-white
              "
            >
              <MessageCircle className="h-3 w-3" />

              <span>
                +258 XX XXX XXXX
              </span>

              <ArrowUpRight
                className="
                  h-2.5
                  w-2.5
                  text-white/20
                  transition-transform
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>

          {/* ===================================================
              COPYRIGHT + DESENVOLVIMENTO
          =================================================== */}

          <div
            className="
              flex
              flex-col
              gap-2
              text-[9px]
              uppercase
              tracking-[0.1em]
              text-white/20
              sm:flex-row
              sm:items-center
              sm:gap-4
            "
          >
            <span>
              © {currentYear} TANOSI
            </span>

            <span
              className="
                hidden
                h-3
                w-px
                bg-white/10
                sm:block
              "
            />

            <a
              href="https://synctechx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                transition-colors
                duration-300
                hover:text-white/70
              "
              aria-label="Desenvolvido pela SyncTechX"
            >
              <span>
                Desenvolvido por
              </span>

              <span
                className="
                  font-black
                  text-white/40
                  transition-colors
                  group-hover:text-white
                "
              >
                SyncTechX
              </span>

              <ArrowUpRight
                className="
                  h-2.5
                  w-2.5
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}