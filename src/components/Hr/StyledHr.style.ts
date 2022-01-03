import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '../components/AppBaseStyle'

export type StyledHrProps = {
} & BaseStyleProps

export const StyledHr = styled.img<StyledHrProps>`
  ${BaseStyle}
    width: 80%;
    height: 1px ;
    background: #dbdbdb;
    border-radius: 5px;
    border-color: transparent;
`