import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

export type StyledGridProps = {
  backgroundColor?: string
  gridTemplateRows?: string
  gridTemplateColumns?: string

  gridColumn?: string

  justifyContent?: string

  emphasized?: boolean

  boxShadow?: string
  isChildrenClickable?: boolean
} & ComponentBaseStyleProps

export const StyledGrid = styled.section<StyledGridProps>`
  ${ComponentBaseStyle}

  display: grid;
  grid-template-rows: ${({ gridTemplateRows }) =>
    gridTemplateRows ? gridTemplateRows : 'auto'};
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns ? gridTemplateColumns : 'repeat(10, 1fr)'};
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;

  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : null};

  grid-column: ${({ gridColumn }) => (gridColumn ? gridColumn : null)};

  width: ${({ width }) => {
    return width ? width : 'auto'
  }};
  height: ${({ height }) => {
    return height ? height : 'auto'
  }};

  padding: ${({ padding }) => {
    return padding ? padding : '5%'
  }};

  margin: '0px';

  border-radius: '5px';

  > * {
    :hover {
      cursor: ${({ isChildrenClickable }) =>
        isChildrenClickable ? 'pointer' : null};
    }
  }

  box-shadow: ${({ emphasized, boxShadow }) =>
    emphasized ? '0 20px 15px #949494' : boxShadow ? boxShadow : null};
  transform: ${({ emphasized }) =>
    emphasized ? 'scale(1.1) translate(0, -25%)' : 'null'};

  transition: 0.1s transform ease-in-out, 0.1s box-shadow ease-in-out;
`
