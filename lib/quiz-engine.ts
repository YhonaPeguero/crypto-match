import type { QuizResponse, QuizResult } from "@/types/quiz"
import { CRYPTO_AREAS } from "./quiz-data"

interface AreaScore {
  area: string
  score: number
}

export type UserLevel = 'principiante' | 'intermedio' | 'avanzado'

export interface TimeRange {
  principiante: string
  intermedio: string
  avanzado: string
}

export interface CapitalRange {
  principiante: string
  intermedio: string
  avanzado: string
}

export const TIME_RANGES: Record<string, TimeRange> = {
  spotHolding: {
    principiante: '1–2 horas al mes',
    intermedio: '1–2 horas a la semana',
    avanzado: '10–15 min al día + 2–3 horas al mes'
  },
  airdrops: {
    principiante: '2–4 horas a la semana',
    intermedio: '5–10 horas a la semana',
    avanzado: '2–4 horas al día'
  },
  defi: {
    principiante: '2–3 horas a la semana',
    intermedio: '5–7 horas a la semana',
    avanzado: '1–2 horas al día'
  },
  futuresTrading: {
    principiante: '1–2 horas al día',
    intermedio: '3–5 horas al día',
    avanzado: '5+ horas al día'
  },
  memeCoins: {
    principiante: '30–60 min al día',
    intermedio: '1–3 horas al día',
    avanzado: '3+ horas al día'
  },
  nfts: {
    principiante: '2–4 horas a la semana',
    intermedio: '1–2 horas al día',
    avanzado: '3+ horas al día'
  }
}

export const CAPITAL_RANGES: Record<string, CapitalRange> = {
  spotHolding: {
    principiante: '$100–$500',
    intermedio: '$1,000–$5,000',
    avanzado: '$10,000+'
  },
  airdrops: {
    principiante: '$50–$200',
    intermedio: '$500–$1,000',
    avanzado: '$2,000+'
  },
  defi: {
    principiante: '$200–$500',
    intermedio: '$1,000–$5,000',
    avanzado: '$10,000+'
  },
  futuresTrading: {
    principiante: '$200–$1,000',
    intermedio: '$1,000–$10,000',
    avanzado: '$10,000+'
  },
  memeCoins: {
    principiante: '$50–$300',
    intermedio: '$300–$2,000',
    avanzado: '$2,000+'
  },
  nfts: {
    principiante: '$50–$500',
    intermedio: '$500–$3,000',
    avanzado: '$3,000+'
  }
}

export function determineUserLevel(responses: QuizResponse[]): UserLevel {
  const experienceAnswers = responses.find(r => r.questionId === 'experience-level')
  const capitalAnswers = responses.find(r => r.questionId === 'capital-amount')
  const techAnswers = responses.find(r => r.questionId === 'tech-comfort')
  
  let score = 0
  
  // Experiencia
  if (experienceAnswers?.value === 'Complete beginner - New to crypto') {
    score += 0
  } else if (experienceAnswers?.value === 'Basic knowledge - Understand wallet basics') {
    score += 2
  } else if (experienceAnswers?.value === 'Intermediate - Have made some trades') {
    score += 4
  } else if (experienceAnswers?.value === 'Advanced - Comfortable with DeFi/staking') {
    score += 6
  } else if (experienceAnswers?.value === 'Expert - Actively farming/staking/trading') {
    score += 8
  }
  
  // Capital
  if (capitalAnswers?.value === 'Under $100 - Just getting started') {
    score += 0
  } else if (capitalAnswers?.value === '$100-$1,000 - Testing the waters') {
    score += 1
  } else if (capitalAnswers?.value === '$1,000-$10,000 - Serious but cautious') {
    score += 2
  } else if (capitalAnswers?.value === 'Over $10,000 - Ready to make significant moves') {
    score += 3
  }
  
  // Comfort técnico
  const techValue = typeof techAnswers?.value === 'number' ? techAnswers.value : Number(techAnswers?.value)
  if (techValue <= 2) {
    score += 0
  } else if (techValue <= 3) {
    score += 1
  } else if (techValue <= 4) {
    score += 2
  } else {
    score += 3
  }
  
  // Determinar nivel basado en puntuación total (0-14)
  if (score <= 4) {
    return 'principiante'
  } else if (score <= 10) {
    return 'intermedio'
  } else {
    return 'avanzado'
  }
}

export function calculateRecommendations(responses: QuizResponse[]): QuizResult[] {
  // Determinar nivel del usuario
  const userLevel = determineUserLevel(responses)
  
  // Initialize scores for each crypto area
  const scores: Record<string, number> = {
    spotHolding: 0,
    airdrops: 0,
    defi: 0,
    futuresTrading: 0,
    nfts: 0,
    memeCoins: 0,
  }

  // Process each response and update scores
  responses.forEach((response) => {
    const { questionId, value } = response

    switch (questionId) {
      case "experience":
        if (value === "Complete beginner - I've heard of Bitcoin but that's about it") {
          scores.spotHolding += 4
          scores.airdrops += 2
        } else if (value === "Some knowledge - I understand basics but haven't invested") {
          scores.spotHolding += 3
          scores.airdrops += 3
          scores.defi += 1
        } else if (value === "Moderate experience - I've bought and held some crypto") {
          scores.spotHolding += 2
          scores.defi += 3
          scores.airdrops += 2
          scores.futuresTrading += 1
        } else if (value === "Experienced - I actively trade and understand DeFi") {
          scores.defi += 4
          scores.futuresTrading += 3
          scores.nfts += 2
          scores.memeCoins += 2
        }
        break

      case "risk-tolerance":
        const riskValue = Number(value)
        if (riskValue <= 3) {
          scores.spotHolding += 4
          scores.airdrops += 2
        } else if (riskValue <= 6) {
          scores.spotHolding += 2
          scores.defi += 3
          scores.airdrops += 3
        } else if (riskValue <= 8) {
          scores.defi += 2
          scores.futuresTrading += 3
          scores.nfts += 2
          scores.memeCoins += 2
        } else {
          scores.futuresTrading += 4
          scores.memeCoins += 4
          scores.nfts += 3
        }
        break

      case "time-commitment":
        if (value === "Less than 30 minutes - I want passive approaches") {
          scores.spotHolding += 4
          scores.defi += 2
        } else if (value === "30-60 minutes - I can check markets and do research") {
          scores.spotHolding += 2
          scores.airdrops += 4
          scores.defi += 3
        } else if (value === "1-3 hours - I'm willing to actively manage positions") {
          scores.airdrops += 3
          scores.defi += 4
          scores.futuresTrading += 2
          scores.nfts += 3
        } else if (value === "3+ hours - I want to be deeply involved in trading") {
          scores.futuresTrading += 4
          scores.memeCoins += 4
          scores.nfts += 3
          scores.airdrops += 2
        }
        break

      case "capital-amount":
        if (value === "Under $100 - Just getting started") {
          scores.airdrops += 4
          scores.spotHolding += 2
          scores.memeCoins += 2
        } else if (value === "$100-$1,000 - Testing the waters") {
          scores.spotHolding += 3
          scores.airdrops += 3
          scores.defi += 2
          scores.memeCoins += 2
        } else if (value === "$1,000-$10,000 - Serious but cautious") {
          scores.spotHolding += 3
          scores.defi += 4
          scores.futuresTrading += 2
          scores.nfts += 2
        } else if (value === "Over $10,000 - Ready to make significant moves") {
          scores.defi += 4
          scores.futuresTrading += 3
          scores.nfts += 3
          scores.spotHolding += 2
        }
        break

      case "learning-style":
        if (value === "Simple and straightforward - Just tell me what to do") {
          scores.spotHolding += 4
        } else if (value === "Step-by-step guides - I like detailed instructions") {
          scores.spotHolding += 2
          scores.defi += 3
          scores.airdrops += 2
        } else if (value === "Research and experiment - I enjoy figuring things out") {
          scores.airdrops += 4
          scores.defi += 3
          scores.futuresTrading += 2
          scores.nfts += 2
        } else if (value === "Community and discussion - I learn best from others") {
          scores.nfts += 3
          scores.memeCoins += 3
          scores.airdrops += 2
        }
        break

      case "goals":
        if (value === "Long-term wealth building - Set it and forget it") {
          scores.spotHolding += 4
          scores.defi += 2
        } else if (value === "Generate passive income - Earn while I hold") {
          scores.defi += 4
          scores.spotHolding += 2
          scores.airdrops += 2
        } else if (value === "Active trading profits - Make money from price movements") {
          scores.futuresTrading += 4
          scores.memeCoins += 3
          scores.nfts += 2
        } else if (value === "Learn and explore - Understand the technology") {
          scores.airdrops += 4
          scores.defi += 3
          scores.nfts += 2
        }
        break

      case "tech-comfort":
        const techValue = Number(value)
        if (techValue <= 2) {
          scores.spotHolding += 3
        } else if (techValue <= 3) {
          scores.spotHolding += 2
          scores.defi += 2
        } else if (techValue <= 4) {
          scores.defi += 3
          scores.airdrops += 3
          scores.futuresTrading += 1
        } else {
          scores.airdrops += 4
          scores.defi += 3
          scores.futuresTrading += 3
          scores.nfts += 3
          scores.memeCoins += 2
        }
        break

      case "market-volatility":
        if (value === "Panic and sell immediately") {
          scores.spotHolding += 2
        } else if (value === "Feel stressed but hold on") {
          scores.spotHolding += 3
          scores.defi += 1
        } else if (value === "Stay calm and wait it out") {
          scores.spotHolding += 3
          scores.defi += 3
          scores.airdrops += 2
        } else if (value === "Buy more at the lower price") {
          scores.defi += 2
          scores.futuresTrading += 3
          scores.memeCoins += 3
          scores.nfts += 2
        }
        break
    }
  })

  // Convert scores to results and sort by score
  const results: AreaScore[] = Object.entries(scores)
    .map(([area, score]) => ({ area, score }))
    .sort((a, b) => b.score - a.score)

  // Get top 3 recommendations
  const topResults = results.slice(0, 3)

  // Calculate percentage scores (normalize to 100%)
  const maxScore = topResults[0]?.score || 1
  const minScore = Math.min(...topResults.map((r) => r.score))
  const scoreRange = maxScore - minScore || 1

  return topResults.map((result, index) => {
    const normalizedScore = Math.max(60, Math.min(100, 60 + ((result.score - minScore) / scoreRange) * 40))

    return {
      area: CRYPTO_AREAS[result.area],
      score: Math.round(normalizedScore),
      isPrimary: index === 0,
      userLevel,
    }
  })
}

export function getQuestionProgress(currentStep: number, totalQuestions: number): number {
  return Math.round((currentStep / totalQuestions) * 100)
}

export function validateResponse(questionId: string, value: string | number): boolean {
  if (value === null || value === undefined || value === "") {
    return false
  }

  // Add specific validation logic if needed
  if (typeof value === "number") {
    return value >= 1 && value <= 10
  }

  return true
}
