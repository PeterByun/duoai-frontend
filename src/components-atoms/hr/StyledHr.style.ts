import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

export type StyledHrProps = {} & ComponentBaseStyleProps

export const StyledHr = styled.img<StyledHrProps>`
  ${ComponentBaseStyle}
  width: 80%;
  height: 1px;
  background: #dbdbdb;
  border-radius: 5px;
  border-color: transparent;
`
