import {
  ParticipantsEntity,
  ParticipantWithIdentity,
} from '@/types/match-types'

export const extractItemsFromParticipant = (
  participant: ParticipantWithIdentity | ParticipantsEntity | undefined
) => {
  return [
    {
      itemId: participant?.item0,
    },
    {
      itemId: participant?.item1,
    },
    {
      itemId: participant?.item2,
    },
    {
      itemId: participant?.item3,
    },
    {
      itemId: participant?.item4,
    },
    {
      itemId: participant?.item5,
    },
    {
      itemId: participant?.item6,
    },
  ]
}

export const extractSpellsAndStatsFromParticipant = (
  participant: ParticipantsEntity | undefined
) => {
  return [
    {
      imgSrc: participant?.spell1ImagePath,
    },
    {
      imgSrc: participant?.spell2ImagePath,
    },
    {
      imgSrc: participant?.statPerk0ImagePath,
    },
    {
      imgSrc: participant?.statPerk1ImagePath,
    },
    {
      imgSrc: participant?.statPerk2ImagePath,
    },
  ]
}
