import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Slogan from '@/components-atoms/slogan/Slogan'
import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <FlexBox
      flexDirection="column"
      align="center"
      justify="center"
      width="100%"
      height="100%"
    >
      <Slogan />
    </FlexBox>
  )
}

export default Landing
