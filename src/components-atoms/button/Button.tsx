import React from 'react'

import {
  ButtonStyle,
  ButtonStyleProps,
} from '@/components-atoms/button/StyledButton'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  primary?: boolean
  circle?: boolean
}

const Button = (props: ButtonProps & ButtonStyleProps) => {
  return (
    <ButtonStyle
      as="button"
      onClick={props.onClick}
      css={{
        borderRadius: props.circle ? '100%' : '',
        width: props.circle ? props.width || '5rem' : '',
        height: props.circle ? props.width || '5rem' : '',
      }}
    >
      {props.children}
    </ButtonStyle>
  )
}

export default Button
