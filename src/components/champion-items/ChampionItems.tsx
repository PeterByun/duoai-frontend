import { useItemImages } from '@/hooks/use-item-images'

import Grid, { GridProps } from '@/components-atoms/grid/Grid'
import { StyledImg } from '@/components-atoms/img/StyledImg.style'

type Item = { itemId?: number }

type ChampionItemsProps = GridProps & {
  items: Array<Item>
  gridColumn?: string
}

export default function ChampionItems(props: ChampionItemsProps) {
  const { getItemIcon } = useItemImages()

  const isValidItem = (item: Item): item is { itemId: number } => {
    return item.itemId ? true : false
  }

  const itemsToShow = props.items.filter(isValidItem)

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(1.5rem, 1fr))"
      width="100%"
      padding="1rem"
      {...props}
    >
      {itemsToShow.map((item, idx) => {
        return (
          <StyledImg
            key={item.itemId + idx}
            width="2rem"
            height="2rem"
            src={getItemIcon(item.itemId)}
          />
        )
      })}
    </Grid>
  )
}
