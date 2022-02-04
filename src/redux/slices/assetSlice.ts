// TODO: You should remove this reducer, and store imgaes into a S3 bucket.
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import {
  importChampionThumbnails,
  importItemIcons,
  ImportedFiles,
} from '../../utils/file-utils'

type AssetState = {
  championThumbnails: ImportedFiles
  itemIcons: ImportedFiles
}

const initialState: AssetState = {
  championThumbnails: {},
  itemIcons: {},
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
  },
})

// Actions
export const { loadChampionThumbnails, loadItemIcons } = assetSlice.actions

// Selectors
export const selectChampionThumbnails = (state: RootState) =>
  state.asset.championThumbnails

export const selectItemIcons = (state: RootState) => state.asset.itemIcons

export default assetSlice.reducer
