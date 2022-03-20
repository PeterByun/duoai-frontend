import { ChampionDataList } from '@/apis/duoai/types/champion'
import { ChampionImg } from '@/types/champion-types'

import { pathToName } from '@/utils/string-utils'

import championNameAndKeyPair from '../assets/js/champion-name-key-pair'
import championDataJson from '../assets/json/champion-info.json'

export type ImportedFiles = {
  [key: string]: string
}

export const importAll = (
  webpackContext: __WebpackModuleApi.RequireContext
) => {
  const files: ImportedFiles = {}
  for (const fileUrl of webpackContext.keys()) {
    const body = webpackContext(fileUrl)

    files[pathToName(fileUrl)] = body
  }

  return files
}

/**
 * TODO: this function should use the update championDataList.
 */
export const addInfoToChampionImg = (
  imagesSrcList: ImportedFiles
): ChampionImg[] => {
  let championImg = []

  for (const [fileName, path] of Object.entries(imagesSrcList)) {
    const championData = (championDataJson as unknown as ChampionDataList)[
      fileName.toLowerCase()
    ]

    championImg.push({
      name: championData?.name,
      src: path,
      key: championNameAndKeyPair[fileName],
      consonants: championData?.consonants,
      laneName: '',
    })
  }

  return championImg
}

export const importChampionThumbnails = () => {
  const championThumbnails = importAll(
    require.context('./../assets/images/champions', false, /\.(png|jpe?g|svg)$/)
  )

  return championThumbnails
}

export const importItemIcons = () => {
  const itemIcons = importAll(
    require.context('./../assets/images/items', false, /\.(png|jpe?g|svg)$/)
  )

  return itemIcons
}

export const importRankedPositionsIcons = () => {
  const rankedPositionsIcons = importAll(
    require.context(
      './../assets/images/ranked-positions',
      false,
      /\.(png|jpe?g|svg)$/
    )
  )

  return rankedPositionsIcons
}

export const importRankIcons = () => {
  const rankIcons = importAll(
    require.context(
      './../assets/images/ranked-emblems',
      false,
      /\.(png|jpe?g|svg)$/
    )
  )

  return rankIcons
}

export const importSummonerTraitIcons = () => {
  const summonerTraitIcons = importAll(
    require.context(
      './../assets/images/summoner-traits',
      false,
      /\.(png|jpe?g|svg)$/
    )
  )

  return summonerTraitIcons
}
