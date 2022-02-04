import { Img } from '@/components/img/Img'

import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'
import { StyledText } from '@/components/text/Text'
import { CardStyle } from '@/components/card/StyledCard.style'

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
          borderRadius="100%"
          border="1px solid var(--white)"
          src={championImg}
        />
      </StyledFlexBox>
    </CardStyle>
  )
}
