import React from "react";

import { StyledText, StyledTextProps } from '@/components/Text'

type AnchorProps = {
    children: React.ReactNode
} & StyledTextProps

export const Anchor = (props: AnchorProps) => {
    return (
        <StyledText as="a" {...props}>
            {props.children}
        </StyledText>
    )
}