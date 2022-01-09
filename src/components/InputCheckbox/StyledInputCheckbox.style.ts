import styled from '@emotion/styled'

import {
  BaseFlexBoxStyle,
  BaseFlexBoxStyleProps,
} from '@/components/App/AppBaseFlexBoxStyle'

export type InputCheckboxStyleProps = {} & BaseFlexBoxStyleProps

export const InputCheckboxStyle = styled.input<InputCheckboxStyleProps>`
  ${BaseFlexBoxStyle}

  background: var(--white);
  color: var(--black);

  align-items: 'flex-start';
  justify-content: 'center';

  width: auto;
  height: auto;
`
