import React from 'react'

import Grid, { GridProps } from '@/components/grid/Grid'
import { ImgStyle } from '@/components/img/StyledImg.style'

type ChampionSpellsProps = GridProps & {
  spells: Array<{ imgSrc?: string }>
}

export default function ChampionSpells(props: ChampionSpellsProps) {
  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(2rem, 1fr))"
      gridTemplateRows="auto"
      padding="1rem"
    >
      {props.spells.map((spell, idx) => (
        <ImgStyle
          key={spell.imgSrc ?? '' + idx}
          width="3rem"
          height="3rem"
          src={spell.imgSrc}
        />
      ))}
    </Grid>
  )
}
