import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import SelectedChampion from '@/components/champion-ban-pick/SelectedChampion'

import { TeamComparison } from '@/pages/champion/ChampionBanPick'
import { GridSelectedChampions } from '@/components-atoms/grid/GridSelectedChampions'

export const ChampionBanPickResultHeader = (props: {
  teamComparison: TeamComparison
}) => {
  return (
    <StyledFlexBox
      flexDirection="row"
      padding="1rem"
      justify="space-between"
      width="95%"
      flowColumnOnMdScreen
    >
      {props.teamComparison.blue.champions.length > 0 ? (
        <GridSelectedChampions teamColor="blue">
          {props.teamComparison.blue.champions.map((champion) => (
            <SelectedChampion
              color="white"
              key={champion.name}
              champion={champion}
            />
          ))}
        </GridSelectedChampions>
      ) : null}
      {props.teamComparison.red.champions.length > 0 ? (
        <GridSelectedChampions teamColor="red">
          {props.teamComparison.red.champions.map((champion) => (
            <SelectedChampion
              color="white"
              key={champion.name}
              champion={champion}
            />
          ))}
        </GridSelectedChampions>
      ) : null}
    </StyledFlexBox>
  )
}
