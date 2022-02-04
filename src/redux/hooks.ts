import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// exports hooks that enable components to communicate with the store.
export const useAppDispatch = () => useDispatch<AppDispatch>()
// reselect's useSelector is re-exported from react-redux. It takes care of the memoization.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
