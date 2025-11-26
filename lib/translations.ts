// Sistema de traducciones para CryptoMatch

export type Language = 'es' | 'en'

export interface Translations {
  // Header
  header: {
    connectWallet: string
    connecting: string
    wallet: string
    disconnect: string
    clickToDisconnect: string
    copyAddress: string
    viewOnExplorer: string
    baseNetwork: string
  }
  
  // Home page
  home: {
    discoverStrategy: string
    findPerfectStrategy: string
    cryptoPerfect: string
    takeQuiz: string
    personalizedResults: string
    personalizedResultsDesc: string
    expertInsights: string
    expertInsightsDesc: string
    quickEasy: string
    quickEasyDesc: string
    anonymous: string
    anonymousDesc: string
    activeCommunity: string
    activeCommunityDesc: string
    readyToStart: string
    joinThousands: string
    takeQuizNow: string
    startQuiz: string
    takesMinutes: string
    noRegistration: string

    starRating: string
  }
  
  // Quiz
  quiz: {
    question: string
    of: string
    next: string
    previous: string
    seeResults: string
    completeQuiz: string
    goToNext: string
    goToPrevious: string
    calculatingStrategy: string
  }
  
  // Results
  results: {
    strategyResults: string
    yourBestOption: string
    basedOnAnswers: string
    backToHome: string
    restartTest: string
    readyToStart: string
    nextStep: string
    getExpertMentor: string
    learnMoreAbout: string
    exploreAllStrategies: string
    shareResults: string
    helpOthers: string
  }
  
  // Mentors
  mentors: {
    expertMentors: string
    connectWithMentors: string
    mentors: string
    averageRating: string
    reviews: string
    verified: string
    whyChooseMentors: string
    verifiedMentors: string
    verifiedMentorsDesc: string
    usdcPayments: string
    usdcPaymentsDesc: string
    instantAccess: string
    instantAccessDesc: string
    all: string
    defi: string
    airdrops: string
    spotTrading: string
    futures: string
    nfts: string
    memeCoins: string
    noMentorsAvailable: string
    noMentorsDesc: string
    connectWallet: string
    connecting: string
    baseAccountConnected: string
    payWithBase: string
    profile: string
    share: string
  }
  
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
    save: string
    delete: string
    edit: string
    close: string
    back: string
    next: string
    previous: string
    continue: string
    finish: string
  }
  
  // Disclaimer
  disclaimer: {
    nfa: string
    nfy: string
    notFinancialAdvice: string
    notFinancialAdviceDesc: string
    notFinancialAdviceDescLong: string
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    header: {
      connectWallet: 'Conectar Wallet',
      connecting: 'Conectando...',
      wallet: 'Base',
      disconnect: 'Desconectar',
      clickToDisconnect: 'Click para desconectar',
      copyAddress: 'Copiar dirección',
      viewOnExplorer: 'Ver en BaseScan',
      baseNetwork: 'Base Network'
    },
    
    home: {
      discoverStrategy: 'Descubre tu estrategia crypto ideal',
      findPerfectStrategy: 'Encuentra Tu Estrategia',
      cryptoPerfect: 'Crypto Perfecta',
      takeQuiz: 'Toma nuestro quiz personalizado y descubre el enfoque de criptomonedas que mejor se adapta a tus objetivos, tu tolerancia al riesgo y tu nivel de experiencia.',
      personalizedResults: 'Resultados Personalizados',
      personalizedResultsDesc: 'Obtén recomendaciones adaptadas a tu situación específica y objetivos',
      expertInsights: 'Insights de Expertos',
      expertInsightsDesc: 'Basado en estrategias y condiciones actuales del mercado',
      quickEasy: 'Rápido y Fácil',
      quickEasyDesc: 'Preguntas simples que toman solo unos minutos completar',
      anonymous: '100% Anónimo',
      anonymousDesc: 'No requerimos registro ni información personal. Tus respuestas son completamente privadas.',
      activeCommunity: 'Comunidad Activa',
      activeCommunityDesc: 'Únete a miles de personas que ya han descubierto su camino en el mundo crypto.',
      readyToStart: '¿Listo para Comenzar?',
      joinThousands: 'Únete a miles de personas que han descubierto su estrategia crypto ideal',
      takeQuizNow: 'Tomar el Quiz Ahora',
      startQuiz: 'Comenzar Quiz',
      takesMinutes: 'Toma 2-3 minutos',
      noRegistration: 'Sin registro',
      starRating: '4.8/5 (2.3k+)'
    },
    
    quiz: {
      question: 'Pregunta',
      of: 'de',
      next: 'Siguiente',
      previous: 'Anterior',
      seeResults: 'Ver Resultados',
      completeQuiz: 'Completar quiz y obtener resultados',
      goToNext: 'Ir a la siguiente pregunta',
      goToPrevious: 'Ir a la pregunta anterior',
      calculatingStrategy: 'Calculando tu estrategia crypto perfecta...'
    },
    
    results: {
      strategyResults: 'Resultados de tu Estrategia Crypto',
      yourBestOption: 'Tu Mejor Opción',
      basedOnAnswers: 'Basado en tus respuestas, esta estrategia se alinea perfectamente con tus objetivos, tolerancia al riesgo y nivel de experiencia.',
      backToHome: 'Volver al Inicio',
      restartTest: 'Reiniciar Test',
      readyToStart: '¿Listo para Comenzar?',
      nextStep: 'Ahora que conoces tu estrategia crypto ideal, da el siguiente paso y comienza tu viaje. Recuerda siempre hacer tu propia investigación y nunca invertir más de lo que puedes permitirte perder.',
      getExpertMentor: 'Conseguir Mentor Experto',
      learnMoreAbout: 'Aprender Más Sobre',
      exploreAllStrategies: 'Explorar Todas las Estrategias',
      shareResults: 'Comparte Tus Resultados',
      helpOthers: '¡Ayuda a otros a descubrir su estrategia crypto perfecta compartiendo este quiz!'
    },
    
    mentors: {
      expertMentors: 'Mentores Expertos',
      connectWithMentors: 'Conecta con mentores verificados que te ayudarán a implementar tu estrategia crypto ideal. Paga directamente con USDC usando Base Network.',
      mentors: 'Mentores',
      averageRating: 'Rating Promedio',
      reviews: 'Reseñas',
      verified: 'Verificados',
      whyChooseMentors: '¿Por qué elegir nuestros mentores?',
      verifiedMentors: 'Verificados',
      verifiedMentorsDesc: 'Todos nuestros mentores están verificados y tienen experiencia comprobada',
      usdcPayments: 'Pagos en USDC',
      usdcPaymentsDesc: 'Paga directamente con crypto usando Base Network, sin intermediarios',
      instantAccess: 'Acceso Inmediato',
      instantAccessDesc: 'Conecta instantáneamente con tu mentor después del pago',
      all: 'Todos',
      defi: 'DeFi',
      airdrops: 'Airdrops',
      spotTrading: 'Spot Trading',
      futures: 'Futures',
      nfts: 'NFTs',
      memeCoins: 'Meme Coins',
      noMentorsAvailable: 'No hay mentores disponibles',
      noMentorsDesc: 'No encontramos mentores para la estrategia seleccionada. Prueba con otra categoría.',
      connectWallet: 'Conectar Wallet',
      connecting: 'Conectando...',
      baseAccountConnected: 'Base Account Conectada',
      payWithBase: 'Pagar con Base',
      profile: 'Perfil',
      share: 'Compartir'
    },
    
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      continue: 'Continuar',
      finish: 'Finalizar'
    },
    
    disclaimer: {
      nfa: 'NFA',
      nfy: 'NFY',
      notFinancialAdvice: 'No es asesoramiento financiero',
      notFinancialAdviceDesc: 'Esta información es solo para fines educativos y no constituye asesoramiento financiero.',
      notFinancialAdviceDescLong: 'Esta información es solo para fines educativos y no constituye asesoramiento financiero. Siempre haz tu propia investigación antes de invertir.'
    }
  },
  
  en: {
    header: {
      connectWallet: 'Connect Wallet',
      connecting: 'Connecting...',
      wallet: 'Base',
      disconnect: 'Disconnect',
      clickToDisconnect: 'Click to disconnect',
      copyAddress: 'Copy address',
      viewOnExplorer: 'View on BaseScan',
      baseNetwork: 'Base Network'
    },
    
    home: {
      discoverStrategy: 'Discover your ideal crypto strategy',
      findPerfectStrategy: 'Find Your Perfect',
      cryptoPerfect: 'Crypto Strategy',
      takeQuiz: 'Take our personalized quiz and discover the cryptocurrency approach that best fits your goals, risk tolerance, and experience level.',
      personalizedResults: 'Personalized Results',
      personalizedResultsDesc: 'Get recommendations tailored to your specific situation and objectives',
      expertInsights: 'Expert Insights',
      expertInsightsDesc: 'Based on current market strategies and conditions',
      quickEasy: 'Quick & Easy',
      quickEasyDesc: 'Simple questions that take just a few minutes to complete',
      anonymous: '100% Anonymous',
      anonymousDesc: 'We don\'t require registration or personal information. Your responses are completely private.',
      activeCommunity: 'Active Community',
      activeCommunityDesc: 'Join thousands of people who have already discovered their path in the crypto world.',
      readyToStart: 'Ready to Start?',
      joinThousands: 'Join thousands of people who have discovered their ideal crypto strategy',
      takeQuizNow: 'Take the Quiz Now',
      startQuiz: 'Start Quiz',
      takesMinutes: 'Takes 2-3 minutes',
      noRegistration: 'No registration',
      starRating: '4.8/5 (2.3k+)'
    },
    
    quiz: {
      question: 'Question',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      seeResults: 'See Results',
      completeQuiz: 'Complete quiz and get results',
      goToNext: 'Go to next question',
      goToPrevious: 'Go to previous question',
      calculatingStrategy: 'Calculating your perfect crypto strategy...'
    },
    
    results: {
      strategyResults: 'Your Crypto Strategy Results',
      yourBestOption: 'Your Best Option',
      basedOnAnswers: 'Based on your answers, this strategy aligns perfectly with your goals, risk tolerance, and experience level.',
      backToHome: 'Back to Home',
      restartTest: 'Restart Test',
      readyToStart: 'Ready to Start?',
      nextStep: 'Now that you know your ideal crypto strategy, take the next step and begin your journey. Always remember to do your own research and never invest more than you can afford to lose.',
      getExpertMentor: 'Get Expert Mentor',
      learnMoreAbout: 'Learn More About',
      exploreAllStrategies: 'Explore All Strategies',
      shareResults: 'Share Your Results',
      helpOthers: 'Help others discover their perfect crypto strategy by sharing this quiz!'
    },
    
    mentors: {
      expertMentors: 'Expert Mentors',
      connectWithMentors: 'Connect with verified mentors who will help you implement your ideal crypto strategy. Pay directly with USDC using Base Network.',
      mentors: 'Mentors',
      averageRating: 'Average Rating',
      reviews: 'Reviews',
      verified: 'Verified',
      whyChooseMentors: 'Why choose our mentors?',
      verifiedMentors: 'Verified',
      verifiedMentorsDesc: 'All our mentors are verified and have proven experience',
      usdcPayments: 'USDC Payments',
      usdcPaymentsDesc: 'Pay directly with crypto using Base Network, no intermediaries',
      instantAccess: 'Instant Access',
      instantAccessDesc: 'Connect instantly with your mentor after payment',
      all: 'All',
      defi: 'DeFi',
      airdrops: 'Airdrops',
      spotTrading: 'Spot Trading',
      futures: 'Futures',
      nfts: 'NFTs',
      memeCoins: 'Meme Coins',
      noMentorsAvailable: 'No mentors available',
      noMentorsDesc: 'We didn\'t find mentors for the selected strategy. Try another category.',
      connectWallet: 'Connect Wallet',
      connecting: 'Connecting...',
      baseAccountConnected: 'Base Account Connected',
      payWithBase: 'Pay with Base',
      profile: 'Profile',
      share: 'Share'
    },
    
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      continue: 'Continue',
      finish: 'Finish'
    },
    
    disclaimer: {
      nfa: 'NFA',
      nfy: 'NFY',
      notFinancialAdvice: 'Not financial advice',
      notFinancialAdviceDesc: 'This information is for educational purposes only and does not constitute financial advice.',
      notFinancialAdviceDescLong: 'This information is for educational purposes only and does not constitute financial advice. Always do your own research before investing.'
    }
  }
}

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[language]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      console.warn(`Translation key "${key}" not found for language "${language}"`)
      return key
    }
  }
  
  return typeof value === 'string' ? value : key
}
