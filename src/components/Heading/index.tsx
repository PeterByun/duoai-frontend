import React from 'react'

import {
  HeadingStyle,
  HeadingStyleProps,
} from '@/components/Heading/StyledHeading.style'
import { StyledTextProps } from '@/components/Text'

type HeadingProps = {
  children?: React.ReactNode
} & StyledTextProps &
  HeadingStyleProps

const Heading = (props: HeadingProps) => {
  return <HeadingStyle {...props}>{props.children}</HeadingStyle>
}

export default Heading
