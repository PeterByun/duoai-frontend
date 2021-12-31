import React from 'react'

import { HeadingStyle, HeadingStyleProps } from '../components-styled/StyledHeading.style'
import { StyledTextProps } from '../components-styled/StyledText.style'

type HeadingProps = {
    children?: React.ReactNode
} & StyledTextProps &  HeadingStyleProps 

const Heading = (props: HeadingProps) => {
    return (
        <HeadingStyle {...props}>
            {props.children}
        </HeadingStyle>
    )
}
    
export default Heading