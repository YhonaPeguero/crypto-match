import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/layout/footer"
import { MiniAppProvider } from "@/components/mini-app-provider"
// import { TranslationProvider } from "@/components/translation-provider"
import { Suspense } from "react"
import { generateMetadata as generateMetadataFunction } from "@/lib/metadata"

interface LayoutProps {
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  // Por defecto usar español, el middleware se encarga de la detección de idioma
  return generateMetadataFunction('es')
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
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="cryptomatch-theme">
              <MiniAppProvider>
                <AnalyticsProvider>
                  <div className="flex flex-col min-h-screen">
                    <div className="flex-1">{children}</div>
                    <Footer />
                  </div>
                </AnalyticsProvider>
              </MiniAppProvider>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
