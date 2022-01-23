import React, { useEffect, useRef, useState } from 'react'

import { StyledText } from '@/components/text/Text'
import { CardStyle } from '@/components/card/StyledCard'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { Img } from '@/components/img/Img'

import SearchBar from '@/components/searchBox/SearchBox'
import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import Container from '@/components/container/Container'
import Grid from '@/components/grid/Grid'
import MatchTable from '@/components/matchTable/MatchTable'
import Loading from '@/components/loading/Loading'

import { getMatchList, getProSummoners } from '../../utils/endpoints'

import {
  Match,
  ParticipantWithIdentity,
  MatchList,
} from '../../types/match-types'

import { useChampionImages } from '@/hooks/use-champion-images'
import Heading from '@/components/heading/Heading'
import { StyledSvgBackButton } from '@/components/svg/StyledSvgBackButton.style'
import Strong from '@/components/strong/Strong'

type Summoner = {
  summonerId: string
  summonerName: string
  championId: string
  championNameKor: string
  championNameEng: string
  src: string
}

const Stats = () => {
  const [summonerList, setSummonerList] = React.useState<Array<Summoner>>([])

  const [getSummonerListTask, setGetSummonerListTask] =
    useState<Promise<void> | null>(null)

  const [getMatchListTask, setGetMatchListTask] =
    useState<Promise<void> | null>(null)

  const summonerListToPreserve = useRef<Summoner[]>()

  const { getChampionImage } = useChampionImages()

  useEffect(() => {
    const requestProSummoners = () => {
      return getProSummoners.send<Array<Summoner>>().then((res) => {
        setSummonerList(res.data)
        summonerListToPreserve.current = [...res.data]
      })
    }

    setGetSummonerListTask(requestProSummoners())
  }, [])

  const [isSummonerSelected, setIsSummonerSelected] =
    React.useState<boolean>(false)

  const [selectedSommoner, setSelectedSommoner] =
    React.useState<Summoner | null>(null)

  const [matchList, setMatchList] = React.useState<MatchList>([])

  const getSelectedParticipant = (
    participants: Array<ParticipantWithIdentity>,
    summonerName: string
  ) => {
    return participants.find(
      (participant) => participant.summonerName === summonerName
    )
  }

  const handleSummonerCardClick = (summoner: Summoner) => {
    const getMatchListTaskPromise = getMatchList
      .setParams({ summonerName: summoner.summonerName })
      .send<Match[]>()
      .then((response) => {
        const matchiListResponse = response.data.map((match) => {
          // Merge participant and participant identity.
          match.participants = match.participants.map((participant) => {
            const identityMatchesParticipant =
              match.participantIdentities?.find(
                (identity) =>
                  identity.participantId === participant.participantId
              )

            participant = {
              ...participant,
              ...identityMatchesParticipant,
            }

            return participant
          })

          // Set the selcted summoner to each matchs.
          const selectedSummonerInParticipants = getSelectedParticipant(
            match.participants,
            summoner.summonerName
          )

          if (selectedSummonerInParticipants)
            match.selectedParticipant = selectedSummonerInParticipants

          // Store a reference of participants to teams which they belong to.
          match.teams = match.teams.map((team) => {
            team.participants = match.participants.filter(
              (participant) => participant.teamId === team.teamId
            )
            return team
          })

          return match
        })

        setMatchList(matchiListResponse)
        setSelectedSommoner(summoner)
      })
      .catch((error) => {
        console.error('Could not fetch a match list from the server.')
      })

    setIsSummonerSelected(true)
    setGetMatchListTask(getMatchListTaskPromise)
  }

  const handleBackToSummonerListClick = () => {
    setIsSummonerSelected(false)
  }

  const [summonerNameToSearch, setSummonerNameToSearch] = useState<
    string | null
  >(null)

  const handleSummonerNameToSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!summonerListToPreserve.current) return

    setSummonerNameToSearch(event.target.value)

    if (event.target.value) {
      setSummonerList(
        summonerListToPreserve.current.filter((summoner) =>
          summoner.summonerName.includes(event.target.value)
        )
      )
    } else if (event.target.value === '') {
      setSummonerList([...summonerListToPreserve.current])
    }
  }

  const handleSearchClick = () => {
    if (!summonerListToPreserve.current) return

    if (summonerNameToSearch) {
      setSummonerList(
        summonerListToPreserve.current.filter((summoner) =>
          summoner.summonerName.includes(summonerNameToSearch)
        )
      )
    } else if (summonerNameToSearch === '') {
      setSummonerList([...summonerListToPreserve.current])
    }
  }

  return (
    <>
      {(!isSummonerSelected || !selectedSommoner) && (
        <SearchBar width="28rem" height="6rem">
          <Input
            label="소환사 검색"
            onInput={handleSummonerNameToSearchInput}
          />
          <Button width="5rem" height="3rem" onClick={handleSearchClick}>
            검색
          </Button>
        </SearchBar>
      )}

      <Container flexDirection="column">
        <Grid
          gridTemplateColumns={
            isSummonerSelected ? '1fr' : 'repeat(auto-fit, minmax(8rem, 18rem))'
          }
          justifyContent="center"
          width="100%"
          padding="1rem"
          isChildrenClickable
        >
          {isSummonerSelected ? (
            <Loading task={getMatchListTask}>
              {selectedSommoner && (
                <>
                  <StyledFlexBox flexDirection="row" justify="center">
                    <StyledSvgBackButton
                      position="absolute"
                      left="5rem"
                      height="50"
                      width="40"
                      isButton
                      onClick={handleBackToSummonerListClick}
                    >
                      <polygon
                        points="25,0 25,40 0,20"
                        style={{ fill: 'black' }}
                      />
                      Sorry, your browser does not support inline SVG.
                    </StyledSvgBackButton>
                    <Heading level={1} margin="0">
                      <Strong fontSize="3rem" color="blue">
                        {selectedSommoner.summonerName}
                      </Strong>
                      님의 최근 전적
                    </Heading>
                  </StyledFlexBox>

                  <MatchTable
                    matchList={matchList}
                    setMatchList={setMatchList}
                    summonerId={selectedSommoner.summonerId}
                  />
                </>
              )}
            </Loading>
          ) : (
            <Loading task={getSummonerListTask}>
              {summonerList.map((summoner: Summoner, idx) => (
                <CardStyle
                  key={summoner.summonerName + idx}
                  onClick={() => {
                    handleSummonerCardClick(summoner)
                  }}
                >
                  <StyledFlexBox flexDirection="column" gap="1rem">
                    <StyledText fontSize="1.5rem" fontWeight="bold">
                      {summoner.summonerName}
                    </StyledText>
                    <StyledText>{summoner.championNameKor}</StyledText>
                    <Img
                      width="5rem"
                      height="5rem"
                      borderRadius="100%"
                      border="1px solid var(--white)"
                      src={getChampionImage(summoner.championNameEng)}
                    />
                  </StyledFlexBox>
                </CardStyle>
              ))}
            </Loading>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Stats
