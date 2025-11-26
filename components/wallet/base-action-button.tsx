"use client"

import { useState, useEffect, useMemo, useCallback, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, CheckCircle, ExternalLink, TrendingUp, DollarSign } from "lucide-react"
import { SignInWithBaseButton } from "@base-org/account-ui/react"
import { createBaseAccountSDK } from "@base-org/account"
import type { QuizResult } from "@/types/quiz"

interface BaseActionButtonProps {
  primaryResult?: QuizResult
  onAccountConnected?: (address: string) => void
}

const BaseActionButton = memo(({ primaryResult, onAccountConnected }: BaseActionButtonProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Debugging refs
  const renderCount = useRef(0)
  const lastWalletState = useRef({ isConnected: false, accountAddress: null })

  // Log de renders para detectar loops
  renderCount.current += 1
  console.log('[LOCAL-DEBUG] BaseActionButton Render #:', renderCount.current, 'timestamp:', Date.now())
  
  if (renderCount.current > 10) {
    console.warn('[LOCAL-DEBUG] ⚠️ POSIBLE LOOP en BaseActionButton: Más de 10 renders!')
  }

  // Log de cambios de wallet - DEPENDENCIAS ESTRICTAS
  useEffect(() => {
    console.log('[WALLET-DEBUG] BaseActionButton Change:', { isConnected, accountAddress, timestamp: Date.now() });
    // NO setState dentro si causa loop
  }, [isConnected, accountAddress]); // Deps: Solo re-run en cambios reales

  // Inicializar SDK de Base Account UNA SOLA VEZ usando useMemo
  const sdk = useMemo(() => {
    console.log('[LOCAL-DEBUG] 🔧 Creando Base Account SDK (ActionButton) - timestamp:', Date.now())
    try {
      const sdkInstance = createBaseAccountSDK({
        appName: 'CryptoMatch',
        appLogoUrl: 'https://i.ibb.co/ds7x6csQ/logo.png',
      })
      console.log('[LOCAL-DEBUG] ✅ Base Account SDK (ActionButton) creado exitosamente')
      return sdkInstance
    } catch (error) {
      console.warn('[LOCAL-DEBUG] ❌ Error inicializando Base Account SDK (ActionButton):', error)
      return null
    }
  }, []) // Solo crear una vez - evita re-creación en cada render

  // Función debounced para verificar conexión - evita polling excesivo
  const debouncedCheckConnection = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout
      return () => {
        // DESACTIVAR TEMPORALMENTE EN DESARROLLO PARA TEST
        if (process.env.NODE_ENV === 'development') {
          console.log('[LOOP-FIX] Reconexión automática ActionButton desactivada para test')
          return
        }
        
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
          console.log('[LOCAL-DEBUG] 🔍 Verificando conexión ActionButton (debounced) - timestamp:', Date.now())
          try {
            const provider = sdk?.getProvider()
            if (provider) {
              const accounts = (await provider.request({ method: 'eth_accounts' })) as string[]
              if (process.env.NODE_ENV === 'development') {
                console.log('[LOCAL-DEBUG] Accounts:', accounts)
              }
              if (accounts && accounts.length > 0) {
                console.log('[LOCAL-DEBUG] ✅ Cuenta conectada encontrada:', accounts[0])
                setIsConnected(true)
                setAccountAddress(accounts[0])
                onAccountConnected?.(accounts[0])
              } else {
                console.log('[LOCAL-DEBUG] ℹ️ No hay cuentas conectadas')
              }
            } else {
              console.log('[LOCAL-DEBUG] ⚠️ Provider no disponible')
            }
          } catch (error) {
            console.log('[LOCAL-DEBUG] ℹ️ No hay cuenta conectada, esto es normal:', error)
          }
        }, 1000) // Debounce de 1 segundo
      }
    })(),
    [sdk, onAccountConnected]
  )

  useEffect(() => {
    debouncedCheckConnection()
  }, [debouncedCheckConnection])

  const handleSignIn = async () => {
    if (!sdk) {
      console.warn('[LOCAL-DEBUG] ⚠️ SDK no disponible, no se puede iniciar sesión')
      return
    }
    setIsLoading(true)
    try {
      await sdk.getProvider().request({ method: 'wallet_connect' })
      setIsConnected(true)
      
      const accounts = (await sdk.getProvider().request({ method: 'eth_accounts' })) as string[]
      if (accounts && accounts.length > 0) {
        setAccountAddress(accounts[0])
        onAccountConnected?.(accounts[0])
      }
    } catch (error) {
      console.error('Error al conectar cuenta:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStrategyAction = () => {
    if (!primaryResult) return null

    switch (primaryResult.area.id) {
      case 'defi':
        return {
          title: "Conecta para DeFi",
          description: "Accede a protocolos DeFi en Base para yield farming y staking",
          action: "Explorar DeFi en Base",
          icon: <TrendingUp className="h-4 w-4" />
        }
      case 'airdrops':
        return {
          title: "Conecta para Airdrops",
          description: "Participa en airdrops de Base y protocolos emergentes",
          action: "Ver Airdrops Activos",
          icon: <DollarSign className="h-4 w-4" />
        }
      case 'spotHolding':
        return {
          title: "Conecta para Trading",
          description: "Compra y mantén crypto en exchanges de Base",
          action: "Ver Exchanges Base",
          icon: <Wallet className="h-4 w-4" />
        }
      default:
        return {
          title: "Conecta Base Account",
          description: "Accede a herramientas crypto en Base Network",
          action: "Conectar Wallet",
          icon: <Wallet className="h-4 w-4" />
        }
    }
  }

  const strategyAction = getStrategyAction()

  if (isConnected && accountAddress) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Base Account Conectada
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-mono">
                  {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
                </p>
              </div>
            </div>
            
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                // Aquí podrías abrir un modal con acciones específicas o redirigir
                console.log('Acciones disponibles para:', primaryResult?.area.id)
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {strategyAction?.action}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          {strategyAction?.icon}
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
            {strategyAction?.title}
          </h3>
        </div>
        
        <p className="text-sm text-orange-700 dark:text-orange-300 max-w-md mx-auto">
          {strategyAction?.description}
        </p>

        <div className="flex flex-col items-center gap-3">
          <div style={{ maxWidth: '250px' }}>
            <SignInWithBaseButton 
              align="center"
              variant="solid"
              colorScheme="light"
              onClick={handleSignIn}
            />
          </div>
          
          {isLoading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mx-auto mb-1"></div>
              <p className="text-xs text-orange-600 dark:text-orange-400">Conectando...</p>
            </div>
          )}
        </div>

        <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
          ✨ Conectar tu Base Account te permitirá acceder a herramientas específicas para tu estrategia recomendada
        </p>
      </CardContent>
    </Card>
  )
})

export { BaseActionButton }
