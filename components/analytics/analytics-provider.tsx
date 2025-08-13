"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  return <>{children}</>
}
