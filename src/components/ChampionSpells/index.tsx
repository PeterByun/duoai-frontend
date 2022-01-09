import React from 'react'

import Grid, { GridProps } from '@/components/Grid'
import { ImgStyle } from '@/components/Img/StyledImg.style'

type ChampionSpellsProps = GridProps & {
  spells: Array<{ imgSrc?: string }>
}

export default function ChampionSpells(props: ChampionSpellsProps) {
  return (
    <Grid
      gridTemplateColumns="2rem 2rem"
      gridTemplateRows="2rem 2rem"
      padding="1rem"
    >
      {props.spells.map((spell, idx) => (
        <ImgStyle
          key={spell.imgSrc ?? '' + idx}
          width="30px"
          height="30px"
          src={spell.imgSrc}
        />
      ))}
    </Grid>
  )
}