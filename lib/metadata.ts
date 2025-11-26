import { Metadata } from 'next'
import { Language, translations } from './translations'
import { minikitConfig } from '../minikit.config'

export function generateMetadata(language: Language = 'es'): Metadata {
  const t = translations[language]
  
  return {
    title: {
      default: language === 'es' 
        ? "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta"
        : "CryptoMatch - Find Your Perfect Crypto Strategy",
      template: "%s | CryptoMatch",
    },
    description: language === 'es'
      ? "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia. Toma nuestro quiz personalizado para obtener recomendaciones adaptadas para Bitcoin, DeFi, trading y más."
      : "Discover which cryptocurrency approach fits your goals, risk tolerance, and experience level. Take our personalized quiz to get tailored recommendations for Bitcoin, DeFi, trading, and more.",
    keywords: language === 'es'
      ? ["criptomonedas", "crypto quiz", "bitcoin", "ethereum", "defi", "trading", "inversión", "blockchain"]
      : ["cryptocurrency", "crypto quiz", "bitcoin", "ethereum", "defi", "trading", "investment", "blockchain"],
    authors: [{ name: language === 'es' ? "Equipo CryptoMatch" : "CryptoMatch Team" }],
    creator: "CryptoMatch",
    publisher: "CryptoMatch",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://cryptomatch.vercel.app"),
    alternates: {
      canonical: "/",
      languages: {
        'es': '/',
        'en': '/?lang=en',
      },
    },
    openGraph: {
      type: "website",
      locale: language === 'es' ? "es_ES" : "en_US",
      url: "https://cryptomatch.vercel.app",
      title: language === 'es'
        ? "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta"
        : "CryptoMatch - Find Your Perfect Crypto Strategy",
      description: language === 'es'
        ? "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia."
        : "Discover which cryptocurrency approach fits your goals, risk tolerance, and experience level.",
      siteName: "CryptoMatch",
      images: [
        {
          url: "https://i.ibb.co/8Dq1NPv6/preview-social.jpg",
          width: 1200,
          height: 630,
          alt: language === 'es'
            ? "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta"
            : "CryptoMatch - Find Your Perfect Crypto Strategy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: language === 'es'
        ? "CryptoMatch - Encuentra Tu Estrategia Crypto Perfecta"
        : "CryptoMatch - Find Your Perfect Crypto Strategy",
      description: language === 'es'
        ? "Descubre qué enfoque de criptomonedas se adapta a tus objetivos, tolerancia al riesgo y nivel de experiencia."
        : "Discover which cryptocurrency approach fits your goals, risk tolerance, and experience level.",
      images: ["https://i.ibb.co/8Dq1NPv6/preview-social.jpg"],
      creator: "@cryptomatch",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    generator: 'v0.app',
    other: {
      'fc:frame': JSON.stringify({
        version: minikitConfig.miniapp.version,
        imageUrl: minikitConfig.miniapp.heroImageUrl,
        button: {
          title: language === 'es' 
            ? `Únete a ${minikitConfig.miniapp.name}` 
            : `Join ${minikitConfig.miniapp.name}`,
          action: {
            name: `Launch ${minikitConfig.miniapp.name}`,
            type: 'launch_frame',
          },
        },
      }),
      'fc:miniapp': JSON.stringify({
        version: minikitConfig.miniapp.version,
        imageUrl: minikitConfig.miniapp.heroImageUrl,
        button: {
          title: language === 'es' ? 'Comenzar Quiz' : 'Start Quiz',
          action: {
            type: 'launch_miniapp',
            name: minikitConfig.miniapp.name,
            url: minikitConfig.miniapp.homeUrl,
            splashImageUrl: minikitConfig.miniapp.splashImageUrl,
            splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
          },
        },
      }),
    },
  }
}
