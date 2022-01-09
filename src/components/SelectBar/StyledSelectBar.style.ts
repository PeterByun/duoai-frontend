import styled from '@emotion/styled'

import { BaseStyle, BaseStyleProps } from '@/components/App/AppBaseStyle'

type SelectBarStyleProps = {
  depth: number
} & BaseStyleProps

export const SelectBarStyle = styled.div<SelectBarStyleProps>`
  ${BaseStyle}

  background-color: ${({ depth }) => {
    switch (depth) {
      case 0:
        return 'var(--gray)'
      default:
        return 'var(--gray)'
    }
  }};

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  overflow-x: auto;
`

type OptionStyleProps = {
  active: boolean
}

export const OptionStyle = styled.button<OptionStyleProps>`
  background: ${({ active }) => {
    if (active) {
      return 'var(--dark-blue)'
    } else {
      return 'transparent'
    }
  }};
  color: ${({ active }) => {
    if (active) {
      return 'var(--white)'
    } else {
      return 'var(--black)'
    }
  }};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 80px;
  height: 40px;

  margin: 0 10px;
  padding: 3px 5px;

  font-size: 1rem;

  border: none;
  border-radius: 3px;

  white-space: nowrap;
  user-select: none;
  transition: all 0.1s ease;

  outline: none;
  -webkit-appearance: none;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
