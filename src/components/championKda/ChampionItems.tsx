import React from 'react'

import {
  StyledFlexBox,
  FlexBoxStyleProps,
} from '@/components/flexBox/StyledFlexBox.style'
import { StyledText } from '@/components/text/Text'

import { formatKda } from '@/utils/string-utils'

type ChampionKdaProps = FlexBoxStyleProps & {
  kills: number | undefined
  deaths: number | undefined
  assists: number | undefined
}

export default function ChampionKda(props: ChampionKdaProps) {
  const kda = formatKda({
    kills: props.kills || 0,
    deaths: props.deaths || 0,
    assists: props.assists || 0,
  })

  return (
    <StyledFlexBox flexDirection="column">
      <StyledFlexBox gap="1rem">
        <StyledText fontSize="1rem" fontWeight="bold" whiteSpace="nowrap">
          {kda.formattedKda}
        </StyledText>
        <StyledText fontSize="1rem" fontWeight="bold">
          {kda.kdaRatio}
        </StyledText>
      </StyledFlexBox>
    </StyledFlexBox>
  )
}
