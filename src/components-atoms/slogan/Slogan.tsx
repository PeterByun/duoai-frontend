import { StyledText } from '@/components-atoms/text/Text'
import { StyledFlexBox } from '../flex-box/StyledFlexBox.style'

export default function Slogan() {
  return (
    <StyledFlexBox flexDirection="column" align="center" justify="center">
      <StyledText fontSize="3rem" fontWeight="600" margin="1.4rem 0">
        당신의 직감을
      </StyledText>

      <StyledText fontSize="3rem" fontWeight="600" margin="1.4rem 0">
        확신으로
      </StyledText>
      <StyledText
        fontSize="3.5rem"
        fontWeight="bold"
        color="logo-blue"
        background="-webkit-linear-gradient(left,#4343e1,#ff39f9)"
        clipBackground
      >
        DUO AI
      </StyledText>
    </StyledFlexBox>
  )
}
