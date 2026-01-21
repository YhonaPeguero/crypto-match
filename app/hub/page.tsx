"use client"

import { Header } from "@/components/layout/header"
import { HubSection } from "@/components/hub/hub-section"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

export default function HubPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Onchain <span className="text-blue-fire">Hub</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    The Hub is now integrated into our main page for easier access.
                </p>
            </div>

            <HubSection />

            <Card className="glass-panel border-yellow-500/20 bg-yellow-500/5">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-yellow-500 text-sm">Onchain Safety Notice</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            These apps are verified for quality but always do your own research (DYOR). 
                            BaseMatch provides discovery tools only. Interact with smart contracts at your own risk.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
