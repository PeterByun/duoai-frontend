import styled from "styled-components";

import { BaseStyle, BaseStyleProps } from "./AppBaseStyle";

export type StyledTextAreaProps = {
} & BaseStyleProps

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
    ${BaseStyle}
`