import Strong from '@/components-atoms/strong/Strong'
import Canvas from '@/components-atoms/canvas/Canvas'
import { drawWinRatioCircle } from '@/components-atoms/canvas/WinRatioCircle'

import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Text } from '@/components-atoms/text/Text'

import { toPercentage } from '@/utils/string-utils'
import { teamTypes } from '@/constants/match-constants'

import { TeamComparison } from '@/pages/champion/ChampionBanPick'

const ExpectedWinRateHeader = (props: { teamName: string }) => {
  const textColor = props.teamName === '블루팀' ? 'team-blue' : 'team-red'

  return (
    <Text fontSize="2.5rem" textAlign="left">
      <Strong fontSize="2.5rem" color={textColor}>
        {props.teamName}
      </Strong>
      &nbsp;예상승률
    </Text>
  )
}

const ExpectedWinRateBody = (props: {
  expectedWinRate: number
  teamColor: 'red' | 'blue'
}) => {
  return (
    <Text
      fontSize="3rem"
      fontWeight="bold"
      color={`team-${props.teamColor}`}
      css={{
        position: 'absolute',
      }}
    >
      {toPercentage(props.expectedWinRate)}
    </Text>
  )
}

export const ChampionBanPickResult = (props: {
  teamComparison: TeamComparison
}) => {
  return (
    <FlexBox
      flexDirection="row"
      justify="space-between"
      width="95%"
      margin="0"
      padding="1rem"
      flowColumnOnMdScreen
    >
      <FlexBox flexDirection="column" padding="1rem">
        <ExpectedWinRateHeader teamName="블루팀" />

        <FlexBox flexDirection="row" align="center" justify="center">
          <ExpectedWinRateBody
            teamColor="blue"
            expectedWinRate={props.teamComparison.blue.winRatio}
          />

          <Canvas
            draw={drawWinRatioCircle(
              props.teamComparison.blue.winRatio,
              teamTypes.blue
            )}
            rest={{
              width: '200',
              height: '200',
            }}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox flexDirection="column" padding="1rem">
        <ExpectedWinRateHeader teamName="레드팀" />

        <FlexBox flexDirection="row" align="center" justify="center">
          <ExpectedWinRateBody
            teamColor="red"
            expectedWinRate={props.teamComparison.red.winRatio}
          />
          <Canvas
            draw={drawWinRatioCircle(
              props.teamComparison.red.winRatio,
              teamTypes.red
            )}
            rest={{
              width: '200',
              height: '200',
            }}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
