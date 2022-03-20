import React, { useRef, useEffect, ChangeEvent } from 'react'

import Container from '@/components-atoms/container/Container'
import SearchBar from '@/components-atoms/search-box/SearchBox'
import Input from '@/components-atoms/input/Input'
import Grid from '@/components-atoms/grid/Grid'
import { GridSelectedChampions } from '@/components-atoms/grid/GridSelectedChampions'
import { Img } from '@/components-atoms/img/Img'
import { ChampionBanPickHeader } from '@/components-features/champion-ban-pick/ChampionBanPickHeader'
import { ChampionBanPickResultHeader } from '@/components-features/champion-ban-pick/ChampionBanPickResultHeader'
import { ChampionBanPickResult } from '@/components-features/champion-ban-pick/ChampionBanPickResult'

import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Text } from '@/components-atoms/text/Text'

import { analyzeBanPick } from '@/apis/duoai/duoai'

import {
  importChampionThumbnails,
  addInfoToChampionImg,
} from '@/utils/file-utils'

import { teamTypes } from '@/constants/match-constants'

import { ChampionImg } from '@/types/champion-types'

type TeamAnaylysis = {
  champions: Array<ChampionImg>
  winRatio: number
}

export type TeamComparison = {
  blue: TeamAnaylysis
  red: TeamAnaylysis
}

type TeamComparisonList = Array<TeamComparison>

const Champs = () => {
  // Lists of champions by team.
  const [blueTeamChampions, setBlueTeamChampions] = React.useState<
    Array<ChampionImg>
  >([])

  const [redTeamChampions, setRedTeamChampions] = React.useState<
    Array<ChampionImg>
  >([])

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

  const handleChampionClick = (image: ChampionImg) => {
    if (selectedTeam === teamTypes.blue) {
      if (blueTeamChampions.length > 4 || isChampSelected(image)) return
      setBlueTeamChampions([...blueTeamChampions, image])
    } else {
      if (redTeamChampions.length > 4 || isChampSelected(image)) return
      setRedTeamChampions([...redTeamChampions, image])
    }
  }

  // Selected Team
  const [selectedTeam, setSelectedTeam] = React.useState<string>(teamTypes.blue)

  const getUnselectedTeam = (selTeam: string): string => {
    return selTeam === teamTypes.blue ? teamTypes.red : teamTypes.blue
  }

  const championImgList = addInfoToChampionImg(importChampionThumbnails())

  const [championImgListToShow, setChampionImgListToShow] = React.useState<
    Array<ChampionImg>
  >([...championImgList])

  const [teamComparisonList, setTeamComparisonList] =
    React.useState<TeamComparisonList>([])

  const toggleSelectedTeam = () => {
    setSelectedTeam(getUnselectedTeam(selectedTeam))
  }

  const handleSwitchTeamClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleSelectedTeam()
  }

  const handleSelectedChampionClick = (
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

  // Switch selected team to another team when currently selected team is full.
  useEffect(() => {
    const selectedTeamChamps =
      selectedTeam === teamTypes.blue ? blueTeamChampions : redTeamChampions
    if (selectedTeamChamps.length > 4 && !isAllChampsSelected())
      toggleSelectedTeam()
  }, [blueTeamChampions, redTeamChampions])

  // Scroll to the result section after the result is loaded.
  const resultContainerRef = useRef<HTMLHeadingElement>(null)
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

  const handleAnalyze = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleSearchChampion = (event: ChangeEvent<HTMLInputElement>) => {
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
      <Container flexDirection="column" width="80%">
        <Container
          flexDirection="column"
          width="100%"
          padding="1rem"
          opacity="0.5"
          zIndex="1"
          sticky
          margin="0"
        >
          <ChampionBanPickHeader
            selectedChampions={{
              blueTeamChampions,
              redTeamChampions,
            }}
            selectedTeamColor={selectedTeam}
            onSwitchTeamClick={handleSwitchTeamClick}
            onAnalyze={handleAnalyze}
          />

          <FlexBox
            flexDirection="row"
            justify="space-between"
            width="100%"
            padding="1rem"
            margin="1rem"
            gap="1rem"
            flowColumnOnMdScreen
          >
            {blueTeamChampions?.length > 0 ? (
              <GridSelectedChampions
                teamColor="blue"
                emphasized={
                  selectedTeam === teamTypes.blue && !isAllChampsSelected()
                }
              >
                {blueTeamChampions.map((image) => (
                  <Img
                    key={image.name}
                    image={image}
                    onClick={handleSelectedChampionClick(image, 'blue')}
                    isNameHidden
                  />
                ))}
              </GridSelectedChampions>
            ) : null}

            {redTeamChampions?.length > 0 ? (
              <GridSelectedChampions
                teamColor="red"
                emphasized={
                  selectedTeam === teamTypes.red && !isAllChampsSelected()
                }
              >
                {redTeamChampions.map((image) => (
                  <Img
                    key={image.name}
                    image={image}
                    onClick={handleSelectedChampionClick(image, 'red')}
                    isNameHidden
                  />
                ))}
              </GridSelectedChampions>
            ) : null}
          </FlexBox>

          <SearchBar
            width="min(40%, 28rem)"
            height="6rem"
            zIndex="1"
            margin="2% 0 0 0 "
          >
            <Input
              onInput={handleSearchChampion}
              label="챔피언 이름을 입력해주세요"
            />
          </SearchBar>
        </Container>

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(1rem, 5rem))"
          justifyContent="center"
          width="100%"
          padding="2% 5% 5% 5%"
        >
          {championImgListToShow.map((image) => (
            <Img
              key={image.name}
              image={image}
              width="4rem"
              height="4rem"
              disabled={isChampSelected(image)}
              isNameHidden
              onClick={() => {
                handleChampionClick(image)
              }}
            />
          ))}
        </Grid>
      </Container>

      {teamComparisonList.length > 0 ? (
        <Container flexDirection="column">
          <Text
            fontSize="3.5rem"
            fontWeight="bold"
            textAlign="left"
            ref={resultContainerRef}
          >
            분석결과
          </Text>

          {teamComparisonList.map((teamComparison) => (
            <Container
              key={teamComparison.blue.winRatio}
              flexDirection="column"
              padding="1rem"
            >
              <ChampionBanPickResultHeader teamComparison={teamComparison} />
              <ChampionBanPickResult teamComparison={teamComparison} />
            </Container>
          ))}
        </Container>
      ) : null}
    </>
  )
}

export default Champs
