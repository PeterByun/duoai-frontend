import styled, { css } from 'styled-components'
import { BaseStyle, BaseStyleProps } from '../components/AppBaseStyle'

export type StyledTextProps  = {
    color?: string
    backgroundColor?: string
    background?: string

    fontSize?: string
    fontWeight?: string
    
    textAlign?: string
    whiteSpace?: string
    margin?: string

    highlighted?: boolean
    clipBackground?: boolean
} & BaseStyleProps

export const TextStyle = css<StyledTextProps>`
    ${BaseStyle}

    background: ${({background}) => background ? background : null};

    -webkit-background-clip: ${({clipBackground}) => clipBackground ? 'text' : null};
    -webkit-text-fill-color: ${({clipBackground}) => clipBackground ? 'transparent' : null};

    background-color: ${ ({highlighted, backgroundColor, background}) => {
        if(background) return null
        if(highlighted) 'var(--blue)'
        return backgroundColor ? `var(--${backgroundColor})` : null
    }};
    color: ${({color, highlighted}) => {
        if(highlighted) return 'var(--white)'
        return color ? `var(--${color})` : `var(--black)`
    }};

    width: ${({highlighted})=> highlighted ? 'fit-content' : null};

    font-size: ${({fontSize}) => fontSize ? fontSize : '1rem'};
    font-weight: ${({fontWeight}) => fontWeight ? fontWeight : '1rem'};

    margin: ${({margin}) => margin ? margin : null};

    text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
    white-space: ${({whiteSpace}) => whiteSpace ? whiteSpace : 'nowrap'};
`

export const StyledText = styled.p<StyledTextProps>`
    ${TextStyle}
`