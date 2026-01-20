import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/layout/footer"
// import { TranslationProvider } from "@/components/translation-provider"
import { Suspense } from "react"
import { generateMetadata as generateMetadataFunction } from "@/lib/metadata"
import { FarcasterSDKInitializer } from "@/components/farcaster-sdk-initializer"
import { PerformanceMonitor } from "@/components/performance-monitor"

interface LayoutProps {
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFunction('en')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="icon" href="/basematch-icon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/basematch-icon.svg" />
        <link rel="shortcut icon" href="/basematch-icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading BaseMatch...</p>
              </div>
            </div>
          }>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="cryptomatch-theme">
              <PerformanceMonitor />
              <FarcasterSDKInitializer>
                <AnalyticsProvider>
                  <div className="flex flex-col min-h-screen">
                    <div className="flex-1">{children}</div>
                    <Footer />
                  </div>
                </AnalyticsProvider>
              </FarcasterSDKInitializer>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
