import styled from '@emotion/styled'
import { mq } from '@/components/app/AppGlobalStyle'

import {
  BaseFlexBoxStyle,
  BaseFlexBoxStyleProps,
} from '@/components/app/AppBaseFlexBoxStyle'

export type FlexBoxStyleProps = {
  disabled?: boolean
  flowColumnOnMdScreen?: boolean
} & BaseFlexBoxStyleProps

export const StyledFlexBox = styled.div<FlexBoxStyleProps>`
  ${BaseFlexBoxStyle}

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
