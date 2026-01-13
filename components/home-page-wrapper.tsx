"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { ArrowRight, Clock, Target, Zap, Shield, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Disclaimer } from "@/components/ui/disclaimer"
import { HeroVisual } from "@/components/home/hero-visual"

export function HomePageWrapper() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: "2s"}}></div>
      </div>

      <Header />

      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 flex flex-col justify-center">
        
        {/* Hero Section - Improved Typography & Spacing */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="space-y-8 text-center lg:text-left animate-in slide-in-from-left duration-700 fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Analysis</span>
            </div>
            
            {/* Title - Reduced size */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Find Your Perfect{" "}
              <span className="text-[#0052FF]">Base Strategy Match</span>
            </h1>
            
            {/* Description - Concise, readable */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover your ideal crypto strategy in 2 minutes.
              <br />
              Anonymous. Free.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Link href="/quiz">
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-full shadow-[0_0_20px_hsla(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsla(var(--primary)/0.5)] hover:scale-105 transition-all duration-300"
                >
                  Start Quiz
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              {/* Trust signals - Subtle */}
              <div className="flex items-center gap-4 px-2 text-sm text-muted-foreground justify-center lg:justify-start">
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

          {/* Hero Visual */}
          <div className="relative animate-in slide-in-from-right duration-1000 fade-in lg:h-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[60px] rounded-full opacity-60"></div>
            <HeroVisual />
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
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0052FF]">
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
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="h-12 px-8 rounded-full text-base font-semibold shadow-[0_0_20px_hsla(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsla(var(--primary)/0.5)] hover:scale-105 transition-all duration-300"
                >
                  Start Quiz Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
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
