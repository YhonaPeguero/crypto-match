import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: {
    default: "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta",
    template: "%s | CryptoMatch",
  },
  description:
    "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia. Toma nuestro quiz personalizado para obtener recomendaciones adaptadas para Bitcoin, DeFi, trading y más.",
  keywords: ["criptomonedas", "crypto quiz", "bitcoin", "ethereum", "defi", "trading", "inversión", "blockchain"],
  authors: [{ name: "Equipo CryptoMatch" }],
  creator: "CryptoMatch",
  publisher: "CryptoMatch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cryptomatch.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://cryptomatch.vercel.app",
    title: "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta",
    description:
      "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia.",
    siteName: "CryptoMatch",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta",
    description:
      "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia.",
    images: ["/logo.png"],
    creator: "@cryptomatch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="cryptomatch-theme">
              <AnalyticsProvider>
                <div className="flex flex-col min-h-screen">
                  <div className="flex-1">{children}</div>
                  <Footer />
                </div>
              </AnalyticsProvider>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
