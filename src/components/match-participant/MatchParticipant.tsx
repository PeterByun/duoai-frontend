import {
  DraggingStyle,
  NotDraggingStyle,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from 'react-beautiful-dnd'

import { useChampionImages } from '@/hooks/use-champion-images'

import Grid from '@/components-atoms/grid/Grid'
import ChampionSpells from '@/components/champion-spells/ChampionSpells'
import ChampionKda from '@/components/champion-kda/ChampionKda'
import ChampionItems from '@/components/champion-items/ChampionItems'

import { StyledText } from '@/components-atoms/text/Text'
import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { StyledImg } from '@/components-atoms/img/StyledImg.style'

import { extractItemsFromParticipant } from '@/utils/match-utils'

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
      width="max(6vm, 20rem)"
      height="auto"
      padding="1rem"
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <StyledImg
        width="5rem"
        height="5rem"
        margin="0px auto"
        src={getChampionImage(participant.championNameEng)}
        css={{
          clipPath: 'circle()',
          border: '1px solid var(--white)',
        }}
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
        items={extractItemsFromParticipant(participant)}
      />
    </Grid>
  )
}
