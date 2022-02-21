import Heading from '@/components/heading/Heading'

import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { StyledHr } from '@/components/hr/StyledHr.style'
import ImgChampion from '@/components/img/ImgChampion'
import Strong from '@/components/strong/Strong'
import Container from '@/components/container/Container'

import { useAppSelector } from '@/redux/hooks'
import { findRankIcon } from '@/redux/slices/assetSlice'
import { useChampionImages } from '@/hooks/use-champion-images'

import {
  toPercentage,
  formatKda,
  getHowOldFromNow,
  getStreakMessage,
  capitalize,
} from '@/utils/string-utils'

import { RANKED_EMBLEMS } from '@/constants/multi-search-constants'
import { ImgWithLabel } from '../img/ImgWithLabel'

export type SummonerSearchResult = {
  summonerName: string
  summonerTier:
    | 'GRANDMASTER'
    | 'MASTER'
    | 'CHALLENGER'
    | 'DIAMOND'
    | 'PLATINUM'
    | 'GOLD'
    | 'SILVER'
    | 'BRONZE'
    | 'IRON'
  summonerRank: string
  leaguePoints: number
  wins: number
  losses: number
  mainPosition: LaneLabelKeys
  mainPositionPickRate: number
  mainPositionWinRate: number
  subPosition: string
  subPositionPickRate: number
  subPositionWinRate: number
  streakInfo: string
  streakResult: number
  playedGameInfoList: {
    kills: number
    deaths: number
    assists: number
    date: string
    championId: string
    championNameKor: string
    championNameEng: string
    win: boolean
  }[]
}

type MultiSearchResultCardProps = {
  summonerSearchResult: SummonerSearchResult
}

const LANE_LABELS = {
  TOP: '탑',
  JUNGLE: '정글',
  MIDDLE: '미드',
  BOTTOM: '원딜',
  UTILITY: '서포터',
  'NO SubPotision': null,
}

type LaneLabelKeys = keyof typeof LANE_LABELS

const MultiSearchResultCard = (props: MultiSearchResultCardProps) => {
  const { getChampionImage } = useChampionImages()

  return (
    <Container
      flexDirection="column"
      justify="flex-start"
      width="16rem"
      gap="1rem"
      padding="1rem"
      margin="0"
    >
      <StyledFlexBox flexDirection="column">
        <Heading level={2}>{props.summonerSearchResult.summonerName}</Heading>
        <ImgWithLabel
          image={{
            name: props.summonerSearchResult.summonerTier,
            src: useAppSelector(
              findRankIcon(
                RANKED_EMBLEMS[
                  props.summonerSearchResult.summonerTier.toLowerCase() as keyof typeof RANKED_EMBLEMS
                ]
              )
            ).src,
          }}
          isNameHidden
        />
        <StyledText fontSize="2rem">
          {`${capitalize(
            props.summonerSearchResult.summonerTier.toLocaleLowerCase()
          )} ${props.summonerSearchResult.summonerRank}`}
        </StyledText>
        <StyledText fontSize="1rem" margin="0">
          {props.summonerSearchResult.leaguePoints} 점
        </StyledText>
        <StyledText fontSize="1rem" color="win" margin="0">
          {props.summonerSearchResult.wins} 승
        </StyledText>
        <StyledText fontSize="1rem" color="lose" margin="0">
          {props.summonerSearchResult.losses} 패
        </StyledText>
      </StyledFlexBox>

      <StyledFlexBox
        flexDirection="row"
        border="0px 0px 1px 0px solid black"
        padding="0 1rem"
      >
        <StyledText>
          {LANE_LABELS[props.summonerSearchResult.mainPosition]}
        </StyledText>
        <StyledFlexBox flexDirection="column" align="flex-start">
          <StyledText margin="0">
            • 전체 게임의
            <Strong color="blue">
              {toPercentage(props.summonerSearchResult.mainPositionPickRate)}
            </Strong>
          </StyledText>
          <StyledText margin="0">
            • 승률
            <Strong color="blue">
              {toPercentage(props.summonerSearchResult.mainPositionWinRate)}
            </Strong>
          </StyledText>
        </StyledFlexBox>
      </StyledFlexBox>

      <StyledFlexBox flexDirection="row">
        <StyledText>{props.summonerSearchResult.subPosition}</StyledText>
        <StyledFlexBox flexDirection="column" align="flex-start">
          <StyledText margin="0">
            • 전체 게임의
            <Strong color="blue">
              {toPercentage(props.summonerSearchResult.subPositionPickRate)}
            </Strong>
          </StyledText>
          <StyledText margin="0">
            • 승률
            <Strong color="blue">
              {toPercentage(props.summonerSearchResult.subPositionWinRate)}
            </Strong>
          </StyledText>
        </StyledFlexBox>
      </StyledFlexBox>

      {props.summonerSearchResult.streakResult > 0 && (
        <StyledFlexBox flexDirection="row">
          {`${props.summonerSearchResult.streakResult} ${getStreakMessage(
            props.summonerSearchResult.streakInfo
          )}`}
        </StyledFlexBox>
      )}

      <StyledHr></StyledHr>

      {props.summonerSearchResult.playedGameInfoList ? (
        <StyledFlexBox flexDirection="column" align="flex-start" width="100%">
          {props.summonerSearchResult.playedGameInfoList.map((gameRecord) => {
            return (
              <StyledFlexBox
                key={gameRecord.date}
                flexDirection="row"
                width="100%"
              >
                <ImgChampion
                  width="1.5rem"
                  height="1.5rem"
                  borderRadius="100%"
                  border="1px solid var(--white)"
                  isNameHidden
                  image={{
                    name: gameRecord.championNameKor,
                    src: getChampionImage(gameRecord.championNameEng),
                  }}
                />
                &nbsp;
                {
                  formatKda({
                    kills: gameRecord.kills,
                    deaths: gameRecord.deaths,
                    assists: gameRecord.assists,
                  }).formattedKda
                }
                <StyledText margin="0 0 0 auto">
                  {getHowOldFromNow(gameRecord.date)}
                </StyledText>
              </StyledFlexBox>
            )
          })}
        </StyledFlexBox>
      ) : null}
    </Container>
  )
}

export default MultiSearchResultCard
