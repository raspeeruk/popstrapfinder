import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { GA_ID } from "./lib/analytics";
import "./globals.css";

const display = Bowlby_One_SC({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://popstrapfinder.com"),
  title: {
    default: "Pop Strap Finder — Straps & Accessories for the Swatch × AP Royal Pop",
    template: "%s | Pop Strap Finder",
  },
  description:
    "The independent guide to straps, cases, chains and bracelets for the Audemars Piguet × Swatch Royal Oak Pop pocket watch. Compare materials, fits, prices, and colorways before you buy.",
  applicationName: "Pop Strap Finder",
  keywords: [
    "royal pop strap",
    "swatch royal pop strap",
    "royal oak pop strap",
    "royal pop wristband",
    "royal pop pocket to wrist",
    "swatch ap royal pop accessories",
    "pop swatch strap",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://popstrapfinder.com",
    siteName: "Pop Strap Finder",
    title: "Pop Strap Finder — Straps & Accessories for the Royal Pop",
    description:
      "Compare the best straps, cases and bracelets for the Audemars Piguet × Swatch Royal Oak Pop. Independent reviews. No hype.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pop Strap Finder",
    description:
      "The independent guide to straps for the Audemars Piguet × Swatch Royal Pop.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://popstrapfinder.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pop Strap Finder",
              url: "https://popstrapfinder.com",
              logo: "https://popstrapfinder.com/logo.png",
              description:
                "Independent guide to straps and accessories for the Audemars Piguet × Swatch Royal Pop pocket watch.",
            }),
          }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="bg-paper text-ink min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-pop-yellow focus:text-ink focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
