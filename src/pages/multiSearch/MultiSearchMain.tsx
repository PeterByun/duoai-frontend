import {
  KeyboardEventHandler,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react'

import MultiSearchResultCard, {
  SummonerSearchResult,
} from '@/components/multiSearchResultCard/MultiSearchResultCard'
import Grid from '@/components/grid/Grid'
import Button from '@/components/button/Button'
import Loading from '@/components/loading/Loading'

import { StyledTextArea } from '@/components/textArea/StyledTextArea.style'

import { getMatchSummary } from '../../utils/endpoints'

const MultiSearchMain = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerSearchResults, setSummonerSearchResults] = useState<
    SummonerSearchResult[]
  >([])
  const [getMatchSummaryTask, setGetMatchSummaryTask] =
    useState<Promise<void> | null>(null)

  const searchSummoners = (searchTextInput: string) => {
    if (!searchTextInput) return

    const welcomeMessageSuffix = '님이 방에 참가했습니다.'

    const userTypedSummonerNames = searchTextInput.split(welcomeMessageSuffix)

    setSummonerNames(
      userTypedSummonerNames
        .map((name) => {
          if (!name) return null

          return name.replace(`\n`, '').trim()
        })
        .filter((name): name is string => (name ? true : false))
    )
  }

  useEffect(() => {
    if (!summonerNames.length) return

    setGetMatchSummaryTask(
      getMatchSummary
        .setParams({
          summonerList: summonerNames,
        })
        .send<SummonerSearchResult[]>()
        .then((response) => {
          setSummonerSearchResults(response.data)
        })
    )
  }, [summonerNames])

  const handleSummonerSearchKeyup: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setSearchText(event.currentTarget.value)

    if (event.ctrlKey && event.key === 'Enter' && event.currentTarget.value) {
      searchSummoners(searchText)
    }
  }

  const handleSearchClick: MouseEventHandler<HTMLButtonElement> = () => {
    searchSummoners(searchText)
  }

  const SEARCH_PLACE_HOLDER =
    '소환사1 님이 방에 참가했습니다. \n소환사2 님이 방에 참가했습니다. \n소환사3 님이 방에 참가했습니다. \n소환사4 님이 방에 참가했습니다. \n소환사5 님이 방에 참가했습니다.'

  return (
    <>
      <StyledTextArea
        onKeyUp={handleSummonerSearchKeyup}
        width="30rem"
        height="7rem"
        fontSize="1.2rem"
        autoFocus
        placeholder={SEARCH_PLACE_HOLDER}
      ></StyledTextArea>
      <Button
        onClick={handleSearchClick}
        width="30rem"
        height="2rem"
        margin="1rem 0 0 0"
      >
        검색
      </Button>

      <Loading task={getMatchSummaryTask}>
        {summonerSearchResults ? (
          <Grid
            gridTemplateColumns="repeat(auto-fit, minmax(15rem, 20rem))"
            justifyContent="center"
            width="100%"
            padding="1rem"
            borderRadius="5px"
          >
            {summonerSearchResults.map((summonerSearchResult) => (
              <MultiSearchResultCard
                key={summonerSearchResult.summonerName}
                summonerSearchResult={summonerSearchResult}
              />
            ))}
          </Grid>
        ) : (
          <div></div>
        )}
      </Loading>
    </>
  )
}

export default MultiSearchMain
