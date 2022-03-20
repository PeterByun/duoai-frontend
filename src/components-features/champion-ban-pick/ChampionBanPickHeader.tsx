import Button from '@/components-atoms/button/Button'
import Strong from '@/components-atoms/strong/Strong'

import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Text } from '@/components-atoms/text/Text'

import { capitalize } from '@/utils/string-utils'
import { useMemo } from 'react'

import { ChampionImg } from '@/types/champion-types'

export const ChampionBanPickHeader = (props: {
  selectedTeamColor: string
  onSwitchTeamClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onAnalyze: (e: React.MouseEvent<HTMLButtonElement>) => void
  selectedChampions: {
    blueTeamChampions: Array<ChampionImg>
    redTeamChampions: Array<ChampionImg>
  }
}) => {
  const isReadyToAnalyze = useMemo(() => {
    return (
      props.selectedChampions.blueTeamChampions.length === 5 &&
      props.selectedChampions.redTeamChampions.length === 5
    )
  }, [props.selectedChampions])

  return (
    <FlexBox
      flexDirection="row"
      width="90%"
      padding="1rem"
      margin="1rem"
      flowColumnOnMdScreen
    >
      {isReadyToAnalyze ? (
        <Text
          fontSize="clamp(16px, 3.5rem, 4vw)"
          fontWeight="bold"
          textAlign="left"
          whiteSpace="pre-wrap"
        >
          분석하기 버튼을 눌러보세요.
        </Text>
      ) : (
        <>
          <Strong
            color="white"
            backgroundColor={`team-${props.selectedTeamColor}`}
            fontSize="clamp(16px, 3.5rem, 4vw)"
            fontWeight="bold"
            textAlign="left"
          >
            {capitalize(props.selectedTeamColor)}팀
          </Strong>

          <Text
            fontSize="clamp(16px, 3.5rem, 4vw)"
            fontWeight="bold"
            textAlign="left"
          >
            &nbsp; 챔피언을 선택해주세요.
          </Text>
        </>
      )}

      <FlexBox
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
      </FlexBox>
    </FlexBox>
  )
}
