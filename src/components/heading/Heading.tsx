import React from 'react'

import {
  HeadingStyle,
  HeadingStyleProps,
} from '@/components/heading/StyledHeading.style'
import { StyledTextProps } from '@/components/text/Text'

type HeadingProps = {
  children?: React.ReactNode
} & StyledTextProps &
  HeadingStyleProps

const Heading = (props: HeadingProps) => {
  return <HeadingStyle {...props}>{props.children}</HeadingStyle>
}

export default Heading
