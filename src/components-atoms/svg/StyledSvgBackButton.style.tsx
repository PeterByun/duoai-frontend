import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

export type StyledSvgBackButtonProps = {
  isButton?: boolean
} & ComponentBaseStyleProps

export const StyledSvgBackButton = styled.svg<StyledSvgBackButtonProps>`
  ${ComponentBaseStyle}

  cursor: ${({ isButton }) => (isButton ? 'pointer' : null)};

  :hover {
    opacity: ${({ isButton }) => (isButton ? '0.8' : null)};
  }
`
