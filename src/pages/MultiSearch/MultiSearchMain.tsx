import React, { KeyboardEventHandler, useState, useEffect, MouseEventHandler } from 'react'

import MultiSearchResultCard, { SummonerSearchResult } from '@/components/MultiSearchResultCard/MultiSearchResultCard'
import Grid from '@/components/Grid'
import Button from '@/components/Button'
import { StyledTextArea } from '@/components/TextArea/StyledTextArea.style'

import { getMatchSummary } from '../../utils/endpoints'

const MultiSearchMain = () => {

    const [searchText, setSearchText] = useState<string>('')
    const [summonerNames, setSummonerNames] = useState<string[]>([])
    const [summonerSearchResults, setSummonerSearchResults] = useState<SummonerSearchResult[]>([])
    
    const searchSummoners = (searchTextInput: string) => {
        if(!searchTextInput) return 

        const welcomeMessageSuffix = '님이 방에 참가했습니다.' 

        const userTypedSummonerNames = searchTextInput.split(welcomeMessageSuffix)

        setSummonerNames(userTypedSummonerNames.map(name => {
            if(!name) return null
            
            return name.replace(`\n`,'').trim()
        }).filter((name): name is string => name ? true : false))
    }

    useEffect(() => {
        if(!summonerNames.length) return 

        getMatchSummary.setParams({
            summonerList: summonerNames
        }).send<SummonerSearchResult[]>().then((response) => {
            setSummonerSearchResults(response.data)
        })

    }, [summonerNames])

    const handleSummonerSearchKeyup: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        setSearchText(event.currentTarget.value)

        if(event.ctrlKey && event.key === "Enter" && event.currentTarget.value) {
            searchSummoners(searchText)
        }
    }

    const handleSearchClick:MouseEventHandler<HTMLButtonElement> = () => {
        searchSummoners(searchText)
    }

    return (
        <>                
            <StyledTextArea 
                onKeyUp={handleSummonerSearchKeyup}
                width='30rem' height='7rem' fontSize='1.2rem' autoFocus >
            </StyledTextArea>
            <Button 
                onClick={handleSearchClick}
                width='30rem' height='2rem' margin='1rem 0 0 0'>
                검색
            </Button>
            {
                summonerSearchResults ? 
                    <Grid
                        gridTemplateColumns="repeat(5, 1fr)"
                        padding="1rem"
                        borderRadius="5px"
                    >
                        {
                            summonerSearchResults.map((summonerSearchResult) => (
                                <MultiSearchResultCard
                                    key={summonerSearchResult.summonerName}
                                    summonerSearchResult={summonerSearchResult}
                                />
                            ))
                        }
                    </Grid>
                : <div></div>
            }
        </>
    )
}

export default MultiSearchMain