import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

export type StyledImgProps = {
  disabled?: boolean
  backgroundImage?: string
} & ComponentBaseStyleProps

export const StyledImg = styled.img<StyledImgProps>`
  ${ComponentBaseStyle}

  background-image: ${({ backgroundImage }) => `url('${backgroundImage}')`};

  cursor: ${({ disabled, onClick }) => {
    if (disabled) return null
    return onClick ? 'pointer' : null
  }};

  :hover {
    opacity: ${({ disabled, onClick }) => {
      if (disabled) return null
      return onClick ? '0.8' : null
    }};
  }
`
