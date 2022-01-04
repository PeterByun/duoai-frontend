import React from 'react'

import { GridStyleProps, GridStyle } from '@/components/Grid/StyledGrid.style'

export type GridProps = GridStyleProps & {
    id?: string
    children?: React.ReactNode
    style?: any
}

const Grid = React.forwardRef<HTMLElement, GridProps>((props: GridProps, ref) => (
    <GridStyle ref={ref} style={props.style} {...props}>
        { props.children }
    </GridStyle>
))

Grid.displayName = 'Grid'

export default Grid
