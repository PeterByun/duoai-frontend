import {
  FlexBox,
  FlexBoxStyleProps,
} from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Text } from '@/components-atoms/text/Text'

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
    <FlexBox flexDirection="column">
      <FlexBox gap="1rem">
        <Text fontSize="1rem" fontWeight="bold" whiteSpace="nowrap">
          {kda.formattedKda}
        </Text>
        <Text fontSize="1rem" fontWeight="bold">
          {kda.kdaRatio}
        </Text>
      </FlexBox>
    </FlexBox>
  )
}
