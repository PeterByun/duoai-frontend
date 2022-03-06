import { StyledImgProps } from '@/components-atoms/img/StyledImg.style'
import { Img } from '@/components-atoms/img/Img'

import { ChampionImg } from '@/types/champion-types'

const SelectedChampion = (
  props: { champion: ChampionImg } & StyledImgProps
) => {
  return <Img image={props.champion} isNameHidden {...props} />
}

export default SelectedChampion
