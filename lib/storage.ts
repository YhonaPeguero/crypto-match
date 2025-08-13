import type { QuizSession } from "@/types/quiz"

const STORAGE_KEYS = {
  QUIZ_SESSION: "crypto-quiz-session",
  SESSION_ID: "crypto-quiz-session-id",
} as const

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID)
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId)
  }
  return sessionId
}

export function saveQuizSession(session: QuizSession): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.QUIZ_SESSION, JSON.stringify(session))
}

export function loadQuizSession(): QuizSession | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_SESSION)
  if (!stored) return null

  try {
    const session = JSON.parse(stored)
    // Convert date strings back to Date objects
    session.startTime = new Date(session.startTime)
    session.responses = session.responses.map((r: any) => ({
      ...r,
      timestamp: new Date(r.timestamp),
    }))
    return session
  } catch {
    return null
  }
}

export function clearQuizSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.QUIZ_SESSION)
}
