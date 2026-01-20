"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Target, Info, ArrowRight, ArrowLeft } from "lucide-react"
import { Disclaimer } from "@/components/ui/disclaimer"

export default function StrategiesPage() {
  const router = useRouter()

  const handleBack = () => {
    // Go back using history; if no history, go to home
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
          {/* Header and navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-transparent gap-2 hover:border-sky-500/60 hover:text-sky-400"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
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
                Strategies on Base
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore popular tactics to get started in the Base ecosystem. Each section includes official resources and featured projects to learn and act with confidence.
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
                    This strategy involves early interaction with protocols and dApps on Base to potentially qualify for airdrops. Base does not have an official confirmed airdrop, but encourages ecosystem exploration for early adoption.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://docs.base.org/tutorials/get-started-with-base" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Official guide to get started on Base
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://www.base.org/ecosystem" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Base Ecosystem (projects)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Aerodrome Finance (featured DEX)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Ideal for curious users seeking points and hands-on learning.</span>
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
                    For buying and holding crypto long-term, use official Base tools for spot trading and secure wallets. Focus on simplicity and low cost.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Coinbase Wallet (official)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://bridge.base.org/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Official Base Bridge
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-orange-500/60 hover:text-orange-400">
                      Aerodrome Finance (spot swaps)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Focus on security, low costs, and prudent diversification.</span>
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
                    Provide liquidity or stake in official DeFi protocols on Base for passive yields.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="https://docs.base.org/base-chain/integrating-with-base" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      DeFi Integration on Base (docs)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://aerodrome.finance/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Aerodrome Finance (pools & staking)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://synthetix.io/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between bg-transparent hover:border-sky-500/60 hover:text-sky-400">
                      Synthetix on Base (perps & yields)
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  <span>Evaluate impermanent loss risks and incentive variations.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/quiz">
              <Button className="bg-gradient-to-r from-sky-600 via-orange-600 to-red-600 hover:from-sky-700 hover:via-orange-700 hover:to-red-700">
                Take the Quiz
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
