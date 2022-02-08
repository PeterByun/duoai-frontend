import Heading from '@/components/heading/Heading'
import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import Container from './container/Container'
import Grid from './grid/Grid'
import { ImgWithLabel } from '@/components/img/ImgWithLabel'
import ImgChampion from '@/components/img/ImgChampion'

import { useAppSelector } from '@/redux/hooks'
import { useChampionImages } from '@/hooks/use-champion-images'
import { findRankIcon } from '@/redux/slices/assetSlice'
import { capitalize, toPercentage } from '@/utils/string-utils'

type PreferedChamp = {
  champNameEng: string
  champNameKor: string
}

type SummonerProfile = {
  name: string
  rank: keyof typeof RANKED_EMBLEMS
  leaguePoints: number
  // lane: keyof typeof SUMMONER_LANES
  icons: string[]
  preferedChamps: PreferedChamp[]
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

const SUMMONER_LANES: {
  bot: 'Position_Challenger-Bot'
  mid: 'Position_Challenger-Mid'
  jungle: 'Position_Challenger-Jungle'
  support: 'Position_Challenger-Support'
  top: 'Position_Challenger-Top'
} = {
  bot: 'Position_Challenger-Bot',
  mid: 'Position_Challenger-Mid',
  jungle: 'Position_Challenger-Jungle',
  support: 'Position_Challenger-Support',
  top: 'Position_Challenger-Top',
}

const RANKED_EMBLEMS: {
  grandmaster: 'Emblem_Grandmaster'
  master: 'Emblem_Master'
  challenger: 'Emblem_Challenger'
  diamond: 'Emblem_Diamond'
  platinum: 'Emblem_Platinum'
  gold: 'Emblem_Gold'
  silver: 'Emblem_Silver'
  bronze: 'Emblem_Bronze'
  iron: 'Emblem_Iron'
} = {
  grandmaster: 'Emblem_Grandmaster',
  master: 'Emblem_Master',
  challenger: 'Emblem_Challenger',
  diamond: 'Emblem_Diamond',
  platinum: 'Emblem_Platinum',
  gold: 'Emblem_Gold',
  silver: 'Emblem_Silver',
  bronze: 'Emblem_Bronze',
  iron: 'Emblem_Iron',
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

export const MultiSearchAiAnalysisResult = ({
  aiAnalysisResult,
}: {
  aiAnalysisResult: AiAnalysisResult
}) => {
  const { getChampionImage } = useChampionImages()

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
          <StyledFlexBox>
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
                  {summonerProfile.preferedChamps.map((preferedChamp) => (
                    <StyledFlexBox flexDirection="column" justify="flex-start">
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

      <Container flexDirection="column">
        <Heading level={2} margin="1rem 0">
          팀원 특성 분석
        </Heading>

        <StyledFlexBox flexDirection="column">
          {aiAnalysisResult.summonerProfiles.map((summonerProfile) => (
            <Container flexDirection="row" gap="1rem" width="100%">
              <Heading level={2}> {summonerProfile.name} </Heading>
              <ImgWithLabel
                image={{
                  name: capitalize(summonerProfile.rank),
                  src: useAppSelector(
                    findRankIcon(RANKED_EMBLEMS[summonerProfile.rank])
                  ).src,
                }}
              />
              <StyledText fontSize="1.5rem">
                {summonerProfile.leaguePoints} 점
              </StyledText>

              <ul
                css={{
                  padding: 0,
                }}
              >
                {summonerProfile.icons.map((icon) => (
                  <li
                    css={{
                      listStyle: 'none',
                      borderRadius: '1rem',
                      background: 'skyblue',
                      color: 'white',
                      padding: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {icon}
                  </li>
                ))}
              </ul>
            </Container>
          ))}
        </StyledFlexBox>
      </Container>
    </Container>
  )
}
