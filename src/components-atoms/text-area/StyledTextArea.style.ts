import styled from '@emotion/styled'
import { css } from '@emotion/react'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-commons/app/ComponentBaseStyle'

export type StyledTextAreaProps = {} & ComponentBaseStyleProps

const TextAreaStyle = (props: StyledTextAreaProps) => {
  return css`
    ${ComponentBaseStyle(props)}
  `
}

export const TextArea = styled.textarea<StyledTextAreaProps>`
  ${TextAreaStyle}
`
