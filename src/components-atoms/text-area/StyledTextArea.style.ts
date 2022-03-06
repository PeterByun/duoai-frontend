import styled from '@emotion/styled'

import { StyledTextProps, TextStyle } from '@/components-atoms/text/Text'

export type StyledTextAreaProps = {} & StyledTextProps

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${TextStyle}
`
