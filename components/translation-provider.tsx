"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useLanguage } from '@/lib/use-translation'
import { Language, TranslationContextType } from '@/lib/use-translation'

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const { language, setLanguage, t, isLoading } = useLanguage()

  const contextValue: TranslationContextType = {
    language,
    setLanguage,
    t
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
