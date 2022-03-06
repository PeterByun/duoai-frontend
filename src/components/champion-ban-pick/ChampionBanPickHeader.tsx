import Button from '@/components-atoms/button/Button'
import Strong from '@/components-atoms/strong/Strong'

import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { StyledText } from '@/components-atoms/text/Text'

import { capitalize } from '@/utils/string-utils'

export const ChampionBanPickHeader = (props: {
  selectedTeamColor: string
  onSwitchTeamClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onAnalyze: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <StyledFlexBox
      flexDirection="row"
      width="90%"
      padding="1rem"
      margin="1rem"
      flowColumnOnMdScreen
    >
      <Strong
        color="white"
        backgroundColor={`team-${props.selectedTeamColor}`}
        fontSize="clamp(16px, 3.5rem, 4vw)"
        fontWeight="bold"
        textAlign="left"
      >
        {capitalize(props.selectedTeamColor)}팀
      </Strong>

      <StyledText
        fontSize="clamp(16px, 3.5rem, 4vw)"
        fontWeight="bold"
        textAlign="left"
      >
        &nbsp; 챔피언을 선택해주세요.
      </StyledText>

      <StyledFlexBox
        flexDirection="column"
        justify="space-evenly"
        width="28rem"
        height="12rem"
        padding="0"
        margin="0"
        gap="1rem"
      >
        <Button
          width="10rem"
          height="5rem"
          css={{
            fontSize: '1.5rem',
          }}
          onClick={props.onSwitchTeamClick}
        >
          팀 변경
        </Button>
        <Button
          width="10rem"
          height="5rem"
          backgroundColor="blue"
          css={{
            fontSize: '1.5rem',
          }}
          onClick={props.onAnalyze}
        >
          분석하기
        </Button>
      </StyledFlexBox>
    </StyledFlexBox>
  )
}
