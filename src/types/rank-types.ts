export type ChampRank = {
  rank: number
  name: string
  tier: number
  stregnth: string
  winRatio: number
  goldCollecting: number
  role: string
}

export type SummonerRank = {
  rank: number
  name: string
  points: number
  tier: string
  isPro: boolean
  iconImage: string | null
}

export type UserByTier = {
  name: string
  value: number
}

export type StatByTier = {
  name: string
  iron: number
  brown: number
  silver: number
  gold: number
  platinum: number
  diamond: number
  master: number
  grandmaster: number
  challenger: number
}
