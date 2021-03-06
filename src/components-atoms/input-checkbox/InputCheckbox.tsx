import {
  InputCheckboxStyleProps,
  InputCheckboxStyle,
} from '@/components-atoms/input-checkbox/StyledInputCheckbox.style'

type InputCheckboxProps = {
  children: any
}

const InputCheckbox = (props: InputCheckboxStyleProps & InputCheckboxProps) => {
  return <InputCheckboxStyle {...props}>{props.children}</InputCheckboxStyle>
}

export default InputCheckbox
