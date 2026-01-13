"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { RecommendationCard } from "@/components/results/recommendation-card"
import { ShareResults } from "@/components/results/share-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, ArrowLeft, Trophy, Target, TrendingUp, Users, Zap, ExternalLink } from "lucide-react"
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
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Header />
        <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 py-20 flex items-center justify-center relative z-10">
          <div className="text-center space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto shadow-[0_0_20px_rgba(var(--primary),0.5)]"></div>
            <p className="text-xl text-primary font-medium animate-pulse">Analizando blockchain data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Card className="max-w-md glass-panel">
            <CardContent className="p-8 text-center space-y-6">
              <p className="text-destructive font-semibold">{error}</p>
              <Link href="/">
                <Button variant="neon">Reiniciar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const primaryResult = results.find((r) => r.isPrimary)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px] animate-pulse-slow" style={{animationDelay: "3s"}}></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section Mejorada */}
          <div className="text-center space-y-10 animate-in slide-in-from-bottom-4 duration-700">
            {/* Título con celebración */}
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 shadow-[0_0_30px_hsla(var(--primary)/0.3)] animate-pulse-slow">
                  <Trophy className="h-8 w-8 md:h-10 md:w-10 text-primary animate-bounce" />
                </div>
                {/* Efecto de partículas alrededor del trofeo */}
                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-secondary animate-ping" style={{animationDelay: "0.5s"}}></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  ¡Match Encontrado!
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">Tu Perfil Crypto</p>
            </div>

            {/* Card Principal Mejorada */}
            {primaryResult && (
              <div className="glass-panel border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 md:p-14 space-y-8 max-w-4xl mx-auto relative overflow-hidden group animate-in zoom-in duration-700">
                {/* Efectos de fondo animados */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-cyan-400 to-secondary animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary via-primary to-cyan-400 animate-pulse" style={{animationDelay: "1s"}}></div>
                
                {/* Badge de mejor coincidencia */}
                <div className="flex items-center justify-center gap-3">
                  <Target className="h-7 w-7 text-primary animate-pulse" />
                  <h2 className="text-xl md:text-2xl font-bold text-primary tracking-wider uppercase">
                    Mejor Coincidencia
                  </h2>
                </div>
                
                {/* Nombre de la estrategia */}
                <h3 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary text-glow drop-shadow-2xl">
                  {primaryResult.area.name}
                </h3>
                
                {/* Score destacado */}
                <div className="flex items-center justify-center gap-4">
                  <div className="px-6 py-3 rounded-full bg-primary/20 border border-primary/30">
                    <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                      {primaryResult.score}%
                    </span>
                    <span className="text-lg text-muted-foreground ml-2">Match</span>
                  </div>
                </div>
                
                {/* Descripción */}
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Esta estrategia se alinea perfectamente con tu{" "}
                  <span className="text-primary font-bold">tolerancia al riesgo</span> y{" "}
                  <span className="text-secondary font-bold">objetivos</span>.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="ghost-tech" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>
            <Button onClick={handleRetakeQuiz} variant="ghost-tech" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reiniciar Test
            </Button>
          </div>

          {/* Results Grid Mejorado */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {results.map((result, index) => (
              <div 
                key={result.area.id} 
                onClick={() => handleRecommendationClick(result.area.id)} 
                className="h-full cursor-pointer hover:scale-[1.03] transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RecommendationCard result={result} rank={index + 1} />
              </div>
            ))}
          </div>

          {/* Share Section */}
          <ShareResults results={results} />

          {/* Base Onchain Hub CTA */}
          <Card className="glass-panel border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-secondary animate-pulse"></div>
            <CardContent className="p-10 md:p-14 space-y-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Aumenta tu Actividad Onchain
                  </span>
                </h3>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ya descubriste tu match crypto perfecto. Ahora es momento de{" "}
                <span className="text-foreground font-semibold">actuar onchain</span> en Base.
                <br />
                Explora apps verificadas, gratis y low-cost, para construir tu rastro onchain.
              </p>
              
              <div className="pt-4">
                <Link href="/hub">
                  <Button 
                    variant="neon" 
                    size="lg" 
                    className="h-14 px-10 text-lg font-bold rounded-full shadow-[0_0_30px_hsla(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsla(var(--primary)/0.6)] hover:scale-105 transition-all duration-300"
                  >
                    Explorar Base Onchain Hub
                    <ExternalLink className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Apps verificadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Gratis y low-cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Sin registros</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="glass-panel text-center">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center justify-center gap-3">
                <TrendingUp className="h-7 w-7 text-secondary" />
                <h3 className="text-2xl font-bold">Próximos Pasos</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Domina tu estrategia. Aprende de expertos o profundiza por tu cuenta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-2">
                <Link href="/mentores">
                  <Button variant="neon" size="lg" className="w-full sm:w-auto h-12">
                    <Users className="h-4 w-4 mr-2" />
                    Conseguir Mentor Experto
                  </Button>
                </Link>
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
                  <Button variant="ghost-tech" size="lg" className="w-full sm:w-auto h-12">
                    Aprender Más
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center pt-4">
                <Disclaimer variant="subtle" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
