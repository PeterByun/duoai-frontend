export type ChampionData = {
  name: string
  consonants: string
}

export type ChampionDataList = {
  [key: string]: ChampionData
}

export type ChampionImg = {
  name: string
  src: string
  key: number
  consonants: string
  laneName: string
}
