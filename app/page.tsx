import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { ArrowRight, Clock, Target, TrendingUp, Sparkles, Users, Shield, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
// Eliminamos la ilustración del hero para un diseño más limpio
import { Disclaimer } from "@/components/ui/disclaimer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl motion-safe:animate-pulse motion-reduce:animate-none"></div>
        <div className="hidden md:block absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl motion-safe:animate-pulse motion-reduce:animate-none delay-1000"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-cyan-400/10 rounded-full blur-3xl motion-safe:animate-pulse motion-reduce:animate-none delay-2000"></div>

        {/* Partículas flotantes (solo desktop) */}
        <div className="hidden md:block absolute top-20 left-20 w-2 h-2 bg-orange-400/40 rounded-full motion-safe:animate-bounce motion-reduce:animate-none delay-300"></div>
        <div className="hidden md:block absolute top-40 right-32 w-1 h-1 bg-red-400/40 rounded-full motion-safe:animate-bounce motion-reduce:animate-none delay-700"></div>
        <div className="hidden md:block absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full motion-safe:animate-bounce motion-reduce:animate-none delay-1100"></div>
        <div className="hidden md:block absolute bottom-20 right-20 w-2 h-2 bg-purple-400/40 rounded-full motion-safe:animate-bounce motion-reduce:animate-none delay-1500"></div>
      </div>

      <Header />

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Hero Section centrado y limpio */}
        <section className="mx-auto max-w-3xl text-center space-y-3 sm:space-y-5 mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800 mb-2 animate-in slide-in-from-top-4 duration-1000">
              <Sparkles className="h-4 w-4 text-orange-600 mr-2 motion-safe:animate-pulse" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Descubre tu estrategia crypto ideal</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-in slide-in-from-bottom-4 duration-1000">
              Encuentra Tu Estrategia
              <br />
              <span className="relative">
                Crypto Perfecta
                <div className="absolute -bottom-1 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-in slide-in-from-left duration-1000 delay-500 motion-safe:animate-pulse"></div>
              </span>
            </h1>

            <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              Toma nuestro quiz personalizado y descubre el enfoque de criptomonedas que mejor se adapta a tus objetivos, tu tolerancia al riesgo y tu nivel de experiencia.
            </p>

            {/* Social proof */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground px-4">
              <div className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8/5</span>
                <span className="text-muted-foreground/70">(2.3k+)</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Comunidad activa</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Sin registro</span>
              </div>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group"
                >
                  Comenzar Quiz
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full hover:bg-muted/70 transition-colors">
                <Clock className="h-4 w-4 mr-2 text-purple-600" />
                Toma 2-3 minutos
              </div>
            </div>

            {/* Disclaimer NFA/NFY */}
            <Disclaimer className="mt-1 md:mt-0 px-4" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16 px-4">
          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:translate-y-[-6px] animate-in slide-in-from-bottom-4 duration-1000 delay-700 group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <CardContent className="p-6 sm:p-8 text-center space-y-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                Resultados Personalizados
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Obtén recomendaciones adaptadas a tu situación específica y objetivos
              </p>
            </CardContent>
          </Card>

          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:translate-y-[-6px] animate-in slide-in-from-bottom-4 duration-1000 delay-800 group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <CardContent className="p-6 sm:p-8 text-center space-y-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-green-600 transition-colors">
                Insights de Expertos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Basado en estrategias y condiciones actuales del mercado
              </p>
            </CardContent>
          </Card>

          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:translate-y-[-6px] md:col-span-2 lg:col-span-1 animate-in slide-in-from-bottom-4 duration-1000 delay-900 group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardContent className="p-6 sm:p-8 text-center space-y-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto shadow-lg animate-pulse delay-500 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-purple-600 transition-colors">
                Rápido y Fácil
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Preguntas simples que toman solo unos minutos completar
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12 sm:mb-16 px-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left duration-1000 delay-1000 hover:scale-105 hover:-translate-y-2 group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <CardContent className="p-6 sm:p-8 space-y-4 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg animate-pulse group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-green-600 transition-colors">
                  100% Anónimo
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No requerimos registro ni información personal. Tus respuestas son completamente privadas.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right duration-1000 delay-1100 hover:scale-105 hover:-translate-y-2 group backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <CardContent className="p-6 sm:p-8 space-y-4 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse delay-500 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                  Comunidad Activa
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Únete a miles de personas que ya han descubierto su camino en el mundo crypto.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4 bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-950/20 dark:to-red-950/20 border border-border/30 rounded-2xl p-6 sm:p-8 mx-4 backdrop-blur-sm shadow-xl animate-in slide-in-from-bottom-4 duration-1000 delay-1200 hover:shadow-2xl transition-all hover:scale-[1.02]">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground animate-pulse">¿Listo para Comenzar?</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Únete a miles de personas que han descubierto su estrategia crypto ideal
            </p>
          </div>
          <Link href="/quiz">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group hover:scale-110 hover:-translate-y-2"
            >
              Tomar el Quiz Ahora
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200 animate-bounce" />
            </Button>
          </Link>
          <div className="mt-3 sm:mt-4 flex justify-center">
            <Disclaimer variant="subtle" />
          </div>
        </div>
      </main>
    </div>
  )
}
