// URL de producción fija para evitar problemas con previews de Vercel
const ROOT_URL = "https://cryptomatch.vercel.app";

const IMAGES_CDN = "https://i.ibb.co";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjExMTQ4NjIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhBOThhMTU0OGQxQzg5RWVjNGI4RTZmZjUxOTgyZEJjYTM3YzU1OUEyIn0",
    payload: "eyJkb21haW4iOiJjcnlwdG9tYXRjaC52ZXJjZWwuYXBwIn0",
    signature: "MHgwZGZmYTA5OWExZDg4NzRkYWZhOWYxYjViN2FiN2RiZjJkY2M1NzdjOTVkZWFjZmY4N2M2MzBhOGRhM2NlM2Q4MjQ4NzQwYzU5MTA4MzcxOTYxYjZjZjBlNWZhZWIzNTQwMGUxNjE3MWIzOTY1NWVmN2U1Yzc5ZDhkNTI5YmNjNjFi"
  },
  baseBuilder: {
    allowedAddresses: ["0xDf8303e583C4c18D6a1159D111cc51A16031257f"],
  },
  miniapp: {
    version: "1",
    name: "CryptoMatch",
    subtitle: "Tu compañero en criptomonedas",
    description: "Descubre tu estrategia cripto ideal.",
    screenshotUrls: [`${IMAGES_CDN}/m5y6qW24/screenshot-app.jpg`],
    iconUrl: `${IMAGES_CDN}/ds7x6csQ/logo.png`,
    splashImageUrl: `${IMAGES_CDN}/ds7x6csQ/logo.png`,
    splashBackgroundColor: "#E6007A",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "finance",
    tags: ["crypto", "quiz", "finance", "education", "base"],
    heroImageUrl: `${IMAGES_CDN}/8Dq1NPv6/preview-social.jpg`,
    tagline: "Descubre estrategia cripto",
    ogTitle: "Encuentra tu Estrategia Cripto",
    ogDescription: "Descubre tu estrategia cripto ideal",
    ogImageUrl: `${IMAGES_CDN}/8Dq1NPv6/preview-social.jpg`,
    noindex: false, // Permitir que aparezca en resultados de búsqueda
  },
} as const;
