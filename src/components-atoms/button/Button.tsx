import React from 'react'

import {
  ButtonStyle,
  ButtonStyleProps,
} from '@/components-atoms/button/StyledButton'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

const Button = (props: ButtonProps & ButtonStyleProps) => {
  return (
    <ButtonStyle as="button" onClick={props.onClick} {...props}>
      {props.children}
    </ButtonStyle>
  )
}

export default Button
