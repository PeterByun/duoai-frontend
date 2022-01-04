import { useAppSelector } from "@/redux/hooks";
import { selectItemIcons } from "@/redux/slices/assetSlice";
import { getValueOrDefaultFromMap } from '@/utils/array-utils'

export function useItemImages () {
    const itemIcons = useAppSelector(selectItemIcons)

    const getItemIcon = (name?: string | number) => {
        return getValueOrDefaultFromMap<string>(itemIcons, name) 
    }

    return {
        itemIcons,
        getItemIcon
    }
}