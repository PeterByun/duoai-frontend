import React from 'react'

import {
  StyledGridProps,
  StyledGrid,
} from '@/components-atoms/grid/StyledGrid.style'

export type GridProps = StyledGridProps & {
  id?: string
  children?: React.ReactNode
  style?: any
  borderRadius?: string
}

const Grid = React.forwardRef<HTMLElement, GridProps>(
  (props: GridProps, ref) => (
    <StyledGrid ref={ref} style={props.style} {...props}>
      {props.children}
    </StyledGrid>
  )
)

Grid.displayName = 'Grid'

export default Grid
