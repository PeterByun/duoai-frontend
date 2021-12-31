import { useAppSelector } from '../redux/hooks'
import { selectChampionThumbnails } from '../redux/slices/assetSlice'
import { getValueOrDefaultFromMap } from '../utils/array-utils'

export function useChampionImages () {
    
    const championSrcMap= useAppSelector(selectChampionThumbnails)

    const getChampionImage = (name?: string) => {
        return getValueOrDefaultFromMap<string>(championSrcMap, name)
    }

    return { getChampionImage }
}