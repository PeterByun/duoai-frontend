import React from "react"

import { ImgStyleProps } from '../components-styled/StyledImg.style'
import ImgChampion from '../components/ImgChampion'

import { ChampionImg } from '../types/champion-types'

const SelectedChampion = (props: { champion: ChampionImg } & ImgStyleProps) => {
    return (
        <ImgChampion
            image={props.champion}
            {...props}
        />
    )
}

export default SelectedChampion