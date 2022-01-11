import styled from '@emotion/styled'

import {
  BaseFlexBoxStyle,
  BaseFlexBoxStyleProps,
} from '@/components/app/AppBaseFlexBoxStyle'

export type StyledModalProps = {
  isOpen: boolean
} & BaseFlexBoxStyleProps

export const StyledModal = styled.div<StyledModalProps>`
  ${BaseFlexBoxStyle}

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background: #2c2c2cc4;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 200vh;
`
