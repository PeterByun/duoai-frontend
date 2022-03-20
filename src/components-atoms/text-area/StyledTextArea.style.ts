import styled from '@emotion/styled'
import { css } from '@emotion/react'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type StyledTextAreaProps = {} & ComponentBaseStyleProps

const TextAreaStyle = (props: StyledTextAreaProps) => {
  return css`
    ${ComponentBaseStyle(props)}
  `
}

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${TextAreaStyle}
`
