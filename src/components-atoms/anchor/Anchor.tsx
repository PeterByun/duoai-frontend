import React from 'react'

import { StyledText, StyledTextProps } from '@/components-atoms/text/Text'

type AnchorProps = {
  children: React.ReactNode
  cursor: string
} & StyledTextProps

export const Anchor = (props: AnchorProps) => {
  return (
    <StyledText as="a" {...props}>
      {props.children}
    </StyledText>
  )
}
