import { Metadata } from 'next'
import { Language, translations } from './translations'
import { minikitConfig } from '../minikit.config'

export function generateMetadata(language: Language = 'en'): Metadata {
  const t = translations[language]
  
  return {
    title: {
      default: "BaseMatch - Find Your Perfect Base Strategy Match",
      template: "%s | BaseMatch",
    },
    description: "Discover your ideal crypto strategy in 2 minutes. Anonymous. Free. Explore apps onchain on Base to boost your onchain activity.",
    keywords: ["base", "base blockchain", "crypto quiz", "bitcoin", "ethereum", "defi", "trading", "onchain", "base apps"],
    authors: [{ name: "BaseMatch Team" }],
    creator: "BaseMatch",
    publisher: "BaseMatch",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://basematch.vercel.app"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://basematch.vercel.app",
      title: "BaseMatch - Find Your Perfect Base Strategy Match",
      description: "Discover your ideal crypto strategy in 2 minutes. Anonymous. Free. Explore apps onchain on Base.",
      siteName: "BaseMatch",
      images: [
        {
          url: "https://i.ibb.co/8Dq1NPv6/preview-social.jpg",
          width: 1200,
          height: 630,
          alt: "BaseMatch - Find Your Perfect Base Strategy Match",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "BaseMatch - Find Your Perfect Base Strategy Match",
      description: "Discover your ideal crypto strategy in 2 minutes. Anonymous. Free. Explore apps onchain on Base.",
      images: ["https://i.ibb.co/8Dq1NPv6/preview-social.jpg"],
      creator: "@basematch",
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
          title: `Join ${minikitConfig.miniapp.name}`,
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
          title: 'Start Quiz',
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
