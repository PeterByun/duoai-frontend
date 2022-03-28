import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-commons/app/ComponentBaseStyle'

export type ButtonStyleProps = {
  fontWeight?: string
  borderRadius?: string
  fontSize?: string
  primary?: boolean
} & ComponentBaseStyleProps

export const ButtonStyle = styled.button<ButtonStyleProps>`
  ${ComponentBaseStyle}

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ backgroundColor, primary }) => {
    if (primary) return 'var(--blue)'
    return backgroundColor ? `var(--${backgroundColor})` : 'var(--dark-blue)'
  }};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'bold')};
  color: var(--white);

  border: none;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '0.5rem'};

  text-align: center;
  cursor: pointer;

  outline: none;
  -webkit-appearance: none;

  :hover {
    filter: brightness(1.2);
  }
`
