const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

const IMAGES_CDN = "https://i.ibb.co";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  baseBuilder: {
    allowedAddresses: [],
  },
  miniapp: {
    version: "1",
    name: "CryptoMatch",
    subtitle: "Tu compañero ideal en criptomonedas",
    description: "Descubre en 2 minutos tu estrategia cripto ideal con un quiz personalizado. Gratis, rápido y sin registro. 🚀",
    screenshotUrls: [`${IMAGES_CDN}/m5y6qW24/screenshot-app.jpg`],
    iconUrl: `${IMAGES_CDN}/ds7x6csQ/logo.png`,
    splashImageUrl: `${IMAGES_CDN}/ds7x6csQ/logo.png`,
    splashBackgroundColor: "#E6007A",
    homeUrl: "https://cryptomatch.vercel.app",
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "finance",
    tags: ["crypto", "quiz", "finance", "education", "base"],
    heroImageUrl: `${IMAGES_CDN}/8Dq1NPv6/preview-social.jpg`,
    tagline: "Descubre tu estrategia cripto ideal",
    ogTitle: "Encuentra tu Estrategia Cripto",
    ogDescription: "Descubre en 2 minutos tu estrategia cripto ideal con un quiz personalizado.",
    ogImageUrl: `${IMAGES_CDN}/8Dq1NPv6/preview-social.jpg`,
  },
} as const;
