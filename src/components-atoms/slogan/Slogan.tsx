import { Text } from '@/components-atoms/text/Text'
import { FlexBox } from '../flex-box/StyledFlexBox.style'

export default function Slogan() {
  return (
    <FlexBox flexDirection="column" align="center" justify="center">
      <Text fontSize="3rem" fontWeight="600" margin="1.4rem 0">
        당신의 직감을
      </Text>

      <Text fontSize="3rem" fontWeight="600" margin="1.4rem 0">
        확신으로
      </Text>
      <Text
        fontSize="3.5rem"
        fontWeight="bold"
        color="logo-blue"
        background="-webkit-linear-gradient(left,#4343e1,#ff39f9)"
        clipBackground
      >
        DUO AI
      </Text>
    </FlexBox>
  )
}
