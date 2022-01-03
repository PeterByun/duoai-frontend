import React from 'react'

import { 
    ContainerStyle, 
    ContainerCoverStyle, 
    ContainerCoverStyleProps 
} from '../components-styled/StyledContainer.style'

type ContainerProps = ContainerCoverStyleProps & {
    children: any
}

// TODO: a container should take two props. One for the wrapper, and the other for the container.
export default function Container(props: ContainerProps) {
    return (
    <ContainerCoverStyle
        {...props}
    >
        <ContainerStyle
        >
            {props.children}
        </ContainerStyle>
      </ContainerCoverStyle>
    )
}
