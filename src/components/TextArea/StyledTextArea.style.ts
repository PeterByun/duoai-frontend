import styled from "styled-components";

import { BaseStyle, BaseStyleProps } from "../components/AppBaseStyle";

export type StyledTextAreaProps = {
} & BaseStyleProps

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
    ${BaseStyle}
`