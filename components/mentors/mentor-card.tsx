"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, DollarSign, Users, MessageCircle, ExternalLink } from "lucide-react"
import { BasePayButton } from "@base-org/account-ui/react"
import { pay } from "@base-org/account"
import { 
  validatePaymentAmount, 
  validateMentorId, 
  checkRateLimit, 
  logSecurityEvent,
  sanitizeString 
} from "@/lib/security"

interface Mentor {
  id: string
  name: string
  strategy: string
  strategyId: string
  description: string
  experience: string
  rating: number
  reviews: number
  priceUSDC: number
  duration: string
  specializations: string[]
  avatar: string
  verified: boolean
}

interface MentorCardProps {
  mentor: Mentor
  onPaymentInitiated?: (mentorId: string, amount: string) => void
}

export function MentorCard({ mentor, onPaymentInitiated }: MentorCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  const handlePayment = async () => {
    // Validaciones de seguridad
    if (!validateMentorId(mentor.id)) {
      logSecurityEvent('INVALID_MENTOR_ID', { mentorId: mentor.id })
      setPaymentStatus('ID de mentor inválido')
      return
    }

    if (!validatePaymentAmount(mentor.priceUSDC)) {
      logSecurityEvent('INVALID_PAYMENT_AMOUNT', { amount: mentor.priceUSDC })
      setPaymentStatus('Monto de pago inválido')
      return
    }

    // Rate limiting
    const rateLimitKey = `payment_${mentor.id}`
    if (!checkRateLimit(rateLimitKey, 3, 300000)) { // 3 pagos por 5 minutos
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { mentorId: mentor.id })
      setPaymentStatus('Demasiados intentos. Espera 5 minutos.')
      return
    }

    setIsProcessing(true)
    setPaymentStatus("Iniciando pago...")
    
    try {
      const sanitizedAmount = mentor.priceUSDC.toString()
      
      const { id } = await pay({
        amount: sanitizedAmount,
        to: '0xRecipientAddress', // Reemplazar con dirección del mentor
        testnet: true // Cambiar a false para mainnet
      })

      // Validar respuesta del pago
      if (!id || typeof id !== 'string') {
        throw new Error('ID de transacción inválido')
      }

      setPaymentStatus(`Pago iniciado! ID: ${sanitizeString(id)}`)
      onPaymentInitiated?.(mentor.id, sanitizedAmount)
      
      logSecurityEvent('PAYMENT_SUCCESS', { 
        mentorId: mentor.id, 
        amount: mentor.priceUSDC,
        transactionId: id 
      })
    } catch (error) {
      console.error('Error en el pago:', error)
      setPaymentStatus('Error en el pago')
      
      logSecurityEvent('PAYMENT_ERROR', { 
        mentorId: mentor.id, 
        amount: mentor.priceUSDC,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getStrategyColor = (strategyId: string) => {
    switch (strategyId) {
      case 'defi':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
      case 'airdrops':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
      case 'spotHolding':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
      case 'futuresTrading':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
      case 'nfts':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
      case 'memeCoins':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
    }
  }

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <CardHeader className="relative z-10 space-y-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                {mentor.name.charAt(0)}
              </div>
              {mentor.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                {sanitizeString(mentor.name)}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({mentor.reviews} reseñas)
                </span>
              </div>
            </div>
          </div>
          <Badge className={`${getStrategyColor(mentor.strategyId)} text-xs font-medium px-3 py-1`}>
            {mentor.strategy}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {sanitizeString(mentor.description)}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{mentor.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-green-500" />
            <span>{mentor.experience}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Especializaciones:</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.specializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs bg-muted/50 hover:bg-muted/70 transition-colors">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <span className="text-2xl font-bold text-green-600">
                  ${mentor.priceUSDC}
                </span>
                <span className="text-sm text-muted-foreground ml-1">USDC</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Pagar con Base</span>
              </div>
            )}
          </Button>
        </div>

        {paymentStatus && (
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              {paymentStatus}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
