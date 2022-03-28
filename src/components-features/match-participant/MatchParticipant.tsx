import {
  DraggingStyle,
  NotDraggingStyle,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from 'react-beautiful-dnd'

import { useChampionImages } from '@/hooks/use-champion-images'

import Grid from '@/components-atoms/grid/Grid'
import ChampionSpells from '@/components-commons/champion-spells/ChampionSpells'
import ChampionKda from '@/components-commons/champion-kda/ChampionKda'
import ChampionItems from '@/components-commons/champion-items/ChampionItems'

import { Text } from '@/components-atoms/text/Text'
import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Img } from '@/components-atoms/img/Img'

import { extractItemsFromParticipant } from '@/utils/match-utils'

import { ParticipantWithIdentity } from '@/apis/duoai/types/match'
import { css } from '@emotion/react'

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
      width="max(6vm, 20rem)"
      height="auto"
      padding="1rem"
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <Img
        width="5rem"
        height="5rem"
        margin="0px auto"
        image={{
          src: getChampionImage(participant.championNameEng),
        }}
        css={css`
          border-radius: 50%;
          border: 1px solid var(--white);
        `}
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

      <FlexBox flexDirection="row">
        <Text fontSize="1rem" fontWeight="bold">
          CS:
          {participant?.totalMinionsKilled}
        </Text>
        &nbsp; / &nbsp;
        <Text fontSize="1rem" fontWeight="bold">
          레벨: {participant?.champLevel}
        </Text>
      </FlexBox>

      <FlexBox flexDirection="row">
        <ChampionKda
          kills={participant?.kills}
          deaths={participant?.deaths}
          assists={participant?.assists}
        />
      </FlexBox>

      <ChampionItems
        gridTemplateColumns="repeat(auto-fit, minmax(2rem, 1fr))"
        padding="0"
        items={extractItemsFromParticipant(participant)}
      />
    </Grid>
  )
}
