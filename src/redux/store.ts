import { configureStore } from '@reduxjs/toolkit'

import asssetReducer from './slices/assetSlice'

export const store = configureStore({
  reducer: {
    asset: asssetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
