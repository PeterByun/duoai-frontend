import styled from '@emotion/styled'

import { BaseFlexBoxStyle, BaseFlexBoxStyleProps } from './AppBaseFlexBoxStyle'

export type FlexBoxStyleProps = {
  disabled?: boolean
} & BaseFlexBoxStyleProps

export const FlexBoxStyle = styled.div<FlexBoxStyleProps>`
  ${BaseFlexBoxStyle}

  filter: ${({disabled}) => disabled ? 'grayscale(1)' : null };
  cursor: ${({disabled}) => disabled ? 'not-allowed' : null };

  > * {
    pointer-events: ${({disabled}) => disabled ? 'none !important' : null };
  }
`