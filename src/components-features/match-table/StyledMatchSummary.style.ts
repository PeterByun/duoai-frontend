import styled from '@emotion/styled'

import { mq } from '@/components-features/app/GlobalStyle'
import {
  ComponentBaseStyle,
  ComponentBaseStyleProps,
} from '@/components-features/app/ComponentBaseStyle'

type StyledMatchSummaryProps = {
  win?: boolean
} & ComponentBaseStyleProps

type StyledMatchSummaryWrapperProps = {} & ComponentBaseStyleProps

export const StyledMatchSummaryWrapper = styled.article<StyledMatchSummaryWrapperProps>`
  ${ComponentBaseStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledMatchSummary = styled.div<StyledMatchSummaryProps>`
  ${ComponentBaseStyle}

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border: 0.5rem solid var(--win);
  border-radius: 5px;

  padding: 1rem;
  border: ${({ win }) =>
    win ? '0.5rem solid var(--win)' : '0.5rem solid var(--lose-dark)'};
  border-radius: 5px;

  ${mq['sm']} {
    flex-flow: column;
  }

  ${mq['md']} {
    flex-flow: row;
  }

  ${mq['lg']} {
    flex-flow: row;
  }
`
