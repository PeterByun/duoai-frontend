import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/app/AppBaseStyle'

export type StyledSvgBackButtonProps = {
  isButton?: boolean
} & BaseStyleProps

export const StyledSvgBackButton = styled.svg<StyledSvgBackButtonProps>`
  ${BaseStyle}

  cursor: ${({ isButton }) => (isButton ? 'pointer' : null)};

  :hover {
    opacity: ${({ isButton }) => (isButton ? '0.8' : null)};
  }
`
