import React, { InputHTMLAttributes } from 'react'
import {
  InputStyle,
  InputWrapperStyle,
} from '@/components-atoms/input/StyledInput.style'

type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  width?: string
  height?: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  return (
    <InputWrapperStyle width={props.width} height={props.height}>
      {props.label ? <p>{props.label}</p> : null}

      <InputStyle
        {...props}
        onKeyUp={props.onKeyUp}
        onChange={props.onChange}
      />
    </InputWrapperStyle>
  )
}
