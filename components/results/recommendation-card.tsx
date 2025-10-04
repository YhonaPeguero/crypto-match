"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Clock, DollarSign } from "lucide-react"
import type { QuizResult } from "@/types/quiz"
import { Disclaimer } from "@/components/ui/disclaimer"
import { TIME_RANGES, CAPITAL_RANGES } from "@/lib/quiz-engine"

interface RecommendationCardProps {
  result: QuizResult
  rank: number
}

export function RecommendationCard({ result, rank }: RecommendationCardProps) {
  const { area, score, isPrimary, userLevel } = result

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    }
  }

  const getCapitalColor = (capital: string) => {
    switch (capital) {
      case "low":
        return "text-green-600 dark:text-green-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "high":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getTimeColor = (time: string) => {
    switch (time) {
      case "minimal":
        return "text-green-600 dark:text-green-400"
      case "moderate":
        return "text-yellow-600 dark:text-yellow-400"
      case "high":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getRankLabel = (rank: number) => {
    switch (rank) {
      case 1:
        return "Mejor Opción"
      case 2:
        return "Segunda Opción"
      case 3:
        return "Tercera Opción"
      default:
        return `Opción #${rank}`
    }
  }

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-xl ${
        isPrimary ? "ring-2 ring-orange-500 shadow-lg scale-105" : "hover:scale-102 shadow-md"
      } bg-card/50 backdrop-blur border-0 h-full flex flex-col`}
    >
      <CardHeader className="space-y-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${
                  isPrimary
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                #{rank}
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight break-words">{area.name}</CardTitle>
            </div>
            <Badge
              className={`${
                isPrimary
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-0"
                  : "bg-muted text-muted-foreground border-muted"
              } text-xs`}
            >
              {getRankLabel(rank)}
            </Badge>
          </div>
          <Badge className={`${getRiskColor(area.riskLevel)} flex-shrink-0 text-xs`}>
            {area.riskLevel === "low" && "Riesgo bajo"}
            {area.riskLevel === "medium" && "Riesgo medio"}
            {area.riskLevel === "high" && "Riesgo alto"}
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${
              userLevel === 'principiante' ? 'border-green-500 text-green-700 bg-green-50 dark:border-green-400 dark:text-green-300 dark:bg-green-950/20' :
              userLevel === 'intermedio' ? 'border-yellow-500 text-yellow-700 bg-yellow-50 dark:border-yellow-400 dark:text-yellow-300 dark:bg-yellow-950/20' :
              'border-purple-500 text-purple-700 bg-purple-50 dark:border-purple-400 dark:text-purple-300 dark:bg-purple-950/20'
            }`}
          >
            {userLevel === 'principiante' && 'Principiante'}
            {userLevel === 'intermedio' && 'Intermedio'}
            {userLevel === 'avanzado' && 'Avanzado'}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Compatibilidad</span>
            <span className="text-sm font-bold">{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 flex-1 flex flex-col">
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{area.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium">Tiempo Requerido</span>
            </div>
            <p className={`text-sm font-semibold ${getTimeColor(area.timeCommitment)}`}>
              {TIME_RANGES[area.id]?.[userLevel] || 
                (area.timeCommitment === "minimal" && "Mínimo") ||
                (area.timeCommitment === "moderate" && "Moderado") ||
                "Alto"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium">Capital</span>
            </div>
            <p className={`text-sm font-semibold ${getCapitalColor(area.capitalRequirement)}`}>
              {CAPITAL_RANGES[area.id]?.[userLevel] || 
                (area.capitalRequirement === "low" && "< $500") ||
                (area.capitalRequirement === "medium" && "$500-$5K") ||
                "$5K+"}
            </p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <h4 className="font-semibold text-sm">Por qué es ideal para ti:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{area.detailedDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {area.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button variant="outline" className="w-full group bg-transparent mt-auto">
          <span className="truncate">
            Aprender más sobre <span className="hidden sm:inline">{area.name}</span>
            <span className="sm:hidden">esta estrategia</span>
          </span>
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
        <div className="mt-2">
          <Disclaimer variant="subtle" />
        </div>
      </CardContent>
    </Card>
  )
}
