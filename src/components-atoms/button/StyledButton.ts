import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

export type ButtonStyleProps = {
  fontWeight?: string
  borderRadius?: string
  fontSize?: string
} & ComponentBaseStyleProps

export const ButtonStyle = styled.button<ButtonStyleProps>`
  ${ComponentBaseStyle}

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ backgroundColor }) =>
    backgroundColor ? `var(--${backgroundColor})` : 'var(--dark-blue)'};
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
