import React from 'react'

import {
  HeadingStyle,
  HeadingStyleProps,
} from '@/components-atoms/heading/StyledHeading.style'
import { StyledTextProps } from '@/components-atoms/text/Text'

type HeadingProps = {
  children?: React.ReactNode
} & StyledTextProps &
  HeadingStyleProps

const Heading = (props: HeadingProps) => {
  return <HeadingStyle {...props}>{props.children}</HeadingStyle>
}

export default Heading
