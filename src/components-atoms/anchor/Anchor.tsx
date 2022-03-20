import React from 'react'

import { Text, StyledTextProps } from '@/components-atoms/text/Text'

type AnchorProps = {
  children: React.ReactNode
  cursor: string
} & StyledTextProps

export const Anchor = (props: AnchorProps) => {
  return (
    <Text as="a" {...props}>
      {props.children}
    </Text>
  )
}
