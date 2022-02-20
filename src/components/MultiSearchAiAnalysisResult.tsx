import Heading from '@/components/heading/Heading'
import Strong from '@/components/strong/Strong'
import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import Container from './container/Container'
import Grid from './grid/Grid'
import { ImgWithLabel } from '@/components/img/ImgWithLabel'
import ImgChampion from '@/components/img/ImgChampion'

import { useAppSelector } from '@/redux/hooks'
import { useChampionImages } from '@/hooks/use-champion-images'
import { findRankIcon, findSummonerTraitIcons } from '@/redux/slices/assetSlice'
import { capitalize, toPercentage } from '@/utils/string-utils'

import {
  SUMMONER_LANES,
  RANKED_EMBLEMS,
} from '@/constants/multi-search-constants'

type PreferedChamp = {
  champNameEng: string
  champNameKor: string
}

type SummonerProfileIcon = {
  type: '성장형' | '공격형' | '방어형' | '운영형' | '이니시형'
  point: 0 | 1
}

type RankedEmblemKeys = keyof typeof RANKED_EMBLEMS

type SummonerProfile = {
  name: string
  tier: string
  rank: string
  leaguePoints: number
  lane: keyof typeof SUMMONER_LANES
  icons: SummonerProfileIcon[]
  preferredChamps: PreferedChamp[]
}

export type AiAnalysisResult = {
  expectedWinRate: number
  // teamChemiPoints: number
  mainLanerCount: {
    top: number
    jungle: number
    mid: number
    adc: number
    support: number
  }
  summonerProfiles: SummonerProfile[]
}

const MainLanerCount = (props: { lane: string; count: number }) => {
  return (
    <Container flexDirection="column">
      <StyledText
        fontSize="1rem"
        fontWeight="bold"
        color="dark-gray"
        margin="0"
      >
        {props.lane}
      </StyledText>
      <StyledText fontSize="1rem" color="dark-gray" margin="0">
        {props.count}명
      </StyledText>
    </Container>
  )
}

const COLORS_BY_POINT: {
  [key: string]: string
} = {
  1: 'summoner-skill-bad',
  2: 'summoner-skill-good',
} as const

export const MultiSearchAiAnalysisResult = ({
  aiAnalysisResult,
}: {
  aiAnalysisResult: AiAnalysisResult
}) => {
  const { getChampionImage } = useChampionImages()
  const summonerTraitIcons = useAppSelector(findSummonerTraitIcons)

  return (
    <Container>
      <StyledFlexBox flexDirection="column" gap="1rem">
        <Container flexDirection="column" width="60%">
          <Heading level={2} margin="1rem 0">
            예상 게임 승률
          </Heading>
          <StyledText fontSize="3rem" color="dark-gray" margin="0">
            {toPercentage(aiAnalysisResult.expectedWinRate)}
          </StyledText>
        </Container>

        <Container flexDirection="column">
          <Heading level={2} margin="1rem 0">
            모스트 라인 팀원수
          </Heading>
          <StyledFlexBox gap="1rem">
            <MainLanerCount
              lane="탑"
              count={aiAnalysisResult.mainLanerCount.top}
            />
            <MainLanerCount
              lane="정글"
              count={aiAnalysisResult.mainLanerCount.jungle}
            />
            <MainLanerCount
              lane="미드"
              count={aiAnalysisResult.mainLanerCount.mid}
            />
            <MainLanerCount
              lane="원딜"
              count={aiAnalysisResult.mainLanerCount.adc}
            />
            <MainLanerCount
              lane="서폿"
              count={aiAnalysisResult.mainLanerCount.support}
            />
          </StyledFlexBox>
        </Container>

        {aiAnalysisResult.summonerProfiles && (
          <Container flexDirection="column">
            <Heading level={2} margin="1rem 0">
              선픽 추천 챔피언
            </Heading>
            <Grid
              gridTemplateColumns="repeat(auto-fit, minmax(45px, 2rem))"
              gridTemplateRows="auto"
              width="20rem"
              justifyContent="center"
            >
              {aiAnalysisResult.summonerProfiles.map((summonerProfile) => (
                <>
                  {summonerProfile.preferredChamps.map((preferedChamp) => (
                    <StyledFlexBox
                      key={preferedChamp.champNameEng}
                      flexDirection="column"
                      justify="flex-start"
                    >
                      {summonerProfile.name}
                      <ImgChampion
                        image={{
                          name: preferedChamp.champNameKor,
                          src: getChampionImage(preferedChamp.champNameEng),
                        }}
                      />
                    </StyledFlexBox>
                  ))}
                </>
              ))}
            </Grid>
          </Container>
        )}
      </StyledFlexBox>

      <Container flexDirection="column" width="80%">
        <Heading level={2} margin="1rem 0">
          팀원 특성 분석
        </Heading>

        <Grid gridTemplateColumns="repeat(auto-fit, minmax(5rem, 1fr))">
          {aiAnalysisResult.summonerProfiles.map((summonerProfile) => (
            <Container
              key={summonerProfile.name}
              flexDirection="column"
              gap="1rem"
              width="100%"
            >
              <StyledFlexBox flexDirection="column">
                <Strong fontSize="1.5rem"> {summonerProfile.name} </Strong>
                <ImgWithLabel
                  image={{
                    name: capitalize(summonerProfile.rank),
                    src: useAppSelector(
                      findRankIcon(
                        RANKED_EMBLEMS[
                          summonerProfile.tier.toLowerCase() as RankedEmblemKeys
                        ]
                      )
                    ).src,
                  }}
                  isNameHidden
                />
                <StyledText fontSize="1rem">
                  {summonerProfile.leaguePoints} 점
                </StyledText>
              </StyledFlexBox>

              <Grid
                gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))"
                gridTemplateRows="auto"
                padding="0"
                width="100%"
              >
                {summonerProfile.icons.map((icon) => (
                  <StyledFlexBox flexDirection="column">
                    <img
                      src={summonerTraitIcons[icon.type]}
                      alt={icon.type}
                      width="20px"
                      css={{
                        backgroundColor: `var(--${
                          COLORS_BY_POINT[icon.point]
                        })`,
                        width: '2.5rem',
                        objectFit: 'cover',
                        clipPath: 'circle()',
                        padding: '1rem',
                      }}
                    />
                    {icon.type}
                  </StyledFlexBox>
                ))}
              </Grid>
            </Container>
          ))}
        </Grid>
      </Container>
    </Container>
  )
}
