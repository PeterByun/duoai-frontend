import { css } from '@emotion/react'

export type ComponentBaseStyleProps = {
  backgroundColor?: string
  color?: string
  // CSS box model properties
  width?: string
  height?: string
  padding?: string
  margin?: string
}

export const ComponentBaseStyle = (props: ComponentBaseStyleProps) => {
  return css`
    background-color: var(--${props.backgroundColor});
    color: var(--${props.color});
    width: ${props.width};
    height: ${props.height};
    padding: ${props.padding};
    margin: ${props.margin};
  `
}
