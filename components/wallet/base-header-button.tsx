"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, CheckCircle, LogOut, ChevronDown, Copy, ExternalLink } from "lucide-react"
import { createBaseAccountSDK } from "@base-org/account"

// Declarar tipos para window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

interface BaseHeaderButtonProps {
  onAccountConnected?: (address: string) => void
  onAccountDisconnected?: () => void
}

export function BaseHeaderButton({ onAccountConnected, onAccountDisconnected }: BaseHeaderButtonProps) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnected, setIsDisconnected] = useState(false)

  // Inicializar SDK de Base Account con manejo de errores
  const sdk = (() => {
    try {
      return createBaseAccountSDK({
        appName: 'CryptoMatch',
        appLogoUrl: 'https://i.ibb.co/ds7x6csQ/logo.png',
      })
    } catch (error) {
      console.warn('Error inicializando Base Account SDK:', error)
      return null
    }
  })()

  // Verificar conexión al cargar el componente
  useEffect(() => {
    const checkConnection = async () => {
      // Si no hay SDK disponible, no hacer nada
      if (!sdk) {
        console.log('SDK no disponible, saltando verificación')
        return
      }
      
      // Si el usuario se desconectó manualmente, no verificar conexión
      if (isDisconnected) {
        console.log('Usuario desconectado manualmente, saltando verificación')
        return
      }
      
      try {
        console.log('Verificando conexión...')
        
        // Verificar si hay una conexión guardada en localStorage
        const savedConnection = localStorage.getItem('base-account-connection')
        if (savedConnection) {
          const connectionData = JSON.parse(savedConnection)
          if (connectionData.address && /^0x[a-fA-F0-9]{40}$/.test(connectionData.address)) {
            console.log('Conexión encontrada en localStorage:', connectionData.address)
            setIsSignedIn(true)
            setAccountAddress(connectionData.address)
            onAccountConnected?.(connectionData.address)
            return
          }
        }

        // Si no hay conexión guardada, verificar provider
        const provider = sdk.getProvider()
        if (provider && typeof provider.request === 'function') {
          const accounts = await provider.request({ method: 'eth_accounts' })
          console.log('Cuentas del provider:', accounts)
          
          if (Array.isArray(accounts) && accounts.length > 0 && typeof accounts[0] === 'string') {
            if (/^0x[a-fA-F0-9]{40}$/.test(accounts[0])) {
              console.log('Cuenta válida encontrada:', accounts[0])
              setIsSignedIn(true)
              setAccountAddress(accounts[0])
              onAccountConnected?.(accounts[0])
              
              // Guardar en localStorage
              localStorage.setItem('base-account-connection', JSON.stringify({
                address: accounts[0],
                timestamp: Date.now()
              }))
            }
          }
        }
      } catch (error) {
        console.warn('Error verificando conexión:', error)
        // En caso de error, limpiar estado
        setIsSignedIn(false)
        setAccountAddress(null)
      }
    }

    checkConnection()
  }, []) // Solo ejecutar una vez al montar - evita bucle infinito

  // Agregar listeners para eventos de desconexión del wallet
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      console.log('Accounts changed:', accounts)
      if (!accounts || accounts.length === 0) {
        // Wallet desconectado
        console.log('Wallet desconectado por accountsChanged')
        setIsSignedIn(false)
        setAccountAddress(null)
        localStorage.removeItem('base-account-connection')
        onAccountDisconnected?.()
      }
    }

    const handleDisconnect = () => {
      console.log('Wallet disconnected event')
      setIsSignedIn(false)
      setAccountAddress(null)
      localStorage.removeItem('base-account-connection')
      onAccountDisconnected?.()
    }

    // Agregar listeners si el provider está disponible
    if (!sdk) return
    
    const provider = sdk.getProvider()
    if (provider && typeof provider.on === 'function') {
      console.log('Agregando listeners de wallet')
      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('disconnect', handleDisconnect)

      // Cleanup function
      return () => {
        console.log('Removiendo listeners de wallet')
        if (provider && typeof provider.removeListener === 'function') {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, []) // Solo ejecutar una vez al montar - evita bucle infinito

  // Función de sign-in
  const handleSignIn = async () => {
    if (isConnecting) return
    
    // Si no hay SDK disponible, no hacer nada
    if (!sdk) {
      console.log('SDK no disponible, no se puede conectar')
      return
    }
    
    setIsConnecting(true)
    try {
      console.log('Iniciando conexión...')
      
      // Intentar conectar
      await sdk.getProvider().request({ method: 'wallet_connect' })
      console.log('Conexión exitosa')
      
      // Obtener la dirección de la cuenta con timeout
      const accounts = await Promise.race([
        sdk.getProvider().request({ method: 'eth_accounts' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ])
      
      if (Array.isArray(accounts) && accounts.length > 0 && typeof accounts[0] === 'string') {
        console.log('Dirección obtenida:', accounts[0])
        setIsSignedIn(true)
        setAccountAddress(accounts[0])
        setIsDisconnected(false) // Resetear flag de desconexión
        onAccountConnected?.(accounts[0])
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('base-account-connection', JSON.stringify({
          address: accounts[0],
          timestamp: Date.now()
        }))
      } else {
        console.warn('No se pudo obtener la dirección de la cuenta')
        setIsSignedIn(false)
      }
    } catch (error) {
      console.error('Error en sign in:', error)
      setIsSignedIn(false)
      setAccountAddress(null)
    } finally {
      setIsConnecting(false)
    }
  }

  // Función de desconexión según documentación oficial de Base Account
  const handleDisconnect = () => {
    console.log('=== DESCONEXIÓN BASE ACCOUNT ===')
    
    try {
      // 1. Establecer flag de desconexión para prevenir reconexión automática
      console.log('Estableciendo flag de desconexión...')
      setIsDisconnected(true)
      
      // 2. Limpiar estado local (único método según docs)
      console.log('Limpiando estado local...')
      setIsSignedIn(false)
      setAccountAddress(null)
      setShowDropdown(false)
      
      // 3. Limpiar localStorage
      console.log('Limpiando localStorage...')
      localStorage.removeItem('base-account-connection')
      
      // 4. Limpiar también cualquier otro dato relacionado con Base Account
      if (typeof window !== 'undefined') {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.toLowerCase().includes('base')) {
            localStorage.removeItem(key)
          }
        })
      }
      
      // 5. Notificar desconexión
      console.log('Notificando desconexión...')
      onAccountDisconnected?.()
      
      console.log('✅ Desconexión completada según docs oficiales')
    } catch (error) {
      console.error('❌ Error en desconexión:', error)
    }
  }

  const formatAddress = (address: string) => {
    if (!address || address.length < 10) return '0x...'
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const copyAddress = async () => {
    if (accountAddress) {
      try {
        await navigator.clipboard.writeText(accountAddress)
        console.log('Dirección copiada al portapapeles')
      } catch (error) {
        console.error('Error al copiar:', error)
      }
    }
  }

  const openExplorer = () => {
    if (accountAddress) {
      window.open(`https://basescan.org/address/${accountAddress}`, '_blank')
    }
  }

  if (isSignedIn && accountAddress) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDropdown(!showDropdown)}
          className="h-10 px-4 flex items-center gap-2 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950/30 transition-all duration-200 text-sm font-medium"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="hidden sm:inline font-mono text-sm">
            {formatAddress(accountAddress)}
          </span>
          <span className="sm:hidden text-sm">Base</span>
          <ChevronDown className="h-4 w-4" />
        </Button>

        {showDropdown && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowDropdown(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {accountAddress.slice(2, 4).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium">
                      {formatAddress(accountAddress)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Base Network
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={copyAddress}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar dirección
                </button>
                
                <button
                  onClick={openExplorer}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver en BaseScan
                </button>
                
                <div className="border-t border-border my-2"></div>
                
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('🔴 BOTÓN DESCONECTAR CLICKEADO')
                    handleDisconnect()
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Desconectar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Si no hay SDK disponible, mostrar botón deshabilitado
  if (!sdk) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="h-10 px-4 flex items-center gap-2 bg-background border-border transition-colors text-sm opacity-50"
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">Wallet No Disponible</span>
        <span className="sm:hidden">Base</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignIn}
      disabled={isConnecting}
      className="h-10 px-4 flex items-center gap-2 bg-background hover:bg-accent border-border transition-colors text-sm"
    >
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
      </span>
      <span className="sm:hidden">
        {isConnecting ? '...' : 'Base'}
      </span>
    </Button>
  )
}