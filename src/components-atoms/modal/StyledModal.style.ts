import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-commons/app/ComponentBaseStyle'

export type StyledModalProps = {
  isOpen: boolean
} & ComponentBaseStyleProps

export const StyledModal = styled.div<StyledModalProps>`
  ${ComponentBaseStyle}

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background: #2c2c2cc4;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 200vh;
`
