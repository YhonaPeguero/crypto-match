"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { RecommendationCard } from "@/components/results/recommendation-card"
import { ShareResults } from "@/components/results/share-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, ArrowLeft, Trophy, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics"
import { saveQuizResults } from "@/lib/quiz-operations"
import { getSessionId, clearQuizSession } from "@/lib/storage"
import type { QuizResult } from "@/types/quiz"
import { Disclaimer } from "@/components/ui/disclaimer"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadResults = async () => {
      try {
        const storedResults = sessionStorage.getItem("quiz-results")
        if (!storedResults) {
          router.push("/")
          return
        }

        const { responses, recommendations } = JSON.parse(storedResults)
        setResults(recommendations)

        // Track results view
        trackEvent(ANALYTICS_EVENTS.RESULTS_VIEWED, {
          primary_recommendation: recommendations[0]?.area.id,
          all_recommendations: recommendations.map((r: QuizResult) => r.area.id),
        })

        // Save to database
        try {
          await saveQuizResults(getSessionId(), responses, recommendations)
        } catch (dbError) {
          console.error("Failed to save results to database:", dbError)
          // Don't block the UI for database errors
        }
      } catch (err) {
        console.error("Failed to load results:", err)
        setError("Failed to load your results. Please try taking the quiz again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadResults()
  }, [router])

  const handleRetakeQuiz = () => {
    clearQuizSession()
    sessionStorage.removeItem("quiz-results")
    trackEvent(ANALYTICS_EVENTS.QUIZ_RETAKEN)
    router.push("/quiz")
  }

  const handleRecommendationClick = (areaId: string) => {
    trackEvent(ANALYTICS_EVENTS.RECOMMENDATION_CLICKED, {
      area_id: areaId,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Calculando tu estrategia crypto perfecta...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Link href="/">
                <Button>Ir al Inicio</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const primaryResult = results.find((r) => r.isPrimary)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl md:text-4xl font-bold">Resultados de tu Estrategia Crypto</h1>
            </div>

            {primaryResult && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-8 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-6 w-6 text-orange-600" />
                  <h2 className="text-xl font-semibold">Tu Mejor Opción</h2>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {primaryResult.area.name}
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Basado en tus respuestas, esta estrategia se alinea perfectamente con tus objetivos, tolerancia al
                  riesgo y nivel de experiencia.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>
            <Button onClick={handleRetakeQuiz} variant="outline" className="flex items-center gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reiniciar Test
            </Button>
          </div>

          {/* Results Grid */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {results.map((result, index) => (
              <div key={result.area.id} onClick={() => handleRecommendationClick(result.area.id)} className="h-full">
                <RecommendationCard result={result} rank={index + 1} />
              </div>
            ))}
          </div>

          {/* Share Section */}
          <ShareResults results={results} />

          {/* Next Steps */}
          <Card className="bg-card/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">¿Listo para Comenzar?</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ahora que conoces tu estrategia crypto ideal, da el siguiente paso y comienza tu viaje. Recuerda siempre
                hacer tu propia investigación y nunca invertir más de lo que puedes permitirte perder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={
                    primaryResult?.area.id === "airdrops"
                      ? "/estrategias#airdrop-farming"
                      : primaryResult?.area.id === "spotHolding"
                      ? "/estrategias#spot-holding"
                      : primaryResult?.area.id === "defi"
                      ? "/estrategias#defi-yield-farming"
                      : "/estrategias"
                  }
                >
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Aprender Más Sobre {primaryResult?.area.name}
                  </Button>
                </Link>
                <Link href="/estrategias">
                  <Button variant="outline">Explorar Todas las Estrategias</Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <Disclaimer variant="subtle" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
