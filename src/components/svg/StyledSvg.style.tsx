import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/app/AppBaseStyle'

export type StyledSvgProps = {
  isButton?: boolean
} & BaseStyleProps

export const StyledSvg = styled.svg<StyledSvgProps>`
  ${BaseStyle}

  cursor: ${({ isButton }) => (isButton ? 'pointer' : null)};

  :hover {
    opacity: ${({ isButton }) => (isButton ? '0.8' : null)};
  }
`
