import type { Metadata } from "next";
import { Inter, Space_Grotesk, Montserrat, Roboto, Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MegaMenu } from "@/components/mega-menu";
import { CartSidebar } from "@/components/cart-sidebar";
import { Toaster } from "@/components/toaster";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "600", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ttanosi — Made for the Movement",
    template: "%s — Ttanosi",
  },
  description:
    "Ttanosi is a modern streetwear brand built for the movement. Discover limited drops, bold essentials, and pieces designed to stand out.",
  keywords: [
    "Ttanosi",
    "Ttanosi Clothing",
    "streetwear",
    "fashion",
    "urban fashion",
    "streetwear clothing",
    "limited drops",
    "mens fashion",
    "womens fashion",
    "accessories",
  ],
  authors: [
    {
      name: "Ttanosi",
    },
  ],
  creator: "Ttanosi",
  publisher: "Ttanosi",
  applicationName: "Ttanosi",
  generator: "Next.js",
  metadataBase: new URL("https://ttanosi.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ttanosi — Made for the Movement",
    description:
      "Bold streetwear. Limited drops. Made for the movement.",
    url: "https://ttanosi.vercel.app",
    siteName: "Ttanosi",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Ttanosi — Made for the Movement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ttanosi — Made for the Movement",
    description:
      "Bold streetwear. Limited drops. Made for the movement.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${montserrat.variable} ${roboto.variable} ${oswald.variable} font-sans antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <MegaMenu />
            <CartSidebar />
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
