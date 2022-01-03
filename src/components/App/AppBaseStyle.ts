import { css } from '@emotion/react'

export type BaseStyleProps = {
    backgroundColor?: string
    color?: string
    fontSize?: string
    
    position?: string
    top?: string
    bottom?: string
    left?: string
    right?: string

    width?: string
    height?: string
    minWidth?: string
    minHeight?: string

    margin?: string
    padding?: string

    border?: string
    borderRadius?: string

    cursor?: string
    zIndex?: string
    wordBreak?: string
    whiteSpace?: string
}

export const BaseStyle = (props:BaseStyleProps) => {
    return css`
        background-color: var(--${props.backgroundColor});
        color: var(--${props.color});
        font-size: ${props.fontSize};
        
        position: ${props.position};
        top: ${props.top};
        bottom: ${props.bottom};
        left: ${props.left};
        right: ${props.right};

        width: ${props.width};
        height: ${props.height};
        
        min-width: ${props.minWidth};
        min-height: ${props.minHeight};

        margin: ${props.margin};
        padding: ${props.padding};

        border: ${props.border};
        border-radius: ${props.borderRadius};

        z-index: ${props.zIndex};
        cursor: ${props.cursor};
        word-break: ${props.wordBreak};
        white-space: ${props.whiteSpace};
    `
}