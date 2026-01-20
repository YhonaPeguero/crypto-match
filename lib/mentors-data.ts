export interface Mentor {
  id: string
  name: string
  strategy: string
  strategyId: string
  description: string
  experience: string
  rating: number
  reviews: number
  priceUSDC: number
  duration: string
  specializations: string[]
  avatar: string
  verified: boolean
}

export const MENTORS: Mentor[] = [
  {
    id: "mentor-defi-001",
    name: "Alex Chen",
    strategy: "DeFi Expert",
    strategyId: "defi",
    description: "Specialist in yield farming and DeFi protocols. I have helped over 500 users generate secure passive income.",
    experience: "5+ years in DeFi",
    rating: 4.9,
    reviews: 127,
    priceUSDC: 25,
    duration: "30 min",
    specializations: ["Yield Farming", "Liquidity Pools", "Staking", "Risk Management"],
    avatar: "AC",
    verified: true
  },
  {
    id: "mentor-airdrops-001",
    name: "Sofia Rodriguez",
    strategy: "Airdrop Hunter",
    strategyId: "airdrops",
    description: "Expert in airdrops and early token incentives. I've secured over $50k in rewards and teach the most efficient strategies.",
    experience: "3+ years airdrop hunting",
    rating: 4.8,
    reviews: 89,
    priceUSDC: 20,
    duration: "25 min",
    specializations: ["Airdrop Farming", "Early Adoption", "Community Building", "Token Analysis"],
    avatar: "SR",
    verified: true
  },
  {
    id: "mentor-spot-001",
    name: "Michael Johnson",
    strategy: "Spot Trading Pro",
    strategyId: "spotHolding",
    description: "Long-term investment strategist. Specialist in DCA and fundamental analysis for onchain beginners.",
    experience: "8+ years in crypto",
    rating: 4.9,
    reviews: 203,
    priceUSDC: 30,
    duration: "45 min",
    specializations: ["Dollar Cost Averaging", "Fundamental Analysis", "Portfolio Management", "Risk Assessment"],
    avatar: "MJ",
    verified: true
  },
  {
    id: "mentor-futures-001",
    name: "Elena Volkov",
    strategy: "Futures Specialist",
    strategyId: "futuresTrading",
    description: "Professional trader with 6 years of experience in derivatives. Focused on risk management and trading psychology.",
    experience: "6+ years trading",
    rating: 4.7,
    reviews: 156,
    priceUSDC: 50,
    duration: "60 min",
    specializations: ["Technical Analysis", "Risk Management", "Psychology", "Derivatives"],
    avatar: "EV",
    verified: true
  }
]

export function getMentorsByStrategy(strategyId: string): Mentor[] {
  return MENTORS.filter(mentor => mentor.strategyId === strategyId)
}

export function getTopMentors(limit: number = 3): Mentor[] {
  return MENTORS
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export function getMentorById(id: string): Mentor | undefined {
  return MENTORS.find(mentor => mentor.id === id)
}
