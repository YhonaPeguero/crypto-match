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
  const shareText = `I just discovered my perfect crypto strategy: ${primaryResult?.area.name}! Take the quiz to find yours.`
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
      console.error("Error copying link:", error)
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
      primaryRecommendation: primaryResult?.area.name,
      allRecommendations: results.map((r) => ({
        name: r.area.name,
        score: r.score,
        description: r.area.description,
      })),
    }

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "basematch-results.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="glass-panel border-primary/20 shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Share2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          Share Your Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Help others discover their perfect crypto strategy by sharing this quiz!
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="ghost-tech"
            size="lg"
            onClick={handleTwitterShare}
            className="flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-all duration-300 hover:border-primary/50"
          >
            <div className="p-3 rounded-xl bg-black/20 border border-white/10 group-hover:bg-black/30 transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M18.244 2H21.5l-7.52 8.59L23.5 22h-7.31l-5.72-6.61L3.5 22H.244l8.07-9.22L.5 2h7.31l5.18 5.99L18.244 2Zm-1.28 18h2.02L7.12 4h-2.02l11.864 16Z"/>
              </svg>
            </div>
            <span className="text-sm font-medium">X / Twitter</span>
          </Button>

          <Button
            variant="ghost-tech"
            size="lg"
            onClick={handleFarcasterShare}
            className="flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-all duration-300 hover:border-secondary/50"
          >
            <div className="p-3 rounded-xl bg-[#855DCD]/10 border border-[#855DCD]/20 group-hover:bg-[#855DCD]/20 transition-colors">
              <img src="https://warpcast.com/favicon.ico" alt="Farcaster" className="h-5 w-5 rounded-sm" />
            </div>
            <span className="text-sm font-medium">Farcaster</span>
          </Button>

          <Button
            variant="ghost-tech"
            size="lg"
            onClick={handleCopyLink}
            className={`flex flex-col items-center gap-2 h-auto py-4 transition-all duration-300 ${
              copied 
                ? "border-green-500/50 bg-green-500/10 scale-105" 
                : "hover:scale-105 hover:border-primary/50"
            }`}
          >
            <div className={`p-3 rounded-xl border transition-colors ${
              copied 
                ? "bg-green-500/20 border-green-500/30" 
                : "bg-white/5 border-white/10 group-hover:bg-white/10"
            }`}>
              <Link2 className={`h-5 w-5 ${copied ? "text-green-500" : ""}`} />
            </div>
            <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Link"}</span>
          </Button>

          <Button
            variant="ghost-tech"
            size="lg"
            onClick={handleDownloadResults}
            className="flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-all duration-300 hover:border-primary/50"
          >
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <Download className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Download</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
