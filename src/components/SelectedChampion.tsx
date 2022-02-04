import React from 'react'

import { ImgStyleProps } from '@/components/img/StyledImg.style'
import ImgChampion from '@/components/imgChampion/ImgChampion'

import { ChampionImg } from '@/types/champion-types'

const SelectedChampion = (props: { champion: ChampionImg } & ImgStyleProps) => {
  return <ImgChampion image={props.champion} {...props} />
}

export default SelectedChampion
