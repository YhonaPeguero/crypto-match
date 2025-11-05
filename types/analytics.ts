export interface AnalyticsEvent {
  sessionId: string
  eventType: string
  eventData?: Record<string, any>
  timestamp: Date
}

export const ANALYTICS_EVENTS = {
  QUIZ_STARTED: "quiz_started",
  QUESTION_ANSWERED: "question_answered",
  QUIZ_COMPLETED: "quiz_completed",
  RESULTS_VIEWED: "results_viewed",
  RECOMMENDATION_CLICKED: "recommendation_clicked",
  QUIZ_SHARED: "quiz_shared",
  QUIZ_RETAKEN: "quiz_retaken",
  PAGE_VIEW: "page_view",
  MENTOR_PAYMENT_INITIATED: "mentor_payment_initiated",
} as const

export type AnalyticsEventType = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]
