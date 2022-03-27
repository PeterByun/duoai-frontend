import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type SelectBarItem = {
  name: string
  value: string
}

type StyledSelectBarProps = {
  depth: number
} & ComponentBaseStyleProps

export const SelectBar = styled.div<StyledSelectBarProps>`
  ${ComponentBaseStyle}

  background-color: transparent;

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  overflow-x: auto;
`

type StyledOptionProps = {
  active: boolean
}

export const Option = styled.button<StyledOptionProps>`
  background: transparent;
  color: var(--black);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 80px;
  height: 40px;

  margin: 0 10px;
  padding: 3px 5px;

  font-size: 1.2rem;

  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border: 1px solid transparent;
  border-bottom: ${({ active }) =>
    active ? '1px solid var(--black)' : 'none'};

  white-space: nowrap;
  user-select: none;
  transition: all 0.1s ease;

  outline: none;
  -webkit-appearance: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
