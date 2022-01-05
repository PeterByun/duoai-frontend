import { useAppSelector } from "@/redux/hooks";
import { selectItemIcons } from "@/redux/slices/assetSlice";
import { getValueOrDefaultFromObject } from '@/utils/array-utils'

export function useItemImages () {
    const itemIcons = useAppSelector(selectItemIcons)

    const getItemIcon = (name?: string | number) => {
        return getValueOrDefaultFromObject(itemIcons, name)
    }

    return {
        itemIcons,
        getItemIcon
    }
}