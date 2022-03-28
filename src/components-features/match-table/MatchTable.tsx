import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
  DroppableProvided,
} from 'react-beautiful-dnd'

import ChampionSpells from '@/components-commons/champion-spells/ChampionSpells'
import ChampionKda from '@/components-commons/champion-kda/ChampionKda'
import ChampionItems from '@/components-commons/champion-items/ChampionItems'

import {
  MatchSummary,
  MatchSummaryWrapper,
} from '@/components-features/match-table/StyledMatchSummary.style'
import Button from '@/components-atoms/button/Button'
import Heading from '@/components-atoms/heading/Heading'
import Alert, { AlertData } from '@/components-atoms/alert/Alert'
import { Img } from '@/components-atoms/img/Img'

import { Text } from '@/components-atoms/text/Text'
import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
// We need cloned MatchParticipantElement to implement drag and drop.
import {
  getMatchParticipantClone,
  MatchParticipant,
} from '@/components-features/match-participant/MatchParticipant'

import { analyzeSwappedMatch } from '@/apis/duoai/duoai'
import { useChampionImages } from '@/hooks/use-champion-images'
import { toPercentage, getHowOldFromNow } from '@/utils/string-utils'
import {
  extractItemsFromParticipant,
  extractSpellsAndStatsFromParticipant,
} from '@/utils/match-utils'

import {
  Match,
  MatchList,
  ParticipantsEntity,
  ParticipantWithIdentity,
  TeamsEntity,
} from '@/apis/duoai/types/match'

type MatchTableProps = {
  matchList: MatchList
  summonerId: string
  setMatchList: React.Dispatch<React.SetStateAction<MatchList>>
}

const MatchTable = ({ matchList, setMatchList }: MatchTableProps) => {
  const [alertData, setAlertData] = useState<AlertData>({
    isAlertOpen: false,
  })

  const showAlert = (
    alertData: Pick<AlertData, Exclude<keyof AlertData, 'isAlertOpen'>>
  ) => {
    setAlertData({
      title: alertData.title,
      message: alertData.message,
      isAlertOpen: true,
    })
  }

  const { getChampionImage } = useChampionImages()

  // Store information about which row is expanded or not.
  const [matchListExpendedMap, setMatchListExpendedMap] = React.useState<
    Map<number, boolean>
  >(new Map(matchList.map((match) => [match.gameId, false])))

  const handleExpandClick = (gameId: number) => {
    setMatchListExpendedMap((oldMap) => {
      return new Map(oldMap).set(gameId, !matchListExpendedMap.get(gameId))
    })
  }

  const getMatchIdxByGameId = (gameId: number) =>
    matchList.findIndex((match) => match.gameId === gameId)

  // Functions to implement drag and drop.
  // Swap two element's position using splice.
  const reorderList = (
    list: ParticipantWithIdentity[],
    startIndex: number,
    endIndex: number
  ) => {
    const reorderedList = [...list]
    const [removedItem] = reorderedList.splice(startIndex, 1)
    reorderedList.splice(endIndex, 0, removedItem)

    return reorderedList
  }

  const moveItemToDestinatinon = (
    source: ParticipantWithIdentity[],
    destination: ParticipantWithIdentity[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = [...source]
    const destinationClone = [...destination]

    const [removedItem] = sourceClone.splice(droppableSource.index, 1)

    destinationClone.splice(droppableDestination.index, 0, removedItem)

    return {
      sourceParticipantsResult: sourceClone,
      destinationParticipantsResult: destinationClone,
    }
  }

  const splitIntoNumbers = (text: string) => {
    return text.split(',').map((id) => Number(id))
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    // Get game ID and team ID of a participant out of droppable ID(string)
    const [sourceGameId, sourceTeamId] = splitIntoNumbers(source.droppableId)
    const destinationTeamId = splitIntoNumbers(destination.droppableId)[1]

    const matchIdx = getMatchIdxByGameId(sourceGameId)

    if (typeof matchIdx !== 'number') return

    const clonedMatchList = Array.from(matchList)

    const sourceTeam = clonedMatchList[matchIdx].teams.find(
      (team) => team.teamId === sourceTeamId
    )
    const destinationTeam = clonedMatchList[matchIdx].teams.find(
      (team) => team.teamId === destinationTeamId
    )

    if (source.droppableId === destination.droppableId) {
      // Dropping the draggable at the same position
      if (sourceTeam?.participants) {
        sourceTeam.participants = reorderList(
          sourceTeam.participants,
          source.index,
          destination.index
        )
        setMatchList(clonedMatchList)
      }
    } else {
      // Swapping two dragabbles.
      if (sourceTeam?.participants && destinationTeam?.participants) {
        const { sourceParticipantsResult, destinationParticipantsResult } =
          moveItemToDestinatinon(
            sourceTeam.participants,
            destinationTeam.participants,
            source,
            destination
          )

        sourceTeam.participants = sourceParticipantsResult
        destinationTeam.participants = destinationParticipantsResult

        setMatchList(clonedMatchList)
      }
    }
  }

  const filterParticipantIdsByTeam = (
    participants: Array<ParticipantsEntity>
  ) => {
    const redTeamInfo: number[] = []
    const blueTeamInfo: number[] = []

    for (const participant of participants) {
      if (participant.teamId === 0) {
        redTeamInfo.push(participant.participantId)
      } else {
        blueTeamInfo.push(participant.participantId)
      }
    }

    return {
      redTeamInfo,
      blueTeamInfo,
    }
  }

  const handleAnalyzeSwappedMatchClick = (match: Match) => {
    const { redTeamInfo, blueTeamInfo } = filterParticipantIdsByTeam(
      match.participants
    )

    analyzeSwappedMatch
      .setData({
        gameId: match.gameId,
        blueTeamIds: blueTeamInfo,
        redTeamIds: redTeamInfo,
      })
      .send<number[]>()
      .then((analysisResponse) => {
        const [blueWinRatio, redWinRatio] = analysisResponse.data

        showAlert({
          title: '예상 승률',
          message: `블루팀 승률: ${toPercentage(
            blueWinRatio
          )} 레드팀 승률: ${toPercentage(redWinRatio)}`,
        })
      })
      .catch((error) => {
        console.error('Faild to analyze match.', error)
      })

    return (event: React.MouseEvent<HTMLButtonElement>) => {
      return
    }
  }

  const gameTypes: { [key: string]: string } = {
    MATCHED_GAME: '솔랭',
  }

  const gameModes: { [key: string]: string } = {
    CLASSIC: '소환사의 협곡',
  }

  const getHowLongLasted = (gameDuration: number) => {
    let howLongLasted = ''

    if (gameDuration / 3600 > 1) {
      // The game lasted over an hour.
      howLongLasted += `${Math.floor(gameDuration / 3600)} 시간`
      gameDuration = gameDuration % 3600
    }

    if (gameDuration / 60 > 0) {
      howLongLasted += `${Math.floor(gameDuration / 60)} 분`
      gameDuration = gameDuration % 60

      if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
    } else {
      if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
    }

    return howLongLasted
  }

  const MatchSelectedChampions = (props: {
    teamColor: 'blue' | 'red'
    teams: TeamsEntity[]
  }) => {
    let teamId = 0
    let teamName = '블루팀'

    if (props.teamColor === 'red') {
      teamName = '레드팀'
      teamId = 1
    }

    return (
      <FlexBox
        flexDirection="column"
        align="flex-start"
        padding="0.5rem"
        gap="0.3rem"
        css={{
          border: `0.5rem solid var(--team-light-${props.teamColor})`,
          borderRadius: '5px',
        }}
      >
        <Heading fontWeight="bold" level={3} margin="0">
          {teamName} 소환사
        </Heading>
        {props.teams
          .find((team) => team.teamId === teamId)
          ?.participants?.map((participant) => (
            <FlexBox
              key={participant.accountId}
              css={{
                whiteSpace: 'nowrap',
              }}
            >
              <Img
                width="1.5rem"
                height="1.5rem"
                image={{
                  src: getChampionImage(participant.championNameEng),
                }}
              />
              {participant.summonerName}
            </FlexBox>
          ))}
      </FlexBox>
    )
  }

  const MatchSwapParticipantList = (props: {
    teamColor: 'blue' | 'red'
    teams: TeamsEntity[]
    provided: DroppableProvided
  }) => {
    let teamId = 0
    let teamName = '블루팀'

    if (props.teamColor === 'red') {
      teamName = '레드팀'
      teamId = 1
    }

    return (
      <FlexBox
        ref={props.provided.innerRef}
        flexDirection="column"
        justify="start"
        gap="1rem"
        padding="1rem"
        css={{
          border: `1rem solid var(--team-light-${props.teamColor})`,
          borderRadius: '1rem',
        }}
      >
        <Heading fontWeight="bold" level={3} margin="1rem 0 0 0">
          {teamName} 소환사
        </Heading>
        {props.teams
          .find((team) => team.teamId === teamId)
          ?.participants?.map((participant, index) => (
            <Draggable
              key={participant.summonerId}
              draggableId={participant.summonerId}
              index={index}
            >
              {(provided, snapshot) =>
                MatchParticipant(participant, provided, snapshot)
              }
            </Draggable>
          ))}
        {props.provided.placeholder}
      </FlexBox>
    )
  }

  return (
    <>
      <Alert
        alertData={alertData}
        setIsAlertOpen={(isOpen: boolean) => {
          setAlertData.call(null, { isAlertOpen: isOpen })
        }}
      />
      {matchList &&
        matchList.map((match) => (
          <MatchSummaryWrapper
            key={match.gameId}
            css={{
              flexDirection: 'column',
            }}
          >
            <MatchSummary
              win={match.selectedParticipant?.win}
              css={{
                gap: '1rem',
              }}
            >
              <FlexBox flexDirection="column">
                <Text fontSize="1rem" fontWeight="bold" whiteSpace="nowrap">
                  {`${gameTypes[match.gameType]}, ${gameModes[match.gameMode]}`}
                  <br />
                  {match.selectedParticipant?.win ? '승리' : '패배'}
                </Text>

                <Text fontSize="1rem" whiteSpace="nowrap">
                  {getHowOldFromNow(match.gameCreation)}
                  <br />
                  {getHowLongLasted(match.gameDuration)}
                </Text>
              </FlexBox>

              <Img
                isNameHidden
                width="100px"
                height="100px"
                circle
                image={{
                  name: match.selectedParticipant?.championNameKor,
                  src: getChampionImage(
                    match.selectedParticipant?.championNameEng
                  ),
                }}
              />
              <ChampionSpells
                spells={extractSpellsAndStatsFromParticipant(
                  match.selectedParticipant
                )}
              />

              <FlexBox flexDirection="column">
                <ChampionKda
                  kills={match.selectedParticipant?.kills}
                  deaths={match.selectedParticipant?.deaths}
                  assists={match.selectedParticipant?.assists}
                />

                <FlexBox flexDirection="row">
                  <Text fontSize="1rem" fontWeight="bold">
                    {`CS: ${match.selectedParticipant?.totalMinionsKilled} 레벨: ${match.selectedParticipant?.champLevel}`}
                  </Text>
                </FlexBox>
              </FlexBox>

              <ChampionItems
                items={extractItemsFromParticipant(match.selectedParticipant)}
              />

              <MatchSelectedChampions teams={match.teams} teamColor="blue" />
              <MatchSelectedChampions teams={match.teams} teamColor="red" />
            </MatchSummary>

            <Button
              color="dark-blue"
              width="100%"
              height="2rem"
              margin="0.5rem 0"
              onClick={() => {
                handleExpandClick(match.gameId)
              }}
            >
              {matchListExpendedMap.get(match.gameId) ? '숨기기' : '더보기'}
            </Button>

            {matchListExpendedMap.get(match.gameId) ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <FlexBox flexDirection="row" align="flex-start">
                  <Droppable
                    droppableId={match.gameId + ',0'}
                    renderClone={getMatchParticipantClone(
                      match.teams.find((team) => team.teamId === 0)
                        ?.participants
                    )}
                  >
                    {(provided, snapshot) => (
                      <MatchSwapParticipantList
                        teamColor="blue"
                        teams={match.teams}
                        provided={provided}
                      />
                    )}
                  </Droppable>

                  <Button
                    fontSize="1.5rem"
                    color="blue"
                    width="5rem"
                    height="5rem"
                    margin="auto 1rem auto 1rem"
                    borderRadius="50%"
                    onClick={() => {
                      handleAnalyzeSwappedMatchClick(match)
                    }}
                  >
                    분석
                  </Button>

                  <Droppable
                    droppableId={match.gameId + ',1'}
                    renderClone={getMatchParticipantClone(
                      match.teams.find((team) => team.teamId === 1)
                        ?.participants
                    )}
                  >
                    {(provided) => (
                      <MatchSwapParticipantList
                        teamColor="red"
                        teams={match.teams}
                        provided={provided}
                      />
                    )}
                  </Droppable>
                </FlexBox>
              </DragDropContext>
            ) : null}
          </MatchSummaryWrapper>
        ))}
    </>
  )
}

export default MatchTable
