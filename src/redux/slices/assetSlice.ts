import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import { importChampionThumbnails, importItemIcons } from '../../utils/file-utils'

type AssetState = {
  championThumbnails: Map<string, string>
  itemIcons: Map<string, string>
}

const initialState: AssetState = {
  championThumbnails: new Map<string, string>(),
  itemIcons: new Map<string, string>()
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    loadChampionThumbnails: (state) => {
      state.championThumbnails = new Map(importChampionThumbnails())
    },
    loadItemIcons: (state) => {
      state.itemIcons = new Map(importItemIcons())
    }
  },
})

// Actions
export const { loadChampionThumbnails, loadItemIcons } = assetSlice.actions

// Selectors
export const selectChampionThumbnails = (state: RootState) => state.asset.championThumbnails

export const selectItemIcons = (state: RootState) => state.asset.itemIcons

export default assetSlice.reducer

