import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/App/AppBaseStyle'

export type CardStyle = {
} & BaseStyleProps

export const CardStyle = styled.article<CardStyle>`
    ${BaseStyle}

    background: ${({ color }) =>  color ? `var(--${color})`: '#ebf2ff'};
    
    border-radius: 10px;
    padding: 2rem;

    text-align: center;
    transition: all 0.1s ease-out;
    
    cursor:pointer;
    
    :hover {
        transform: translateY(-1.2rem);
        box-shadow: rgb(31 38 135 / 37%) 0px 8px 15px 0px;
    }
`