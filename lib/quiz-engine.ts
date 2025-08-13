import type { QuizResponse, QuizResult } from "@/types/quiz"
import { CRYPTO_AREAS } from "./quiz-data"

interface AreaScore {
  area: string
  score: number
}

export function calculateRecommendations(responses: QuizResponse[]): QuizResult[] {
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
