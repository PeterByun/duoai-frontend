import { configureStore } from '@reduxjs/toolkit'

import asssetReducer from './slices/asset-slice'

// Create the store with reducers. configureStore API adds the thunk middleware by default.
export const store = configureStore({
  reducer: {
    asset: asssetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
