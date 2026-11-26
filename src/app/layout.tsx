
import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { MegaMenu } from "@/components/mega-menu";
import { CartSidebar } from "@/components/cart-sidebar";
import { Toaster } from "@/components/toaster";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/footer";
import { IntroScreen } from "@/components/intro-screen";

export const metadata: Metadata = {
  title: {
    default: "Tanosi — Feito para o Movimento",
    template: "%s — Tanosi",
  },

  description:
    "A Tanosi é uma marca de streetwear moderna criada para o movimento. Descobre lançamentos limitados, essenciais marcantes e peças concebidas para se destacarem.",

  keywords: [
    "Tanosi",
    "Tanosi Clothing",
    "streetwear",
    "moda",
    "moda urbana",
    "roupa streetwear",
    "lançamentos limitados",
    "moda masculina",
    "moda feminina",
    "acessórios",
  ],

  authors: [{ name: "Tanosi" }],
  creator: "Tanosi",
  publisher: "Tanosi",
  applicationName: "Tanosi",
  generator: "Next.js",

  metadataBase: new URL("https://www.tanosi.store"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Tanosi — Feito para o Movimento",
    description:
      "Streetwear marcante. Lançamentos limitados. Feito para o movimento.",
    url: "https://www.tanosi.store",
    siteName: "Tanosi",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Tanosi — Feito para o Movimento",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tanosi — Feito para o Movimento",
    description:
      "Streetwear marcante. Lançamentos limitados. Feito para o movimento.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          flex
          flex-col
          font-sans
          antialiased
          selection:bg-primary
          selection:text-primary-foreground
        "
      >
        <IntroScreen />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <MegaMenu />

            <CartSidebar />

            <main className="flex-1">{children}</main>

            <Toaster />
          </SmoothScroll>
        </ThemeProvider>

        <Footer />
      </body>
    </html>
  );
}
