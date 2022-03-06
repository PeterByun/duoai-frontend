import React from 'react'

import {
  StyledStrong,
  StrongStyleProps,
} from '@/components-atoms/strong/StyledStrong.style'

export interface StrongProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

const Strong = (props: StrongStyleProps & StrongProps) => {
  return (
    <StyledStrong as="strong" {...props}>
      {props.children}
    </StyledStrong>
  )
}

export default Strong
