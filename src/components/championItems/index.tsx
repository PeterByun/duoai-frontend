import React from 'react'

import { useItemImages } from '@/hooks/use-item-images'

import Grid, { GridProps } from '@/components/grid/Grid'
import { ImgStyle } from '@/components/img/StyledImg.style'

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
          <ImgStyle
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
