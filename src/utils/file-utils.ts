import { ChampionDataList, ChampionImg } from '../types/champion-types'

import { pathToName } from '../utils/string-utils'

import championNameAndKeyPair from '../assets/js/champion-name-key-pair'
import championDataJson from './../assets/json/champion-info.json'
const championDataList: ChampionDataList = JSON.parse(championDataJson)

export const importAll = (webpackContext: __WebpackModuleApi.RequireContext) => {  
  return webpackContext.keys().map((fileUrl): [string, string] => {
    const body = webpackContext(fileUrl);
    
    return [
      pathToName(fileUrl),
      body.default
    ]
  });
}

export const addInfoToChampionImg = (imagesSrcList: [string, string][]): ChampionImg[] => {
  return imagesSrcList.map(([fileName, path]) => {

      const championData = championDataList[fileName.toLowerCase()]
      
      return {
        name: championData?.name,
        src: path,
        key: championNameAndKeyPair[fileName],
        consonants: championData?.consonants,
      }
  })
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