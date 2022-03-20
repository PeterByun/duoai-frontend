import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type StyledHrProps = {} & ComponentBaseStyleProps

export const Hr = styled.img<StyledHrProps>`
  ${ComponentBaseStyle}
  width: 80%;
  height: 1px;
  background: #dbdbdb;
  border-radius: 5px;
  border-color: transparent;
`
