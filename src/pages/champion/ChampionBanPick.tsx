import React, { useRef, useEffect, ChangeEvent } from 'react'

import { StyledText } from '@/components/text/Text'

import Strong from '@/components/strong/Strong'
import Container from '@/components/container/Container'
import SearchBar from '@/components/searchBox/SearchBox'
import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import Grid from '@/components/grid/Grid'
import Canvas from '@/components/canvas/Canvas'
import ImgChampion from '@/components/imgChampion/ImgChampion'
import SelectedChampion from '@/components/selectedChampion/SelectedChampion'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'

import { analyzeBanPick } from '../../utils/endpoints'
import { capitalize, toPercentage } from '../../utils/string-utils'
import {
  importChampionThumbnails,
  addInfoToChampionImg,
} from '../../utils/file-utils'

import { colors } from '../../constants/app-constants'
import { teamTypes } from '../../constants/match-constants'

import { ChampionImg } from '../../types/champion-types'

type TeamAnaylysis = {
  champions: Array<ChampionImg>
  winRatio: number
}

type TeamComparisonList = Array<{
  blue: TeamAnaylysis
  red: TeamAnaylysis
}>

const Champs = () => {
  const championImgList = addInfoToChampionImg(importChampionThumbnails())

  const isChampSelected = (image: ChampionImg): boolean => {
    const findSelectedChamp = (champ: ChampionImg) => champ.name === image.name

    const champFound =
      blueTeamChampions.find(findSelectedChamp) ||
      redTeamChampions.find(findSelectedChamp)
    return Boolean(champFound)
  }

  const isAllChampsSelected = (): boolean => {
    return blueTeamChampions.length + redTeamChampions.length > 9
  }

  const getUnselectedTeam = (selTeam: string): string => {
    return selTeam === teamTypes.blue ? teamTypes.red : teamTypes.blue
  }

  const toggleSelectedTeam = () => {
    setSelectedTeam(getUnselectedTeam(selectedTeam))
  }

  const drawWinRatioCircle = (winRatio: number, teamColor: string) => {
    return (ctx: CanvasRenderingContext2D, frameCount: number): boolean => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      ctx.lineWidth = 23
      ctx.strokeStyle = '#e6e6e6'

      ctx.beginPath()
      ctx.arc(100, 100, 65, 0, 2 * Math.PI)
      ctx.stroke()

      const startAngle = Math.PI * 1.5

      ctx.beginPath()
      ctx.lineWidth = 15
      ctx.strokeStyle = colors[teamColor]
      const endAngle =
        startAngle + Math.PI * 2 * winRatio * (frameCount * 0.025)
      ctx.arc(100, 100, 65, startAngle, endAngle)
      ctx.stroke()

      if (endAngle >= startAngle + Math.PI * 2 * winRatio) return false

      return true
    }
  }

  const [selectedTeam, setSelectedTeam] = React.useState<string>(teamTypes.blue)

  const [blueTeamChampions, setBlueTeamChampions] = React.useState<
    Array<ChampionImg>
  >([])

  const [redTeamChampions, setRedTeamChampions] = React.useState<
    Array<ChampionImg>
  >([])

  const [teamComparisonList, setTeamComparisonList] =
    React.useState<TeamComparisonList>([])

  const [championImgListToShow, setChampionImgListToShow] = React.useState<
    Array<ChampionImg>
  >([...championImgList])

  const resultContainerRef = useRef<HTMLHeadingElement>(null)

  // Switch selected team to another team when current selected team is full.
  useEffect(() => {
    const selectedTeamChamps =
      selectedTeam === teamTypes.blue ? blueTeamChampions : redTeamChampions
    if (selectedTeamChamps.length > 4 && !isAllChampsSelected())
      toggleSelectedTeam()
  }, [blueTeamChampions, redTeamChampions])

  // Scroll to the result section after the result is rendered.
  let resultContainerPosition: any
  useEffect(() => {
    if (resultContainerRef?.current)
      resultContainerPosition =
        document.documentElement.scrollTop +
        resultContainerRef.current.getBoundingClientRect().top
    window.scrollTo({
      top: resultContainerPosition,
      left: 0,
      behavior: 'auto',
    })
  }, [teamComparisonList])

  const onChampionClick = (image: ChampionImg) => {
    if (selectedTeam === teamTypes.blue) {
      if (blueTeamChampions.length > 4 || isChampSelected(image)) return
      setBlueTeamChampions([...blueTeamChampions, image])
    } else {
      if (redTeamChampions.length > 4 || isChampSelected(image)) return
      setRedTeamChampions([...redTeamChampions, image])
    }
  }

  const onSelectedChampionClick = (
    selectedImage: ChampionImg,
    teamColor: string
  ) => {
    return (e: React.MouseEvent<HTMLImageElement>) => {
      if (teamColor === teamTypes.blue) {
        setBlueTeamChampions(
          blueTeamChampions.filter((image) => image !== selectedImage)
        )
      } else {
        setRedTeamChampions(
          redTeamChampions.filter((image) => image !== selectedImage)
        )
      }
    }
  }

  const onSwitchTeamClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleSelectedTeam()
  }

  const onAnalyze = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAllChampsSelected()) {
      alert('챔피언을 모두 선택해주세요.')
      return
    }

    analyzeBanPick
      .setData({
        blueTeamChampionId: blueTeamChampions.map((champion) => champion.key),
        redTeamChampionId: redTeamChampions.map((champion) => champion.key),
      })
      .send<number[]>()
      .then((response) => {
        const [redTeamWinRatio, blueTeamWinRatio] = response.data

        const teamComparison = {
          red: {
            champions: [...redTeamChampions],
            winRatio: Number(redTeamWinRatio.toFixed(2)),
          },
          blue: {
            champions: [...blueTeamChampions],
            winRatio: Number(blueTeamWinRatio.toFixed(2)),
          },
        }

        if (teamComparison) {
          setTeamComparisonList([...teamComparisonList, teamComparison])
          setRedTeamChampions([])
          setBlueTeamChampions([])
        }
      })
  }

  const onSearchChampion = (event: ChangeEvent<HTMLInputElement>) => {
    setChampionImgListToShow(
      championImgList.filter((champ) => {
        return (
          champ.consonants?.startsWith(event.target.value) ||
          champ.name?.startsWith(event.target.value)
        )
      })
    )
  }

  return (
    <>
      <Container flexDirection="column">
        <Container
          flexDirection="column"
          width="90%"
          padding="1rem"
          opacity="0.5"
          zIndex="2"
          sticky
        >
          <StyledFlexBox
            flexDirection="row"
            width="90%"
            padding="1rem"
            margin="1rem"
          >
            <Strong
              color="white"
              backgroundColor={`team-${selectedTeam}`}
              fontSize="3.5rem"
              fontWeight="bold"
              textAlign="left"
            >
              {capitalize(selectedTeam)}팀
            </Strong>

            <StyledText fontSize="3.5rem" fontWeight="bold" textAlign="left">
              &nbsp; 챔피언을 선택해주세요.
            </StyledText>

            <StyledFlexBox
              flexDirection="column"
              justify="space-evenly"
              width="30%"
              height="10rem"
              padding="0"
              margin="0"
            >
              <Button
                width="160px"
                height="60px"
                fontSize="1.5rem"
                onClick={onSwitchTeamClick}
              >
                팀 변경
              </Button>
              <Button
                width="160px"
                height="60px"
                fontSize="1.5rem"
                backgroundColor="blue"
                onClick={onAnalyze}
              >
                분석하기
              </Button>
            </StyledFlexBox>
          </StyledFlexBox>

          <StyledFlexBox
            flexDirection="row"
            justify="space-between"
            width="90%"
            padding="1rem"
            margin="1rem"
          >
            {blueTeamChampions?.length > 0 ? (
              <Grid
                gridTemplateColumns="repeat(5, 1fr)"
                backgroundColor="team-light-blue"
                padding="1rem"
                borderRadius="5px"
                isChildrenClickable
                emphasized={
                  selectedTeam === teamTypes.blue && !isAllChampsSelected()
                }
              >
                {blueTeamChampions.map((image) => (
                  <ImgChampion
                    key={image.name}
                    image={image}
                    onClick={onSelectedChampionClick(image, 'blue')}
                  />
                ))}
              </Grid>
            ) : null}

            {redTeamChampions?.length > 0 ? (
              <Grid
                isChildrenClickable
                gridTemplateColumns="repeat(5, 1fr)"
                padding="1rem"
                backgroundColor="team-light-red"
                borderRadius="5px"
                emphasized={
                  selectedTeam === teamTypes.red && !isAllChampsSelected()
                }
              >
                {redTeamChampions.map((image) => (
                  <ImgChampion
                    key={image.name}
                    image={image}
                    onClick={onSelectedChampionClick(image, 'red')}
                  />
                ))}
              </Grid>
            ) : null}
          </StyledFlexBox>

          <SearchBar width="800px" height="100px" zIndex="1" margin="2% 0 0 0 ">
            <Input
              onInput={onSearchChampion}
              label="챔피언 이름을 입력해주세요"
            />
          </SearchBar>
        </Container>

        <Grid padding="2% 5% 5% 5%">
          {championImgListToShow.map((image) => (
            <ImgChampion
              key={image.name}
              image={image}
              width="4rem"
              height="4rem"
              disabled={isChampSelected(image)}
              onClick={() => {
                onChampionClick(image)
              }}
            />
          ))}
        </Grid>
      </Container>

      {teamComparisonList.length > 0 ? (
        <Container flexDirection="column">
          <StyledText
            fontSize="3.5rem"
            fontWeight="bold"
            textAlign="left"
            ref={resultContainerRef}
          >
            분석결과
          </StyledText>

          {teamComparisonList.map((teamComparison, idx) => (
            <Container
              key={idx + teamComparison.blue.winRatio}
              flexDirection="column"
              padding="1rem"
            >
              <StyledFlexBox
                flexDirection="row"
                padding="1rem"
                justify="space-between"
                width="95%"
              >
                {teamComparison.blue.champions.length > 0 ? (
                  <Grid
                    gridTemplateColumns="repeat(5, 1fr)"
                    padding="1rem"
                    backgroundColor="team-blue"
                    color="white"
                    borderRadius="5px"
                  >
                    {teamComparison.blue.champions.map((champion) => (
                      <SelectedChampion
                        color="white"
                        key={champion.name}
                        champion={champion}
                      />
                    ))}
                  </Grid>
                ) : null}
                {teamComparison.red.champions.length > 0 ? (
                  <Grid
                    gridTemplateColumns="repeat(5, 1fr)"
                    padding="1rem"
                    backgroundColor="team-red"
                    color="white"
                    borderRadius="5px"
                  >
                    {teamComparison.red.champions.map((champion) => (
                      <SelectedChampion
                        color="white"
                        key={champion.name}
                        champion={champion}
                      />
                    ))}
                  </Grid>
                ) : null}
              </StyledFlexBox>

              <StyledFlexBox
                flexDirection="row"
                justify="space-between"
                width="95%"
                margin="0"
                padding="1rem"
              >
                <StyledFlexBox flexDirection="column" padding="1rem">
                  <StyledText fontSize="2.5rem" textAlign="left">
                    <Strong fontSize="2.5rem" color="team-blue">
                      블루팀
                    </Strong>
                    &nbsp;예상승률
                  </StyledText>
                  <StyledFlexBox
                    flexDirection="row"
                    align="center"
                    justify="center"
                  >
                    <StyledText fontSize="2.5rem" position="absolute">
                      <StyledText
                        fontSize="3rem"
                        fontWeight="bold"
                        color="team-blue"
                      >
                        {toPercentage(teamComparison.blue.winRatio)}
                      </StyledText>
                    </StyledText>
                    <Canvas
                      draw={drawWinRatioCircle(
                        teamComparison.blue.winRatio,
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
                  <StyledFlexBox
                    flexDirection="row"
                    align="center"
                    justify="center"
                  >
                    <StyledText fontSize="2.5rem" position="absolute">
                      <StyledText
                        fontSize="3rem"
                        fontWeight="bold"
                        color="team-red"
                      >
                        {toPercentage(teamComparison.red.winRatio)}
                      </StyledText>
                    </StyledText>
                    <Canvas
                      draw={drawWinRatioCircle(
                        teamComparison.red.winRatio,
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
            </Container>
          ))}
        </Container>
      ) : null}
    </>
  )
}

export default Champs
