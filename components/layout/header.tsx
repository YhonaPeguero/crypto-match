"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <Image src="/logo.png" alt="CryptoMatch" width={36} height={36} className="h-9 w-9 object-contain rounded-md" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                CryptoMatch
              </span>
            </Link>
            <div className="w-10 h-10" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <Image src="/logo.png" alt="CryptoMatch" width={36} height={36} className="h-9 w-9 object-contain rounded-md" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              CryptoMatch
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-accent transition-all duration-200 hover:scale-110"
            aria-label={resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 transition-all duration-300 hover:rotate-180" />
            ) : (
              <Moon className="h-5 w-5 transition-all duration-300 hover:rotate-12" />
            )}
            <span className="sr-only">
              {resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
