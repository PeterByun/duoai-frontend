import styled from '@emotion/styled'

import {
  BaseFlexBoxStyle,
  BaseFlexBoxStyleProps,
} from '@/components/app/AppBaseFlexBoxStyle'

export type FlexBoxStyleProps = {
  disabled?: boolean
} & BaseFlexBoxStyleProps

export const StyledFlexBox = styled.div<FlexBoxStyleProps>`
  ${BaseFlexBoxStyle}

  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : null)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : null)};

  > * {
    pointer-events: ${({ disabled }) => (disabled ? 'none !important' : null)};
  }
`
