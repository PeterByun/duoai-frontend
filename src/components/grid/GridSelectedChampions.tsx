import Grid from '@/components/grid/Grid'
import React from 'react'

export const GridSelectedChampions = (props: {
  teamColor: 'blue' | 'red'
  emphasized: boolean
  children: React.ReactNode
}) => {
  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      backgroundColor={`team-light-${props.teamColor}`}
      padding="1rem"
      borderRadius="5px"
      isChildrenClickable
      emphasized={props.emphasized}
    >
      {props.children}
    </Grid>
  )
}
