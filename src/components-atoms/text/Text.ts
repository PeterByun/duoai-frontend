import { css } from '@emotion/react'
import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type StyledTextProps = {
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
} & ComponentBaseStyleProps

export const TextStyle = (props: StyledTextProps) => {
  return css`
    ${ComponentBaseStyle(props)}

    background: ${props.background};

    -webkit-background-clip: ${props.clipBackground ? 'text' : ''};
    -webkit-text-fill-color: ${props.clipBackground ? 'transparent' : ''};

    background-color: ${!props.background
      ? ''
      : props.highlighted
      ? 'var(--blue)'
      : props.backgroundColor
      ? 'var(--${backgroundColor})'
      : ''};
    color: ${props.highlighted
      ? 'var(--white)'
      : props.color
      ? `var(--${props.color})`
      : `var(--black)`};

    width: ${props.highlighted ? 'fit-content' : 'inintial'};

    font-size: ${props.fontSize ?? '1rem'};
    font-weight: ${props.fontWeight ?? '1rem'};

    margin: ${props.margin ?? 'inintial'};

    text-align: ${props.textAlign ?? 'center'};
    white-space: ${props.whiteSpace ?? 'nowrap'};
  `
}

export const StyledText = styled.p<StyledTextProps>`
  ${TextStyle}
`
