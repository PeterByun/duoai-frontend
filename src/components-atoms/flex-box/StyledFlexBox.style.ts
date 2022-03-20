import styled from '@emotion/styled'
import { mq } from '../../components-features/app/GlobalStyle'
import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

export type FlexBoxStyleProps = {
  flexDirection?: string
  align?: string
  justify?: string
  gap?: string
  boxShadow?: string
  gridColumn?: string
  disabled?: boolean
  flowColumnOnMdScreen?: boolean
} & ComponentBaseStyleProps

export const StyledFlexBox = styled.div<FlexBoxStyleProps>`
  ${ComponentBaseStyle}

  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'row'};
  align-items: ${({ align }) => (align ? align : 'center')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  gap: ${({ gap }) => (gap ? gap : '')};

  grid-column: ${({ gridColumn }) => (gridColumn ? gridColumn : '')};

  cursor: ${({ boxShadow }) => (boxShadow ? boxShadow : '')};

  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : '')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : '')};

  ${mq['sm']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'column' : ''};
  }
  ${mq['md']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'column' : ''};
  }
  ${mq['lg']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'initial' : ''};
  }

  > * {
    pointer-events: ${({ disabled }) => (disabled ? 'none !important' : '')};
  }
`
