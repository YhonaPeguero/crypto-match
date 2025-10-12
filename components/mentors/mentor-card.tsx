"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, DollarSign, Users, MessageCircle, ExternalLink, X } from "lucide-react"
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
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [recipientWallet, setRecipientWallet] = useState("0xDf8303e583C4c18D6a1159D111cc51A16031257f")
  const [customAmount, setCustomAmount] = useState(mentor.priceUSDC.toString())

  // Manejar scroll lock y reset de estado cuando se abre el modal
  useEffect(() => {
    if (showPaymentModal) {
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden'
      
      // Solo resetear estado si no hay procesamiento en curso
      if (!isProcessing) {
        setPaymentStatus(null)
        setRecipientWallet("0xDf8303e583C4c18D6a1159D111cc51A16031257f")
        setCustomAmount(mentor.priceUSDC.toString())
      }
      
      // Listener para cerrar con Escape (solo si no está procesando)
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !isProcessing) {
          setShowPaymentModal(false)
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      // Cleanup function
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      // Restaurar scroll del body
      document.body.style.overflow = 'unset'
    }
  }, [showPaymentModal, mentor.priceUSDC, isProcessing])

  // Función para manejar cancelación manual del usuario
  const handleManualCancel = () => {
    console.log('Usuario canceló manualmente el pago')
    setIsProcessing(false)
    setPaymentStatus('Pago cancelado por el usuario')
    setTimeout(() => {
      setShowPaymentModal(false)
    }, 1000)
  }

  const handlePayment = async () => {
    // Validaciones de seguridad
    if (!validateMentorId(mentor.id)) {
      logSecurityEvent('INVALID_MENTOR_ID', { mentorId: mentor.id })
      setPaymentStatus('ID de mentor inválido')
      return
    }

    if (!validatePaymentAmount(customAmount)) {
      logSecurityEvent('INVALID_PAYMENT_AMOUNT', { amount: customAmount })
      setPaymentStatus('Monto de pago inválido')
      return
    }

    if (!recipientWallet || !recipientWallet.startsWith('0x') || recipientWallet.length !== 42) {
      setPaymentStatus('Error: Dirección de wallet inválida')
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
      const sanitizedAmount = customAmount.toString()
      const sanitizedWallet = sanitizeString(recipientWallet)
      
      // Agregar timeout para detectar cancelación
      const paymentPromise = pay({
        amount: sanitizedAmount,
        to: sanitizedWallet,
        testnet: true // Cambiar a false para mainnet
      })
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Payment timeout - user may have cancelled')), 30000) // 30 segundos timeout
      })
      
      const result = await Promise.race([paymentPromise, timeoutPromise])
      const { id } = result as any

      // Validar respuesta del pago
      if (!id || typeof id !== 'string') {
        throw new Error('ID de transacción inválido o pago cancelado')
      }

      setPaymentStatus(`Pago iniciado! ID: ${sanitizeString(id)}`)
      onPaymentInitiated?.(mentor.id, sanitizedAmount)
      
      logSecurityEvent('PAYMENT_SUCCESS', { 
        mentorId: mentor.id, 
        amount: customAmount,
        transactionId: id,
        recipientWallet: sanitizedWallet
      })
      
      // Cerrar modal después del pago exitoso
      setShowPaymentModal(false)
    } catch (error) {
      console.error('Error en el pago:', error)
      
      // Verificar si es un error de cancelación del usuario
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const isUserCancellation = errorMessage.includes('User rejected') || 
                                 errorMessage.includes('User denied') || 
                                 errorMessage.includes('cancelled') ||
                                 errorMessage.includes('rejected') ||
                                 errorMessage.includes('timeout') ||
                                 errorMessage.includes('Payment timeout') ||
                                 errorMessage.includes('ID de transacción inválido o pago cancelado')
      
      if (isUserCancellation) {
        setPaymentStatus('Pago cancelado por el usuario')
        // Cerrar modal inmediatamente después de cancelación
        setTimeout(() => {
          setShowPaymentModal(false)
        }, 1000) // Reducido a 1 segundo
      } else {
        setPaymentStatus('Error en el pago')
      }
      
      logSecurityEvent('PAYMENT_ERROR', { 
        mentorId: mentor.id, 
        amount: customAmount,
        error: errorMessage,
        isUserCancellation
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
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Pagar con Base</span>
            </div>
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

      {/* Modal de Pago usando Portal */}
      {showPaymentModal && createPortal(
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isProcessing) {
              setShowPaymentModal(false)
            }
          }}
        >
          <div 
            className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {isProcessing ? 'Procesando Pago...' : 'Configurar Pago'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => !isProcessing && setShowPaymentModal(false)}
                disabled={isProcessing}
                className="h-8 w-8 p-0 hover:bg-accent disabled:opacity-50"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dirección de Wallet del Mentor
                </label>
                <input
                  type="text"
                  value={recipientWallet}
                  onChange={(e) => setRecipientWallet(e.target.value)}
                  placeholder="0x..."
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Dirección donde se enviará el pago
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cantidad (USDC)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Precio sugerido: ${mentor.priceUSDC} USDC
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                {isProcessing ? (
                  <Button
                    variant="outline"
                    onClick={handleManualCancel}
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Cancelar Pago
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !recipientWallet || !customAmount}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Pagar {customAmount} USDC</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </Card>
  )
}
