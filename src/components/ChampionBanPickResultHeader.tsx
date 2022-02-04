import Grid from '@/components/grid/Grid'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import SelectedChampion from '@/components/SelectedChampion'

import { TeamComparison } from '@/pages/champion/ChampionBanPick'

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
        <Grid
          gridTemplateColumns="repeat(5, 1fr)"
          padding="1rem"
          backgroundColor="team-blue"
          color="white"
          borderRadius="5px"
        >
          {props.teamComparison.blue.champions.map((champion) => (
            <SelectedChampion
              color="white"
              key={champion.name}
              champion={champion}
            />
          ))}
        </Grid>
      ) : null}
      {props.teamComparison.red.champions.length > 0 ? (
        <Grid
          gridTemplateColumns="repeat(5, 1fr)"
          padding="1rem"
          backgroundColor="team-red"
          color="white"
          borderRadius="5px"
        >
          {props.teamComparison.red.champions.map((champion) => (
            <SelectedChampion
              color="white"
              key={champion.name}
              champion={champion}
            />
          ))}
        </Grid>
      ) : null}
    </StyledFlexBox>
  )
}
