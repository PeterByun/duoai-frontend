import { css } from '@emotion/react'

import { BaseStyleProps, BaseStyle } from './AppBaseStyle'

export type BaseFlexBoxStyleProps = {
    flexDirection?: string
    align?: string
    justify?: string
    gap?: string

    gridColumn?: string
} & BaseStyleProps

export const BaseFlexBoxStyle = (props: BaseFlexBoxStyleProps) => {
    return css`
        ${BaseStyle(props)}
        
        display: flex;
        flex-direction: ${props.flexDirection ?? 'row' };
        align-items: ${props.align ?? 'center' };
        justify-content: ${props.justify ?? 'center' };
        gap: ${props.gap};

        grid-column: ${props.gridColumn};
    `
}