export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "slider" | "rating"
  question: string
  description?: string
  options?: string[]
  min?: number
  max?: number
  step?: number
  required: boolean
}

export interface QuizResponse {
  questionId: string
  value: string | number
  timestamp: Date
}

export interface CryptoArea {
  id: string
  name: string
  description: string
  riskLevel: "low" | "medium" | "high"
  timeCommitment: "minimal" | "moderate" | "high"
  capitalRequirement: "low" | "medium" | "high"
  tags: string[]
  detailedDescription: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export type UserLevel = 'principiante' | 'intermedio' | 'avanzado'

export interface QuizResult {
  area: CryptoArea
  score: number
  isPrimary: boolean
  userLevel: UserLevel
}

export interface QuizSession {
  sessionId: string
  responses: QuizResponse[]
  currentStep: number
  startTime: Date
  completed: boolean
}
