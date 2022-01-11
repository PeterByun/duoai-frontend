import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd'

import ChampionSpells from '@/components/championSpells/ChampionSpells'
import ChampionKda from '@/components/championKda/ChampionItems'
import ChampionItems from '@/components/championItems'
import ImgChampion from '@/components/imgChampion/ImgChampion'
import {
  MatchSummaryStyle,
  MatchSummaryWrapperStyle,
} from '@/components/matchTable/StyledMatchSummary.style'
import Button from '@/components/button/Button'
import Heading from '@/components/heading/Heading'
import Alert, { AlertData } from '../alert/Alert'

import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { ImgStyle } from '@/components/img/StyledImg.style'
// We need cloned matchParticipantElement to implement drag and drop.
import {
  getMatchParticipantClone,
  MatchParticipant,
} from '@/components/matchParticipant/MatchParticipant'

import {
  Match,
  MatchList,
  ParticipantsEntity,
  ParticipantWithIdentity,
} from '@/types/match-types'

import { analyzeSwappedMatch } from '@/utils/endpoints'
import { useChampionImages } from '@/hooks/use-champion-images'
import { toPercentage, getHowOldFromNow } from '@/utils/string-utils'

type MatchTableProps = {
  matchList: MatchList
  summonerId: string
  setMatchList: React.Dispatch<React.SetStateAction<MatchList>>
}

const MatchTable = ({
  matchList,
  setMatchList,
  summonerId,
}: MatchTableProps) => {
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

  // Store information about which row is expanded or not. Initially all rows are closed.
  const [matchListExpendedMap, setMatchListExpendedMap] = React.useState<
    Map<number, boolean>
  >(new Map(matchList.map((match) => [match.gameId, false])))

  const onExpandClick = (gameId: number) => {
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
      if (sourceTeam?.participants) {
        sourceTeam.participants = reorderList(
          sourceTeam.participants,
          source.index,
          destination.index
        )
        setMatchList(clonedMatchList)
      }
    } else {
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
      howLongLasted += `${Math.floor(gameDuration / 3600)} 시간`
      gameDuration = gameDuration % 3600

      if (gameDuration / 60 > 0) {
        howLongLasted += `${Math.floor(gameDuration / 60)} 분`
        gameDuration = gameDuration % 60

        if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
      } else {
        if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
      }
    } else {
      if (gameDuration / 60 > 0) {
        howLongLasted += `${Math.floor(gameDuration / 60)} 분`
        gameDuration = gameDuration % 60

        if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
      } else {
        if (gameDuration > 0) howLongLasted += `${gameDuration} 초`
      }
    }

    return howLongLasted
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
          <MatchSummaryWrapperStyle flexDirection="column" key={match.gameId}>
            <MatchSummaryStyle gap="1rem" win={match.selectedParticipant?.win}>
              <StyledFlexBox flexDirection="column">
                <StyledText
                  fontSize="1rem"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                >
                  {`${gameTypes[match.gameType]}, ${gameModes[match.gameMode]}`}
                  <br />
                  {match.selectedParticipant?.win ? '승리' : '패배'}
                </StyledText>

                <StyledText fontSize="1rem" whiteSpace="nowrap">
                  {getHowOldFromNow(match.gameCreation)}
                  <br />
                  {getHowLongLasted(match.gameDuration)}
                </StyledText>
              </StyledFlexBox>

              <ImgChampion
                width="100px"
                height="100px"
                borderRadius="100%"
                border="1px solid var(--white)"
                image={{
                  name: match.selectedParticipant?.championNameKor,
                  src: getChampionImage(
                    match.selectedParticipant?.championNameEng
                  ),
                }}
              />

              <ChampionSpells
                spells={[
                  {
                    imgSrc: match.selectedParticipant?.spell1ImagePath,
                  },
                  {
                    imgSrc: match.selectedParticipant?.spell2ImagePath,
                  },
                  {
                    imgSrc: match.selectedParticipant?.statPerk0ImagePath,
                  },
                  {
                    imgSrc: match.selectedParticipant?.statPerk1ImagePath,
                  },
                  {
                    imgSrc: match.selectedParticipant?.statPerk2ImagePath,
                  },
                ]}
              />

              <StyledFlexBox flexDirection="column">
                <ChampionKda
                  kills={match.selectedParticipant?.kills}
                  deaths={match.selectedParticipant?.deaths}
                  assists={match.selectedParticipant?.assists}
                />

                <StyledFlexBox flexDirection="row">
                  <StyledText fontSize="1rem" fontWeight="bold">
                    {`CS: ${match.selectedParticipant?.totalMinionsKilled} 레벨: ${match.selectedParticipant?.champLevel}`}
                  </StyledText>
                </StyledFlexBox>
              </StyledFlexBox>

              <ChampionItems
                items={[
                  {
                    itemId: match.selectedParticipant?.item0,
                  },
                  {
                    itemId: match.selectedParticipant?.item1,
                  },
                  {
                    itemId: match.selectedParticipant?.item2,
                  },
                  {
                    itemId: match.selectedParticipant?.item3,
                  },
                  {
                    itemId: match.selectedParticipant?.item4,
                  },
                  {
                    itemId: match.selectedParticipant?.item5,
                  },
                  {
                    itemId: match.selectedParticipant?.item6,
                  },
                ]}
              />

              <StyledFlexBox
                flexDirection="column"
                align="flex-start"
                border="0.5rem solid var(--team-light-blue)"
                borderRadius="5px"
                padding="0.5rem"
                gap="0.3rem"
              >
                <Heading fontWeight="bold" level={3} margin="0">
                  블루팀 소환사
                </Heading>
                {match.teams
                  .find((team) => team.teamId === 0)
                  ?.participants?.map((participant) => (
                    <StyledFlexBox
                      key={participant.accountId}
                      whiteSpace="nowrap"
                    >
                      <ImgStyle
                        width="1.5rem"
                        height="1.5rem"
                        src={getChampionImage(participant.championNameEng)}
                      />
                      {participant.summonerName}
                    </StyledFlexBox>
                  ))}
              </StyledFlexBox>

              <StyledFlexBox
                flexDirection="column"
                align="flex-start"
                border="0.5rem solid var(--team-light-red)"
                borderRadius="5px"
                padding="0.5rem"
                gap="0.3rem"
              >
                <Heading fontWeight="bold" level={3} margin="0">
                  레드팀 소환사
                </Heading>
                {match.teams
                  .find((team) => team.teamId === 1)
                  ?.participants?.map((participant) => (
                    <StyledFlexBox
                      key={participant.accountId}
                      whiteSpace="nowrap"
                    >
                      <ImgStyle
                        width="1.5rem"
                        height="1.5rem"
                        src={getChampionImage(participant.championNameEng)}
                      />
                      {participant.summonerName}
                    </StyledFlexBox>
                  ))}
              </StyledFlexBox>
            </MatchSummaryStyle>

            <Button
              color="dark-blue"
              width="100%"
              height="2rem"
              borderRadius="5px"
              margin="0.5rem 0"
              onClick={() => {
                onExpandClick(match.gameId)
              }}
            >
              {matchListExpendedMap.get(match.gameId) ? '숨기기' : '더보기'}
            </Button>

            {matchListExpendedMap.get(match.gameId) ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <StyledFlexBox flexDirection="row" align="flex-start">
                  <Droppable
                    droppableId={match.gameId + ',0'}
                    renderClone={getMatchParticipantClone(
                      match.teams.find((team) => team.teamId === 0)
                        ?.participants
                    )}
                  >
                    {(provided, snapshot) => (
                      <StyledFlexBox
                        ref={provided.innerRef}
                        flexDirection="column"
                        justify="start"
                        gap="1rem"
                        border="1rem solid var(--team-light-blue)"
                        borderRadius="5px"
                        padding="1rem"
                      >
                        <Heading
                          fontWeight="bold"
                          level={3}
                          margin="1rem 0 0 0"
                        >
                          블루팀 소환사
                        </Heading>
                        {match.teams
                          .find((team) => team.teamId === 0)
                          ?.participants?.map((participant, index) => (
                            <Draggable
                              key={participant.summonerId}
                              draggableId={participant.summonerId}
                              index={index}
                            >
                              {(provided, snapshot) =>
                                MatchParticipant(
                                  participant,
                                  provided,
                                  snapshot
                                )
                              }
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </StyledFlexBox>
                    )}
                  </Droppable>

                  <Button
                    fontSize="1.5rem"
                    color="blue"
                    width="100px"
                    height="100px"
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
                    {(provided, snapshot) => (
                      <StyledFlexBox
                        ref={provided.innerRef}
                        flexDirection="column"
                        justify="start"
                        gap="1rem"
                        border="1rem solid var(--team-light-red)"
                        borderRadius="5px"
                        padding="1rem"
                      >
                        <Heading
                          fontWeight="bold"
                          level={3}
                          margin="1rem 0 0 0"
                        >
                          레드팀 소환사
                        </Heading>
                        {match.teams
                          .find((team) => team.teamId === 1)
                          ?.participants?.map((participant, index) => (
                            <Draggable
                              key={participant.summonerId}
                              draggableId={participant.summonerId}
                              index={index}
                            >
                              {(provided, snapshot) =>
                                MatchParticipant(
                                  participant,
                                  provided,
                                  snapshot
                                )
                              }
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </StyledFlexBox>
                    )}
                  </Droppable>
                </StyledFlexBox>
              </DragDropContext>
            ) : null}
          </MatchSummaryWrapperStyle>
        ))}
    </>
  )
}

export default MatchTable
