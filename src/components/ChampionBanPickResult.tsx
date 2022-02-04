import Strong from '@/components/strong/Strong'
import Canvas from '@/components/canvas/Canvas'
import { drawWinRatioCircle } from '@/components/canvas/win-ratio-circle'

import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { StyledText } from '@/components/text/Text'

import { toPercentage } from '@/utils/string-utils'
import { teamTypes } from '@/constants/match-constants'

import { TeamComparison } from '@/pages/champion/ChampionBanPick'

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
        <StyledText fontSize="2.5rem" textAlign="left">
          <Strong fontSize="2.5rem" color="team-blue">
            블루팀
          </Strong>
          &nbsp;예상승률
        </StyledText>
        <StyledFlexBox flexDirection="row" align="center" justify="center">
          <StyledText
            fontSize="3rem"
            fontWeight="bold"
            color="team-blue"
            position="absolute"
          >
            {toPercentage(props.teamComparison.blue.winRatio)}
          </StyledText>
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
        <StyledText fontSize="2.5rem" textAlign="left">
          <Strong fontSize="2.5rem" color="team-red">
            레드팀
          </Strong>
          &nbsp;예상승률
        </StyledText>
        <StyledFlexBox flexDirection="row" align="center" justify="center">
          <StyledText
            fontSize="3rem"
            fontWeight="bold"
            color="team-red"
            position="absolute"
          >
            {toPercentage(props.teamComparison.red.winRatio)}
          </StyledText>
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
