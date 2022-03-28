import Grid, { GridProps } from '@/components-atoms/grid/Grid'
import { Img } from '@/components-atoms/img/Img'

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
        <Img
          key={spell.imgSrc ?? '' + idx}
          width="3rem"
          height="3rem"
          image={{
            src: spell.imgSrc ?? '',
          }}
        />
      ))}
    </Grid>
  )
}
