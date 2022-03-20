import { useAppSelector } from '@/redux/hooks'
import { selectChampionThumbnails } from '@/redux/slices/asset-slice'
import { getValueOrDefaultFromObject } from '@/utils/array-utils'

export function useChampionImages() {
  const championSrcFiles = useAppSelector(selectChampionThumbnails)

  const getChampionImage = (name?: string) => {
    return getValueOrDefaultFromObject(championSrcFiles, name)
  }

  return { getChampionImage }
}
