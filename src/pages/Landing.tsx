import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Slogan from '@/components-atoms/slogan/Slogan'
import Button from '@/components-atoms/button/Button'
import SearchBar from '@/components-atoms/search-box/SearchBox'
import Input from '@/components-atoms/input/Input'
import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'

const Landing = () => {
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value)
  }
  const handleSearchSummoner = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/summoner?summoner-name=${searchText}`)
  }

  return (
    <StyledFlexBox
      flexDirection="column"
      align="center"
      justify="center"
      width="100%"
      height="100%"
    >
      <Slogan />

      <SearchBar width="30rem" height="8rem" margin="0 auto">
        <Input
          onChange={handleInputChange}
          label="소환사 이름을 검색해보세요!"
        />
        <Button width="80px" height="40px" onClick={handleSearchSummoner}>
          검색
        </Button>
      </SearchBar>
    </StyledFlexBox>
  )
}

export default Landing
