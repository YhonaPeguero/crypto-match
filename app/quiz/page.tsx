"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProgressBar } from "@/components/quiz/progress-bar"
import { QuizCard } from "@/components/quiz/quiz-card"
import { QUIZ_QUESTIONS } from "@/lib/quiz-data"
import { calculateRecommendations, validateResponse } from "@/lib/quiz-engine"
import { saveQuizSession, loadQuizSession, getSessionId } from "@/lib/storage"
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics"
import type { QuizResponse, QuizSession } from "@/types/quiz"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize quiz session
  useEffect(() => {
    const existingSession = loadQuizSession()

    if (existingSession && !existingSession.completed) {
      setCurrentStep(existingSession.currentStep)
      setResponses(existingSession.responses)
    } else {
      // Start new session
      trackEvent(ANALYTICS_EVENTS.QUIZ_STARTED)
    }

    setIsLoading(false)
  }, [])

  // Save session on changes
  useEffect(() => {
    if (!isLoading) {
      const session: QuizSession = {
        sessionId: getSessionId(),
        responses,
        currentStep,
        startTime: new Date(),
        completed: false,
      }
      saveQuizSession(session)
    }
  }, [responses, currentStep, isLoading])

  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const currentResponse = responses.find((r) => r.questionId === currentQuestion?.id)

  const handleAnswer = (value: string | number) => {
    if (!currentQuestion) return

    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date(),
    }

    setResponses((prev) => {
      const filtered = prev.filter((r) => r.questionId !== currentQuestion.id)
      return [...filtered, newResponse]
    })

    trackEvent(ANALYTICS_EVENTS.QUESTION_ANSWERED, {
      question_id: currentQuestion.id,
      answer: value,
      question_number: currentStep + 1,
    })
  }

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Quiz completed - calculate results and redirect
      const recommendations = calculateRecommendations(responses)

      trackEvent(ANALYTICS_EVENTS.QUIZ_COMPLETED, {
        total_questions: QUIZ_QUESTIONS.length,
        recommendations: recommendations.map((r) => r.area.id),
      })

      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "quiz-results",
        JSON.stringify({
          responses,
          recommendations,
        }),
      )

      router.push("/results")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canGoNext = Boolean(currentResponse && validateResponse(currentQuestion?.id, currentResponse.value))
  const canGoPrevious = currentStep > 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Header />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background relative">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          Quiz no encontrado
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] animate-pulse-slow" style={{animationDelay: "1.5s"}}></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProgressBar currentStep={currentStep + 1} totalSteps={QUIZ_QUESTIONS.length} />

          <div role="main" aria-live="polite" aria-label={`Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`}>
            <QuizCard
              question={currentQuestion}
              value={currentResponse?.value || null}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              isLastQuestion={currentStep === QUIZ_QUESTIONS.length - 1}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
