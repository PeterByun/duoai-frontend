import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/app/AppBaseStyle'

export type StyledTextAreaProps = {} & BaseStyleProps

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${BaseStyle}
`
