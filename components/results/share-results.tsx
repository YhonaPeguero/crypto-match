"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Link2, Download } from "lucide-react"
import { useState } from "react"
import type { QuizResult } from "@/types/quiz"

interface ShareResultsProps {
  results: QuizResult[]
}

export function ShareResults({ results }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)

  const primaryResult = results.find((r) => r.isPrimary)
  const shareText = `¡Acabo de descubrir mi estrategia crypto perfecta: ${primaryResult?.area.name}! Toma el quiz para encontrar la tuya.`
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "")
  const shareUrl = `${siteUrl}/results`

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = shareUrl
        textArea.style.position = "fixed"
        textArea.style.left = "-9999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (error) {
      console.error("Error al copiar enlace:", error)
    }
  }

  const handleTwitterShare = () => {
    const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=CryptoMatch,Crypto,Bitcoin`
    window.open(xUrl, "_blank")
  }

  const handleFarcasterShare = () => {
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    window.open(farcasterUrl, "_blank")
  }

  const handleDownloadResults = () => {
    const resultsData = {
      timestamp: new Date().toISOString(),
      recomendacionPrincipal: primaryResult?.area.name,
      todasLasRecomendaciones: results.map((r) => ({
        nombre: r.area.name,
        puntuacion: r.score,
        descripcion: r.area.description,
      })),
    }

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cryptomatch-resultados.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Share2 className="h-5 w-5" />
          Comparte Tus Resultados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          ¡Ayuda a otros a descubrir su estrategia crypto perfecta compartiendo este quiz!
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTwitterShare}
            className="flex items-center gap-2 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M18.244 2H21.5l-7.52 8.59L23.5 22h-7.31l-5.72-6.61L3.5 22H.244l8.07-9.22L.5 2h7.31l5.18 5.99L18.244 2Zm-1.28 18h2.02L7.12 4h-2.02l11.864 16Z"/>
            </svg>
            <span className="hidden sm:inline"></span>
            <span className="sm:hidden"></span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFarcasterShare}
            className="flex items-center gap-2 bg-transparent hover:bg-[#855DCD]/10 text-xs sm:text-sm text-[#855DCD]"
          >
            <img src="https://warpcast.com/favicon.ico" alt="Farcaster" className="h-4 w-4 rounded-sm" />
            <span className="hidden sm:inline">Farcaster</span>
            <span className="sm:hidden">FC</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-transparent hover:bg-green-50 dark:hover:bg-green-950/20 text-xs sm:text-sm text-green-600"
          >
            <Link2 className="h-4 w-4" />
            {copied ? "¡Copiado!" : "Copiar"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadResults}
            className="flex items-center gap-2 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-950/20 text-xs sm:text-sm"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Descargar</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
