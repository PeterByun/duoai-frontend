import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/App/AppBaseStyle'

export type ImgStyleProps = {
  disabled?: boolean
} & BaseStyleProps

export const ImgStyle = styled.img<ImgStyleProps>`
  ${BaseStyle}

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
