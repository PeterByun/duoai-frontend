import { Img } from '@/components-atoms/img/Img'

import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { StyledText } from '@/components-atoms/text/Text'
import { CardStyle } from '@/components-atoms/card/StyledCard.style'

export const CardLiveMatchSummoner = ({
  summonerName,
  championImg,
  championNameKor,
  onClick,
}: {
  summonerName: string
  championImg: string
  championNameKor: string
  onClick: () => void
}) => {
  return (
    <CardStyle onClick={onClick}>
      <StyledFlexBox flexDirection="column" gap="1rem">
        <StyledText fontSize="1.5rem" fontWeight="bold">
          {summonerName}
        </StyledText>
        <StyledText>{championNameKor}</StyledText>
        <Img
          width="5rem"
          height="5rem"
          circle
          border
          image={{ src: championImg }}
          isNameHidden
        />
      </StyledFlexBox>
    </CardStyle>
  )
}
