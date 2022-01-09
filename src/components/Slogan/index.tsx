import React from 'react'

import { StyledText } from '@/components/Text'

export default function Slogan() {
  return (
    <div>
      <StyledText
        fontSize="4rem"
        fontWeight="bold"
        color="logo-blue"
        margin="1.4rem 0"
        textAlign="left"
        background="-webkit-linear-gradient(left,#4343e1,#ff39f9)"
        clipBackground
      >
        DUO AI,
      </StyledText>

      <StyledText fontSize="4rem" fontWeight="600" margin="1.4rem 0">
        당신의 직감을
      </StyledText>

      <StyledText
        fontSize="4rem"
        fontWeight="600"
        width="fit-content"
        margin="1.4rem 0"
      >
        확신으로
      </StyledText>
    </div>
  )
}
