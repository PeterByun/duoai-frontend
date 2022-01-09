import styled from '@emotion/styled'

import {
  BaseFlexBoxStyle,
  BaseFlexBoxStyleProps,
} from '@/components/App/AppBaseFlexBoxStyle'

export type ContainerCoverStyleProps = {
  flexDirection?: string
  items?: string
  justify?: string

  childrenMarginBottom?: string
  backgroundImage?: string
  sticky?: boolean
  opacity?: string
} & BaseFlexBoxStyleProps

export const ContainerCoverStyle = styled.section<ContainerCoverStyleProps>`
  ${BaseFlexBoxStyle}

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

  width: ${({ width }) => (width ? width : '80%')};
  height: ${({ height }) => (height ? height : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '5rem')};

  border-radius: 10px;

  > section {
    background-color: ${({ opacity }) =>
      opacity
        ? `rgba(255, 255, 255, ${opacity});`
        : 'rgba(255, 255, 255, 0.25);'};
    > * {
      margin-bottom: ${({ childrenMarginBottom }) =>
        childrenMarginBottom ? childrenMarginBottom : 0};
    }
    justify-content: ${({ justify }) => (justify ? justify : 'center')};
    padding: ${({ padding }) => (padding ? padding : '5rem')};
    gap: ${({ gap }) => (gap ? gap : '0')};
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
  box-shadow: 0px 5px 15px 0 rgb(30 38 137 / 25%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`
