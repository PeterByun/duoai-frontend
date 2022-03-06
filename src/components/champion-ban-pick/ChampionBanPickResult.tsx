import Strong from '@/components-atoms/strong/Strong'
import Canvas from '@/components-atoms/canvas/Canvas'
import { drawWinRatioCircle } from '@/components-atoms/canvas/WinRatioCircle'

import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { StyledText } from '@/components-atoms/text/Text'

import { toPercentage } from '@/utils/string-utils'
import { teamTypes } from '@/constants/match-constants'

import { TeamComparison } from '@/pages/champion/ChampionBanPick'

const ExpectedWinRateHeader = (props: { teamName: string }) => {
  const textColor = props.teamName === '블루팀' ? 'team-blue' : 'team-red'

  return (
    <StyledText fontSize="2.5rem" textAlign="left">
      <Strong fontSize="2.5rem" color={textColor}>
        {props.teamName}
      </Strong>
      &nbsp;예상승률
    </StyledText>
  )
}

const ExpectedWinRateBody = (props: {
  expectedWinRate: number
  teamColor: 'red' | 'blue'
}) => {
  return (
    <StyledText
      fontSize="3rem"
      fontWeight="bold"
      color={`team-${props.teamColor}`}
      css={{
        position: 'absolute',
      }}
    >
      {toPercentage(props.expectedWinRate)}
    </StyledText>
  )
}

export const ChampionBanPickResult = (props: {
  teamComparison: TeamComparison
}) => {
  return (
    <StyledFlexBox
      flexDirection="row"
      justify="space-between"
      width="95%"
      margin="0"
      padding="1rem"
      flowColumnOnMdScreen
    >
      <StyledFlexBox flexDirection="column" padding="1rem">
        <ExpectedWinRateHeader teamName="블루팀" />

        <StyledFlexBox flexDirection="row" align="center" justify="center">
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
        </StyledFlexBox>
      </StyledFlexBox>

      <StyledFlexBox flexDirection="column" padding="1rem">
        <ExpectedWinRateHeader teamName="레드팀" />

        <StyledFlexBox flexDirection="row" align="center" justify="center">
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
        </StyledFlexBox>
      </StyledFlexBox>
    </StyledFlexBox>
  )
}
