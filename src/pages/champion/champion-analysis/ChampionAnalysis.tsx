import React, { useState, useRef } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import NavigationBar from '@/components-atoms/navigator/Navigator'
import Grid from '@/components-atoms/grid/Grid'
import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import Container from '@/components-atoms/container/Container'
import Heading from '@/components-atoms/heading/Heading'
import { Img } from '@/components-atoms/img/Img'
import {
  StyledSelectBar,
  StyledOption,
} from '@/components-atoms/select-bar/StyledSelectBar.style'
import SearchBar from '@/components-atoms/search-box/SearchBox'
import Button from '@/components-atoms/button/Button'
import Input from '@/components-atoms/input/Input'

import {
  importChampionThumbnails,
  addInfoToChampionImg,
} from '@/utils/file-utils'

import { Page } from '@/types/app-types'
import { ChampionImg } from '@/types/champion-types'

import { routes } from '@/constants/app-constants'
const championAnalysisRoutes = routes.champion.children!.analysis.children!
import { lanes } from '@/constants/champion-constants'

const pages: Page[] = [...Object.values(championAnalysisRoutes)]

const ChampionAnalysisChampionGrid = (props: {
  setSelectedChampion: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  // Champion list
  const championImgList = addInfoToChampionImg(importChampionThumbnails())
  const [championImgListToShow, setChampionImgListToShow] = React.useState<
    Array<ChampionImg>
  >([...championImgList])

  // Champion search
  const [searchText, setSearchText] = useState<string | null>(null)
  const handleChampionSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(e.currentTarget.value)
  }
  const handleChampionSearchInputKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === 'Enter') handleSearchChampion()
  }
  const handleSearchChampion = (
    e?: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (searchText) {
      setChampionImgListToShow(
        championImgList.filter(
          (champ) =>
            searchText &&
            champ.name &&
            champ.name.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    } else {
      setChampionImgListToShow(championImgList)
    }
  }

  // Champion filter
  const selectedLane = useRef<string | null>(null)
  const handleLaneClick =
    (laneName: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      selectedLane.current = laneName
      setChampionImgListToShow(
        championImgList.filter((champ) =>
          champ.laneName.toLowerCase().includes(laneName)
        )
      )
    }

  return (
    <StyledFlexBox flexDirection="column">
      <Heading level={1}>분석할 챔피언을 선택해주세요.</Heading>
      <SearchBar width="18rem" height="7rem">
        <Input
          label="챔피언 검색"
          onChange={handleChampionSearchInputChange}
          onKeyUp={handleChampionSearchInputKeyUp}
        />
        <Button width="5rem" height="3rem" onClick={handleSearchChampion}>
          검색
        </Button>
      </SearchBar>

      <Container>
        <StyledSelectBar width="64rem;" height="4rem" depth={0}>
          {Object.values(lanes).map((lane) => (
            <StyledOption
              value={lane.value}
              key={lane.name}
              active={selectedLane.current === lane.value}
              onClick={handleLaneClick(lane.value)}
            >
              {lane.name}
            </StyledOption>
          ))}
        </StyledSelectBar>
      </Container>

      <Container width="64rem">
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(1rem, 5rem))"
          justifyContent="center"
          width="100%"
          padding="2% 5% 5% 5%"
        >
          {championImgListToShow.map((image) => (
            <Img
              key={`${image.src}-${image.consonants}`}
              image={image}
              width="4rem"
              height="4rem"
              onClick={() => {
                props.setSelectedChampion(image.name)
              }}
            />
          ))}
        </Grid>
      </Container>
    </StyledFlexBox>
  )
}

type SelectedChampionSetter = React.Dispatch<
  React.SetStateAction<string | null>
>

export const useSelectedChampions = () => {
  return useOutletContext<{
    selectedChampion: string
    counterChampion: string
    setSelectedChampion: SelectedChampionSetter
    setCounterChampion: SelectedChampionSetter
  }>()
}

const ChampionAnalysis = () => {
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null)
  const [counterChampion, setCounterChampion] = useState<string | null>(null)

  return (
    <>
      {selectedChampion ? (
        <>
          <NavigationBar pages={pages} nested={true} depth={1} />
          <Outlet
            context={{
              selectedChampion,
              counterChampion,
              setSelectedChampion,
              setCounterChampion,
            }}
          />
        </>
      ) : (
        <ChampionAnalysisChampionGrid
          setSelectedChampion={setSelectedChampion}
        />
      )}
    </>
  )
}

export default ChampionAnalysis
