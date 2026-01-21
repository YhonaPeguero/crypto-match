"use client"

import { ParticleButton } from "@/components/ui/particle-button"
import { HubSection } from "@/components/hub/hub-section"
import { Header } from "@/components/layout/header"
import { WavyBackground } from "@/components/ui/wavy-background"
import { ArrowRight, Clock, Shield } from "lucide-react"
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
                  className="w-full sm:w-auto h-14 px-10 text-lg rounded-full btn-crypto-premium"
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

        {/* Base Onchain Hub Section - Integrated */}
        <div className="mb-24">
          <HubSection />
        </div>

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
                  className="w-full sm:w-auto h-14 px-10 text-lg rounded-full btn-crypto-premium"
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
