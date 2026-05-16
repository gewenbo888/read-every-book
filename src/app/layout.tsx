import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://read-every-book.psyverse.fun"),
  title: "AI Has Already Read Every Book | 阅读的未来",
  description:
    "A civilization-scale meditation on reading after language models. If AI has compressed every book, what is reading for? Information acquisition becomes cognitive architecture.",
  keywords: [
    "AI and reading",
    "future of learning",
    "cognitive architecture",
    "LLM",
    "civilization knowledge",
    "post-information age",
    "worldview construction",
    "consciousness",
    "philosophy of AI",
    "intelligence augmentation",
    "human + AI",
    "Psyverse",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    title: "AI Has Already Read Every Book. But It Cannot Think For You.",
    description:
      "Reading is no longer information acquisition. It is the architecture of a mind. A civilization-scale meditation on the new cognitive era.",
    url: "https://read-every-book.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Has Already Read Every Book.",
    description:
      "If models have compressed every book, why should humans still read? A civilization research lab on the future of cognition.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#040611" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="cosmos-field" aria-hidden />
        <div className="grain" aria-hidden />
        {children}
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
