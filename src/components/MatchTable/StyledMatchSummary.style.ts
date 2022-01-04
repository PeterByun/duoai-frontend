import styled from '@emotion/styled'

import { BaseFlexBoxStyle, BaseFlexBoxStyleProps } from '@/components/App/AppBaseFlexBoxStyle'

type MatchSummaryStyleProps = {
    win?: boolean
} & BaseFlexBoxStyleProps

type MatchSummaryWrapperStyleProps = {
} & BaseFlexBoxStyleProps

export const MatchSummaryWrapperStyle = styled.article<MatchSummaryWrapperStyleProps>`
    ${BaseFlexBoxStyle}
`

export const MatchSummaryStyle = styled.div<MatchSummaryStyleProps>`
    ${BaseFlexBoxStyle}

    padding: 1rem;
    border: ${({win}) => win ? '0.5rem solid var(--win)' : '0.5rem solid var(--lose-dark)' };
    border-radius: 5px;
`