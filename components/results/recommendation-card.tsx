"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Clock, DollarSign, Activity, BarChart3, ShieldCheck } from "lucide-react"
import type { QuizResult } from "@/types/quiz"
import { Disclaimer } from "@/components/ui/disclaimer"
import { TIME_RANGES, CAPITAL_RANGES } from "@/lib/quiz-engine"

interface RecommendationCardProps {
  result: QuizResult
  rank: number
}

export function RecommendationCard({ result, rank }: RecommendationCardProps) {
  const { area, score, isPrimary, userLevel } = result

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">Riesgo Bajo</Badge>
      case "medium":
        return <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/10">Riesgo Medio</Badge>
      case "high":
        return <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10">Riesgo Alto</Badge>
      default:
        return null
    }
  }

  return (
    <Card
      className={`relative h-full flex flex-col transition-all duration-300 ${
        isPrimary 
          ? "glass-panel border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.15)] scale-[1.02]" 
          : "glass-card hover:border-white/20"
      }`}
    >
      {isPrimary && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Mejor Opción
        </div>
      )}

      <CardHeader className="space-y-4 pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
             <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                isPrimary ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"
             }`}>
                #{rank}
             </div>
             <div>
                <CardTitle className={`text-xl font-bold leading-tight ${isPrimary ? "text-primary text-glow" : "text-foreground"}`}>
                    {area.name}
                </CardTitle>
                <div className="mt-1 flex gap-2">
                    {getRiskBadge(area.riskLevel)}
                </div>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-2xl font-bold text-foreground">{score}%</span>
             <span className="text-xs text-muted-foreground">Match</span>
          </div>
        </div>
        <Progress value={score} className={`h-1.5 ${isPrimary ? "bg-primary/20" : "bg-white/10"}`} />
      </CardHeader>

      <CardContent className="space-y-6 flex-1 flex flex-col pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed min-h-[60px]">
          {area.description}
        </p>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/20 border border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
               <Clock className="w-3 h-3" /> Tiempo
            </div>
            <div className="font-semibold text-sm">
                {TIME_RANGES[area.id]?.[userLevel] || area.timeCommitment}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wider">
               <DollarSign className="w-3 h-3" /> Capital
            </div>
            <div className="font-semibold text-sm">
                {CAPITAL_RANGES[area.id]?.[userLevel] || area.capitalRequirement}
            </div>
          </div>
        </div>
        
        <div className="space-y-2 flex-1">
           <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Por qué es para ti</span>
           </div>
           <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3">
              {area.detailedDescription}
           </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {area.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={
            area.id === "airdrops"
              ? "/estrategias#airdrop-farming"
              : area.id === "spotHolding"
              ? "/estrategias#spot-holding"
              : area.id === "defi"
              ? "/estrategias#defi-yield-farming"
              : "/estrategias"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant={isPrimary ? "neon" : "ghost-tech"} className="w-full mt-2 group">
            Ver Estrategia
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
