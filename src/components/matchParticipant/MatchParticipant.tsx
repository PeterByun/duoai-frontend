import React from 'react'
import {
  DraggingStyle,
  NotDraggingStyle,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from 'react-beautiful-dnd'

import { css, jsx } from '@emotion/react'

import { useChampionImages } from '@/hooks/use-champion-images'

import Grid from '@/components/grid/Grid'
import ChampionSpells from '@/components/championSpells/ChampionSpells'
import ChampionKda from '@/components/championKda/ChampionItems'
import ChampionItems from '@/components/championItems'

import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { ImgStyle } from '@/components/img/StyledImg.style'

import { ParticipantWithIdentity } from '@/types/match-types'

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => {
  if (draggableStyle) {
    const itemStyle = {
      ...draggableStyle,
    }

    if (isDragging) {
      Object.assign(itemStyle, {
        background: 'var(--lighter-blue)',
      })
    }
    return itemStyle
  }
}

export const getMatchParticipantClone =
  (items: ParticipantWithIdentity[] | undefined) =>
  (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    rubric: DraggableRubric
  ) => {
    if (!items) {
      return <div></div>
    }
    const participant = items[rubric.source.index]

    return MatchParticipant(participant, provided, snapshot)
  }

export function MatchParticipant(
  participant: ParticipantWithIdentity,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot
) {
  const { getChampionImage } = useChampionImages()

  return (
    <Grid
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      gridTemplateColumns="1fr"
      gridTemplateRows="auto"
      boxShadow="5px 5px 8px 0px #6a6a6a"
      borderRadius="5px"
      width="max(6vm, 20rem)"
      height="auto"
      padding="1rem"
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <ImgStyle
        width="5rem"
        height="5rem"
        borderRadius="100%"
        border="1px solid var(--white)"
        margin="0px auto"
        src={getChampionImage(participant.championNameEng)}
      />

      <ChampionSpells
        spells={[
          { imgSrc: participant?.spell1ImagePath },
          { imgSrc: participant?.spell2ImagePath },
          { imgSrc: participant?.statPerk0ImagePath },
          { imgSrc: participant?.statPerk1ImagePath },
          { imgSrc: participant?.statPerk2ImagePath },
        ]}
      />

      <StyledFlexBox flexDirection="row">
        <StyledText fontSize="1rem" fontWeight="bold">
          CS:
          {participant?.totalMinionsKilled}
        </StyledText>
        &nbsp; / &nbsp;
        <StyledText fontSize="1rem" fontWeight="bold">
          레벨: {participant?.champLevel}
        </StyledText>
      </StyledFlexBox>

      <StyledFlexBox flexDirection="row">
        <ChampionKda
          kills={participant?.kills}
          deaths={participant?.deaths}
          assists={participant?.assists}
        />
      </StyledFlexBox>

      <ChampionItems
        gridTemplateColumns="repeat(auto-fit, minmax(2rem, 1fr))"
        padding="0"
        items={[
          {
            itemId: participant.item0,
          },
          {
            itemId: participant.item1,
          },
          {
            itemId: participant.item2,
          },
          {
            itemId: participant.item3,
          },
          {
            itemId: participant.item4,
          },
          {
            itemId: participant.item5,
          },
          {
            itemId: participant.item6,
          },
        ]}
      />
    </Grid>
  )
}
