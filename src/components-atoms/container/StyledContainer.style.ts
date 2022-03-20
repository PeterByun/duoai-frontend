import styled from '@emotion/styled'

import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type ContainerCoverStyleProps = {
  flexDirection?: string
  items?: string
  justify?: string

  zIndex?: string

  childrenMarginBottom?: string
  backgroundImage?: string
  sticky?: boolean
  opacity?: string
  gap?: string
  top?: string
} & ComponentBaseStyleProps

export const ContainerCoverStyle = styled.section<ContainerCoverStyleProps>`
  ${ComponentBaseStyle}

  z-index: ${({ zIndex }) => zIndex};

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : 'null'};
  background: var(--white);
  color: var(--black);

  position: ${({ sticky }) => (sticky ? `sticky` : 'relative')};
  display: flex;

  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'column'};

  top: ${({ sticky, top }) => {
    if (sticky) return '0'
    return top ? top : 'null'
  }};

  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '1rem')};

  border-radius: 10px;

  > section {
    background-color: ${({ opacity }) =>
      opacity
        ? `rgba(255, 255, 255, ${opacity});`
        : 'rgba(255, 255, 255, 0.25);'};
    justify-content: ${({ justify }) => (justify ? justify : 'center')};
    padding: ${({ padding }) => (padding ? padding : '1rem')};
    gap: ${({ gap }) => (gap ? gap : '0')};

    > * {
      margin-bottom: ${({ childrenMarginBottom }) =>
        childrenMarginBottom ? childrenMarginBottom : null};
    }
  }
`

export const ContainerStyle = styled.section`
  display: flex;
  flex-direction: inherit;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  border-radius: 10px;
  transition: 0.5s all ease;
  box-shadow: 0px 5px 13px 0 rgb(30 38 137 / 15%);
  backdrop-filter: blur(4px);
`
