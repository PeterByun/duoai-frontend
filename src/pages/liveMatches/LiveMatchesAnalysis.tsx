import React, { useEffect, useRef, useState } from 'react'

import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { StyledText } from '@/components/text/Text'

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
  ParticipantIdentitiesEntity,
} from '../../types/match-types'

import { useChampionImages } from '@/hooks/use-champion-images'
import Heading from '@/components/heading/Heading'
import Strong from '@/components/strong/Strong'
import { CardLiveMatchSummoner } from '@/components/card/CardLiveMatchSummoner'
import { Img } from '@/components/img/Img'

import PrevButtonSrc from '@/assets/images/base/left-arrow.png'

type Summoner = {
  summonerId: string
  summonerName: string
  championId: string
  championNameKor: string
  championNameEng: string
  src: string
}

const Stats = () => {
  // Fetch a list of progamers
  const { getChampionImage } = useChampionImages()

  const [summonerList, setSummonerList] = React.useState<Array<Summoner>>([])
  const [getSummonerListTask, setGetSummonerListTask] =
    useState<Promise<void> | null>(null)

  const summonerListToPreserve = useRef<Summoner[]>()

  const [isSummonerSelected, setIsSummonerSelected] =
    React.useState<boolean>(false)
  const [selectedSommoner, setSelectedSommoner] =
    React.useState<Summoner | null>(null)

  useEffect(() => {
    const requestProSummoners = () => {
      return getProSummoners.send<Array<Summoner>>().then((res) => {
        setSummonerList(res.data)
        summonerListToPreserve.current = [...res.data]
      })
    }

    setGetSummonerListTask(requestProSummoners())
  }, [])

  // Filter progamers by name.
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

  // Fetch game records of the selected pro gamer.
  const [matchList, setMatchList] = React.useState<MatchList>([])
  const [getMatchListTask, setGetMatchListTask] =
    useState<Promise<void> | null>(null)

  const getSelectedParticipant = (
    participants: Array<ParticipantWithIdentity>,
    summonerName: string
  ) => {
    return participants.find(
      (participant) => participant.summonerName === summonerName
    )
  }

  const mergeParticipantWithIdentity = (
    participants: ParticipantWithIdentity[],
    participantIdentities?: ParticipantIdentitiesEntity[]
  ) => {
    return participants.map((participant) => {
      const identityMatchesParticipant = participantIdentities?.find(
        (identity) => identity.participantId === participant.participantId
      )

      participant = {
        ...participant,
        ...identityMatchesParticipant,
      }

      return participant
    })
  }

  const setSelectedSummonerToMatchIfExist = (
    match: Match,
    summonerName: string
  ) => {
    const selectedSummonerInParticipants = getSelectedParticipant(
      match.participants,
      summonerName
    )

    if (selectedSummonerInParticipants)
      match.selectedParticipant = selectedSummonerInParticipants
  }

  const mapParticipantsToMatchTeams = (match: Match) => {
    match.teams = match.teams.map((team) => {
      team.participants = match.participants.filter(
        (participant) => participant.teamId === team.teamId
      )
      return team
    })
  }

  const handleSummonerCardClick = (summoner: Summoner) => {
    const getMatchListTaskPromise = getMatchList
      .setParams({ summonerName: summoner.summonerName })
      .send<Match[]>()
      .then((response) => {
        const matchiListResponse = response.data.map((match) => {
          // Merge participant and participant identity.
          match.participants = mergeParticipantWithIdentity(
            match.participants,
            match.participantIdentities
          )

          setSelectedSummonerToMatchIfExist(match, summoner.summonerName)

          mapParticipantsToMatchTeams(match)

          return match
        })

        setMatchList(matchiListResponse)
        setSelectedSommoner(summoner)
      })
      .catch((error) => {
        console.error('Failed to fetch a match list from the server.', error)
      })

    setIsSummonerSelected(true)
    setGetMatchListTask(getMatchListTaskPromise)
  }

  const handleBackToSummonerListClick = () => {
    setIsSummonerSelected(false)
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

      <Container flexDirection="column" width="85%">
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
                    <Img
                      width="3rem"
                      left="5rem"
                      position="absolute"
                      src={PrevButtonSrc}
                      onClick={handleBackToSummonerListClick}
                    />

                    <Heading level={1} margin="0">
                      <Strong fontSize="3rem">
                        {selectedSommoner.summonerName}
                      </Strong>
                      <StyledText
                        color="dark-gray"
                        fontSize="1.5rem"
                        css={{
                          display: 'inline',
                        }}
                      >
                        님의 최근 전적
                      </StyledText>
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
                // summoners are not unique, so idx is used as a key.
                // We need to make summoners unique.
                <CardLiveMatchSummoner
                  key={summoner.summonerId + idx}
                  summonerName={summoner.summonerName}
                  championImg={getChampionImage(summoner.championNameEng)}
                  championNameKor={summoner.championNameKor}
                  onClick={() => {
                    handleSummonerCardClick(summoner)
                  }}
                />
              ))}
            </Loading>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Stats
