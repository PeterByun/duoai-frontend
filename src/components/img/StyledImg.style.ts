import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/app/AppBaseStyle'

export type ImgStyleProps = {
  disabled?: boolean
  backgroundImage?: string
} & BaseStyleProps

export const ImgStyle = styled.img<ImgStyleProps>`
  ${BaseStyle}

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
