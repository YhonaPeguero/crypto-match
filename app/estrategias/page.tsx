"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Target, Info, ArrowRight, ArrowLeft } from "lucide-react"
import { Disclaimer } from "@/components/ui/disclaimer"

export default function EstrategiasPage() {
  const router = useRouter()

  const handleBack = () => {
    // Volver usando historial; si no hay historial, ir al inicio
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header y navegación */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-transparent gap-2 hover:border-sky-500/60 hover:text-sky-400"
              aria-label="Volver"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="hidden sm:flex gap-2">
              <Link href="#airdrop-farming">
                <Button variant="outline" className="bg-transparent text-xs hover:border-sky-500/60 hover:text-sky-400">Airdrops</Button>
              </Link>
              <Link href="#spot-holding">
                <Button variant="outline" className="bg-transparent text-xs hover:border-orange-500/60 hover:text-orange-400">Spot</Button>
              </Link>
              <Link href="#defi-yield-farming">
                <Button variant="outline" className="bg-transparent text-xs hover:border-red-500/60 hover:text-red-400">DeFi</Button>
              </Link>
            </div>
          </div>

          <div className="text-center space-y-4 bg-gradient-to-r from-sky-500/10 via-orange-500/10 to-red-600/10 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <Target className="h-6 w-6 text-sky-500" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Estrategias en Base
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora tácticas populares para empezar en el ecosistema Base. Cada sección incluye recursos oficiales y proyectos destacados para aprender y actuar de forma informada.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {/* Airdrop Farming */}
            <Card id="airdrop-farming" className="relative bg-card/50 backdrop-blur border-0 shadow-lg overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-orange-500 to-red-600" />
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent">Airdrop Farming</h2>
                  <p className="text-muted-foreground">
                    Esta estrategia implica interactuar tempranamente con protocolos y dApps en Base para calificar potencialmente en airdrops. Base no tiene un airdrop oficial confirmado, pero fomenta la exploración del ecosistema para adopción temprana.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://docs.base.org/tutorials/get-started-with-base" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Guía oficial para empezar en Base
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://www.base.org/ecosystem" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Ecosistema de Base (proyectos)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Aerodrome Finance (DEX destacado)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Ideal para usuarios curiosos que buscan puntos y aprendizaje práctico.</span>
                </div>
              </CardContent>
            </Card>

            {/* Spot Holding */}
            <Card id="spot-holding" className="relative bg-card/50 backdrop-blur border-0 shadow-lg overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-red-600" />
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Spot Holding</h2>
                  <p className="text-muted-foreground">
                    Para comprar y mantener cripto a largo plazo, usa herramientas oficiales de Base para trading spot y wallets seguras. Enfoque en simplicidad y bajo costo.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Coinbase Wallet (oficial)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://bridge.base.org/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Base Bridge oficial
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Aerodrome Finance (swaps spot)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Enfócate en seguridad, costos bajos y diversificación prudente.</span>
                </div>
              </CardContent>
            </Card>

            {/* DeFi Yield Farming */}
            <Card id="defi-yield-farming" className="relative bg-card/50 backdrop-blur border-0 shadow-lg overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-600" />
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">DeFi Yield Farming</h2>
                  <p className="text-muted-foreground">
                    Proporciona liquidez o stakea en protocolos DeFi oficiales en Base para yields pasivos.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://docs.base.org/base-chain/integrating-with-base" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Integración DeFi en Base (docs)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Aerodrome Finance (pools y staking)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://synthetix.io/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Synthetix en Base (perps y yields)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Evalúa riesgos de impermanent loss y variación de incentivos.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/quiz">
              <Button className="bg-gradient-to-r from-sky-600 via-orange-600 to-red-600 hover:from-sky-700 hover:via-orange-700 hover:to-red-700">
                Tomar el Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="mt-4 flex justify-center">
              <Disclaimer variant="subtle" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


