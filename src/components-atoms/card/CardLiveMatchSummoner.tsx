import { Img } from '@/components-atoms/img/Img'

import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { Text } from '@/components-atoms/text/Text'
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
      <FlexBox flexDirection="column" gap="1rem">
        <Text fontSize="1.5rem" fontWeight="bold">
          {summonerName}
        </Text>
        <Text>{championNameKor}</Text>
        <Img
          width="5rem"
          height="5rem"
          circle
          border
          image={{ src: championImg }}
          isNameHidden
        />
      </FlexBox>
    </CardStyle>
  )
}
