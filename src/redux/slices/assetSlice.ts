// TODO: You should remove this reducer, and store imgaes into a S3 bucket.
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import {
  importChampionThumbnails,
  importItemIcons,
  importRankedPositionsIcons,
  importRankIcons,
  importSummonerTraitIcons,
  ImportedFiles,
} from '../../utils/file-utils'

type AssetState = {
  championThumbnails: ImportedFiles
  itemIcons: ImportedFiles
  rankedPositionsIcons: ImportedFiles
  rankIcons: ImportedFiles
  summonerTraitIcons: ImportedFiles
}

const initialState: AssetState = {
  championThumbnails: {},
  itemIcons: {},
  rankedPositionsIcons: {},
  rankIcons: {},
  summonerTraitIcons: {},
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    loadChampionThumbnails: (state) => {
      state.championThumbnails = importChampionThumbnails()
    },
    loadItemIcons: (state) => {
      state.itemIcons = importItemIcons()
    },
    loadRankedPositions: (state) => {
      state.rankedPositionsIcons = importRankedPositionsIcons()
    },
    loadRankIcons: (state) => {
      state.rankIcons = importRankIcons()
    },
    loadsummonerTraitIcons: (state) => {
      state.summonerTraitIcons = importSummonerTraitIcons()
    },
  },
})

// Actions
export const {
  loadChampionThumbnails,
  loadItemIcons,
  loadRankedPositions,
  loadRankIcons,
  loadsummonerTraitIcons,
} = assetSlice.actions

// Selectors
export const selectChampionThumbnails = (state: RootState) =>
  state.asset.championThumbnails

export const selectItemIcons = (state: RootState) => state.asset.itemIcons

export const findAllRankedPositionsItems = (state: RootState) =>
  state.asset.rankedPositionsIcons

export const findRankedPositionItem =
  (positionName: string) => (state: RootState) => {
    const foundIcon = Object.entries(state.asset.rankedPositionsIcons).find(
      ([key]) => {
        return key === positionName
      }
    )

    if (foundIcon) {
      return {
        name: foundIcon[0],
        src: foundIcon[1],
      }
    }

    return {
      name: 'ImageNotFound',
      src: '',
    }
  }

export const findRankIcon = (positionName: string) => (state: RootState) => {
  const foundIcon = Object.entries(state.asset.rankIcons).find(([key]) => {
    return key === positionName
  })

  if (foundIcon) {
    return {
      name: foundIcon[0],
      src: foundIcon[1],
    }
  }

  return {
    name: 'ImageNotFound',
    src: '',
  }
}

export const findSummonerTraitIcons = (state: RootState) =>
  state.asset.summonerTraitIcons

export default assetSlice.reducer
