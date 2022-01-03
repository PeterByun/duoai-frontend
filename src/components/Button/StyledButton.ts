import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '../components/AppBaseStyle'

export type ButtonStyleProps = {
    fontWeight?: string
} & BaseStyleProps

export const ButtonStyle = styled.button<ButtonStyleProps>`
    ${BaseStyle}

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ backgroundColor }) =>  backgroundColor ? `var(--${backgroundColor})`: 'var(--dark-blue)'};
    font-size: ${({ fontSize }) => fontSize };
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : 'bold'};
    color: var(--white);

    border: none;
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius : "3px"};

    text-align: center;
    cursor:pointer;
    
    outline: none;
    -webkit-appearance: none;

    :hover {
        filter: brightness(1.2)
    }
`