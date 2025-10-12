"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { MentorCard } from "@/components/mentors/mentor-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star, DollarSign, Clock, Shield, Zap } from "lucide-react"
import { MENTORS, getMentorsByStrategy, type Mentor } from "@/lib/mentors-data"
import { trackEvent } from "@/lib/analytics"
import { validateMentorData, sanitizeString, logSecurityEvent } from "@/lib/security"

const STRATEGY_FILTERS = [
  { id: "all", name: "Todos", count: MENTORS.length },
  { id: "defi", name: "DeFi", count: getMentorsByStrategy("defi").length },
  { id: "airdrops", name: "Airdrops", count: getMentorsByStrategy("airdrops").length },
  { id: "spotHolding", name: "Spot Trading", count: getMentorsByStrategy("spotHolding").length },
  { id: "futuresTrading", name: "Futures", count: getMentorsByStrategy("futuresTrading").length },
]

export default function MentoresPage() {
  const [selectedStrategy, setSelectedStrategy] = useState("all")
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  const filteredMentors = selectedStrategy === "all" 
    ? MENTORS 
    : getMentorsByStrategy(selectedStrategy)

  const handlePaymentInitiated = (mentorId: string, amount: string) => {
    // Validar datos antes de procesar
    if (!validateMentorData({ id: mentorId, priceUSDC: parseFloat(amount) })) {
      logSecurityEvent('INVALID_PAYMENT_DATA', { mentorId, amount })
      setPaymentStatus('Datos de pago inválidos')
      return
    }

    const sanitizedMentorId = sanitizeString(mentorId)
    const sanitizedAmount = sanitizeString(amount)
    
    setPaymentStatus(`Pago de ${sanitizedAmount} USDC iniciado para mentor ${sanitizedMentorId}`)
    
    trackEvent("MENTOR_PAYMENT_INITIATED", {
      mentor_id: sanitizedMentorId,
      amount_usdc: parseFloat(sanitizedAmount),
      strategy: selectedStrategy
    })
  }

  const stats = {
    totalMentors: MENTORS.length,
    averageRating: (MENTORS.reduce((sum, mentor) => sum + mentor.rating, 0) / MENTORS.length).toFixed(1),
    totalReviews: MENTORS.reduce((sum, mentor) => sum + mentor.reviews, 0),
    verifiedMentors: MENTORS.filter(m => m.verified).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl md:text-4xl font-bold">Mentores Expertos</h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conecta con mentores verificados que te ayudarán a implementar tu estrategia crypto ideal. 
              Paga directamente con USDC usando Base Network.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.totalMentors}</div>
                <div className="text-sm text-muted-foreground">Mentores</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.averageRating}</div>
                <div className="text-sm text-muted-foreground">Rating Promedio</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.totalReviews}</div>
                <div className="text-sm text-muted-foreground">Reseñas</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.verifiedMentors}</div>
                <div className="text-sm text-muted-foreground">Verificados</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <Card className="bg-card/50 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-center">
                <Shield className="h-6 w-6 text-green-500" />
                <span className="text-lg md:text-xl">¿Por qué elegir nuestros mentores?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Verificados</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros mentores están verificados y tienen experiencia comprobada
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Pagos en USDC</h3>
                  <p className="text-sm text-muted-foreground">
                    Paga directamente con crypto usando Base Network, sin intermediarios
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Acceso Inmediato</h3>
                  <p className="text-sm text-muted-foreground">
                    Conecta instantáneamente con tu mentor después del pago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {STRATEGY_FILTERS.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedStrategy === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStrategy(filter.id)}
                className={selectedStrategy === filter.id ? 
                  "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" : 
                  "bg-transparent"
                }
              >
                {filter.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Payment Status */}
          {paymentStatus && (
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <p className="text-green-800 dark:text-green-200">{paymentStatus}</p>
              </CardContent>
            </Card>
          )}

          {/* Mentors Grid */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onPaymentInitiated={handlePaymentInitiated}
              />
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <Card className="bg-card/50 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay mentores disponibles</h3>
                <p className="text-muted-foreground">
                  No encontramos mentores para la estrategia seleccionada. Prueba con otra categoría.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
