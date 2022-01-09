import { ChampionDataList, ChampionImg } from '../types/champion-types'

import { pathToName } from '@/utils/string-utils'

import championNameAndKeyPair from '../assets/js/champion-name-key-pair'
import championDataJson from './../assets/json/champion-info.json'
const championDataList: ChampionDataList = JSON.parse(championDataJson)

export type ImportedFiles = {
  [ key: string] : string
}

export const importAll = (webpackContext: __WebpackModuleApi.RequireContext) => {  
  const files: ImportedFiles = {}
  for(const fileUrl of webpackContext.keys()) {
    const body = webpackContext(fileUrl);
    
    files[pathToName(fileUrl)] = body
  }

  return files
}

export const addInfoToChampionImg = (imagesSrcList: ImportedFiles): ChampionImg[] => {
  let championImg = []

  for(const [fileName, path] of Object.entries(imagesSrcList)) {
    const championData = championDataList[fileName.toLowerCase()]
      
    championImg.push({
      name: championData?.name,
      src: path,
      key: championNameAndKeyPair[fileName],
      consonants: championData?.consonants,
    }) 
  }
  
  return championImg
}

export const importChampionThumbnails = () => {
  const championThumbnails = importAll(require.context(
    './../assets/images/champions',
    false,
    /\.(png|jpe?g|svg)$/
  ))

  return championThumbnails
}

export const importItemIcons = () => {
  const itemIcons = importAll(require.context(
    './../assets/images/items',
    false,
    /\.(png|jpe?g|svg)$/
  ))

  return itemIcons
}