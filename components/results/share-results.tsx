"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Twitter, Facebook, Link2, Download } from "lucide-react"
import { useState } from "react"
import type { QuizResult } from "@/types/quiz"

interface ShareResultsProps {
  results: QuizResult[]
}

export function ShareResults({ results }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)

  const primaryResult = results.find((r) => r.isPrimary)
  const shareText = `¡Acabo de descubrir mi estrategia crypto perfecta: ${primaryResult?.area.name}! Toma el quiz para encontrar la tuya.`
  const shareUrl = typeof window !== "undefined" ? window.location.origin : ""

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error al copiar enlace:", error)
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=CryptoMatch,Crypto,Bitcoin`
    window.open(twitterUrl, "_blank")
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, "_blank")
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
            className="flex items-center gap-2 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950/20 text-xs sm:text-sm"
          >
            <Twitter className="h-4 w-4" />
            <span className="hidden sm:inline">Twitter</span>
            <span className="sm:hidden">X</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFacebookShare}
            className="flex items-center gap-2 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950/20 text-xs sm:text-sm"
          >
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
            <span className="sm:hidden">FB</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-transparent hover:bg-green-50 dark:hover:bg-green-950/20 text-xs sm:text-sm"
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
