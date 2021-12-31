import React from 'react'

import {
    ImgStyle,
    ImgStyleProps
} from '../components-styled/StyledImg.style'

import { StyledText } from '../components-styled/StyledText.style'
import { FlexBoxStyle } from '../components-styled/StyledFlexBox.style'

type ImgChampionProps = {
    image: {
        name?: string
        src: string
    }
    
    color?: string

    width?: string
    height?: string
    
    children?: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
    disabled?: boolean
    isNameHidden?: boolean
}

const ImgChampion = (props: ImgStyleProps & ImgChampionProps) => {
    return (
        <FlexBoxStyle 
            aria-label="image-wrapper"
            flexDirection='column'
            align="center"
            disabled={props.disabled}
        >
            <ImgStyle
                onClick={props.onClick}
                src={props.image.src}

                width={props.width ? props.width : '3rem'}
                height={props.height ? props.height : '3rem'}

                aria-label={props.image.name}

                {...props}
            >
                {props.children}
            </ImgStyle>
            { !props.isNameHidden && <StyledText textAlign='center' width='100%' color={props.color}>
                {props.image.name}
            </StyledText>}
        </FlexBoxStyle>
    )
}

export default ImgChampion
