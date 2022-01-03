import styled from "styled-components"
import { StyledTextProps, TextStyle } from './StyledText.style'

export type HeadingStyleProps = {
    level: 1|2|3
} & StyledTextProps

export const HeadingStyle = styled.h1<HeadingStyleProps>`
    ${TextStyle}
    
    font-size: ${({level}) => `${3/level}rem`};
`