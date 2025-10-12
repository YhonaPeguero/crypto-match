"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Languages, Check } from "lucide-react"
import { useLanguage } from "@/lib/use-translation"
import { Language } from "@/lib/translations"

interface LanguageSelectorProps {
  className?: string
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 flex items-center justify-center hover:bg-accent transition-colors"
        aria-label="Select language"
      >
        <span className="text-lg">
          {currentLanguage?.flag}
        </span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-32 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center justify-between ${
                  language === lang.code ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-xs">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check className="h-3 w-3 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
