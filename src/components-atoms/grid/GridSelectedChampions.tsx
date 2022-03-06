import Grid from '@/components-atoms/grid/Grid'
import React from 'react'

export const GridSelectedChampions = (props: {
  teamColor: 'blue' | 'red'
  children: React.ReactNode
  backgroundColor?: string
  emphasized?: boolean
}) => {
  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      backgroundColor={`team-light-${props.teamColor}`}
      padding="1rem"
      isChildrenClickable
      emphasized={props.emphasized}
    >
      {props.children}
    </Grid>
  )
}
