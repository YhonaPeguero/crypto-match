import { supabase, isSupabaseConfigured } from "./supabase"
import type { QuizResponse, QuizResult } from "@/types/quiz"

export async function saveQuizResults(
  sessionId: string,
  responses: QuizResponse[],
  recommendations: QuizResult[],
): Promise<void> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("Supabase no está configurado. Omitiendo guardado de resultados del quiz.")
      return
    }

    const { error } = await supabase.from("quiz_responses").insert({
      session_id: sessionId,
      responses: responses,
      recommendations: recommendations.map((r) => ({
        areaId: r.area.id,
        score: r.score,
        isPrimary: r.isPrimary,
      })),
    })

    if (error) {
      console.error("Failed to save quiz results:", error)
      throw error
    }
  } catch (error) {
    console.error("Error saving quiz results:", error)
    throw error
  }
}

export async function getQuizStats(): Promise<{
  totalResponses: number
  popularAreas: Array<{ area: string; count: number }>
}> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return { totalResponses: 0, popularAreas: [] }
    }

    // Obtener total de respuestas
    const { count: totalResponses } = await supabase.from("quiz_responses").select("*", { count: "exact", head: true })

    // Áreas populares (en un caso real requeriría agregaciones más complejas)
    const { data: responses } = await supabase.from("quiz_responses").select("recommendations").limit(100)

    const areaCounts: Record<string, number> = {}

    responses?.forEach((response) => {
      if (response.recommendations && Array.isArray(response.recommendations)) {
        response.recommendations.forEach((rec: any) => {
          if (rec.isPrimary) {
            areaCounts[rec.areaId] = (areaCounts[rec.areaId] || 0) + 1
          }
        })
      }
    })

    const popularAreas = Object.entries(areaCounts)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalResponses: totalResponses || 0,
      popularAreas,
    }
  } catch (error) {
    console.error("Error fetching quiz stats:", error)
    return {
      totalResponses: 0,
      popularAreas: [],
    }
  }
}
