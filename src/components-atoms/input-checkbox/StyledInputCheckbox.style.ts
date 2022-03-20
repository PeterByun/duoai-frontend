import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type InputCheckboxStyleProps = {} & ComponentBaseStyleProps

export const InputCheckboxStyle = styled.input<InputCheckboxStyleProps>`
  ${ComponentBaseStyle}

  background: var(--white);
  color: var(--black);

  align-items: 'flex-start';
  justify-content: 'center';

  width: auto;
  height: auto;
`
