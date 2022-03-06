import styled from '@emotion/styled'
import { mq } from '../../components/app/AppGlobalStyle'
import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components/app/ComponentBaseStyle'

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
  gap: ${({ gap }) => (gap ? gap : null)};

  grid-column: ${({ gridColumn }) => (gridColumn ? gridColumn : null)};

  cursor: ${({ boxShadow }) => (boxShadow ? boxShadow : null)};

  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : null)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : null)};

  ${mq['sm']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'column' : null};
  }
  ${mq['md']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'column' : null};
  }
  ${mq['lg']} {
    flex-flow: ${({ flowColumnOnMdScreen }) =>
      flowColumnOnMdScreen ? 'initial' : null};
  }

  > * {
    pointer-events: ${({ disabled }) => (disabled ? 'none !important' : null)};
  }
`
