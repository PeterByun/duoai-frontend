import styled from '@emotion/styled'
import { StyledTextProps, TextStyle } from '@/components-atoms/text/Text'

export type HeadingStyleProps = {
  level: 1 | 2 | 3
} & StyledTextProps

export const HeadingStyle = styled.h1<HeadingStyleProps>`
  ${TextStyle}

  font-size: ${({ level }) => `${3 / level}rem`};
`
