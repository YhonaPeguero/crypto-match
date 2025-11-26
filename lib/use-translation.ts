"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { Language, getTranslation } from './translations'

export interface TranslationContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

export type { Language }

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('es')
  const [isLoading, setIsLoading] = useState(false) // Siempre false para evitar loading

  // Función simplificada que no modifica URL
  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // No hacer nada más para evitar modificar URL
  }

  const t = (key: string) => {
    return getTranslation(language, key)
  }

  return {
    language,
    setLanguage: updateLanguage,
    t,
    isLoading
  }
}
