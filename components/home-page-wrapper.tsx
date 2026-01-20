"use client"

import { ParticleButton } from "@/components/ui/particle-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { WavyBackground } from "@/components/ui/wavy-background"
import { ArrowRight, Clock, Target, Zap, Shield, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Disclaimer } from "@/components/ui/disclaimer"

export function HomePageWrapper() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      {/* Wavy Background - Vibrant and ribbon-like as per reference */}
      <WavyBackground
        className="absolute inset-0"
        containerClassName="fixed inset-0 z-0 pointer-events-none"
        colors={[
          "#00f2ff", // Electric Cyan
          "#00d4ff", // Vibrant Blue
          "#3b82f6", // Neon Blue
          "#c77dff", // Bright Purple
          "#e040fb", // Pink Magenta
        ]}
        waveWidth={50}
        blur={20}
        speed="slow"
        waveOpacity={0.6}
        backgroundFill="black"
      />

      <Header />

      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        
        {/* Hero Section - Centered & Balanced */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="space-y-6 text-center animate-in fade-in duration-700">
            {/* Title - Balanced size and spacing with electric blue gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] px-4">
              Find Your Perfect{" "}
              <span className="text-blue-fire">Base Strategy Match</span>
            </h1>

            {/* CTAs - Well spaced and aligned */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center items-center">
              <Link href="/quiz">
                <ParticleButton 
                  variant="blue-fire" 
                  className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl shadow-[0_0_30px_rgba(0,180,255,0.3)]"
                >
                  Start Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ParticleButton>
              </Link>
              
              {/* Trust signals - Centered */}
              <div className="flex items-center gap-4 px-2 text-sm text-muted-foreground justify-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>2 min</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid - Improved spacing */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <Card className="glass-card hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Personalized Results</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Strategies tailored to your risk profile.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Quick & Easy</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                No complex jargon. Just what you need.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">100% Anonymous</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Your privacy is sacred. No tracking.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Base Onchain Hub Teaser - Subtle */}
        <Card className="glass-panel border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent mb-16 relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-transparent to-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">
                    Base Onchain Hub
                  </h2>
                </div>
                
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Explore verified apps on Base. Free and low-cost to boost your onchain activity.
                  <br />
                  <span className="text-foreground font-medium">From discovery to action.</span>
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>15+ verified apps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Free & low-cost</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link href="/hub">
                    <Button 
                      variant="ghost-tech" 
                      size="lg" 
                      className="h-11 px-6 text-sm font-medium rounded-full group/btn"
                    >
                      Explore Hub
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 blur-[40px] rounded-full opacity-50"></div>
                <div className="relative grid grid-cols-2 gap-3">
                  <div className="glass-card p-3 rounded-lg border-primary/10 animate-pulse-slow">
                    <div className="w-6 h-6 rounded bg-primary/20 mb-2"></div>
                    <div className="h-2 bg-primary/10 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-primary/5 rounded w-1/2"></div>
                  </div>
                  <div className="glass-card p-3 rounded-lg border-primary/10 animate-pulse-slow" style={{animationDelay: "0.5s"}}>
                    <div className="w-6 h-6 rounded bg-primary/20 mb-2"></div>
                    <div className="h-2 bg-primary/10 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-primary/5 rounded w-1/2"></div>
                  </div>
                  <div className="glass-card p-3 rounded-lg border-primary/10 animate-pulse-slow" style={{animationDelay: "1s"}}>
                    <div className="w-6 h-6 rounded bg-primary/20 mb-2"></div>
                    <div className="h-2 bg-primary/10 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-primary/5 rounded w-1/2"></div>
                  </div>
                  <div className="glass-card p-3 rounded-lg border-primary/10 animate-pulse-slow" style={{animationDelay: "1.5s"}}>
                    <div className="w-6 h-6 rounded bg-primary/20 mb-2"></div>
                    <div className="h-2 bg-primary/10 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-primary/5 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA - Clean */}
        <div className="relative rounded-2xl p-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50"></div>
          <div className="relative bg-card/50 backdrop-blur-md border border-white/10 rounded-[15px] p-8 md:p-10 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to Find Your Match?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Stop guessing. Start executing with a clear strategy.
            </p>
            <div className="pt-2">
              <Link href="/quiz">
                <ParticleButton 
                  variant="blue-fire" 
                  className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl shadow-[0_0_30px_rgba(0,180,255,0.3)]"
                >
                  Start Quiz Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ParticleButton>
              </Link>
            </div>
            <div className="pt-2 opacity-70">
              <Disclaimer variant="subtle" />
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
