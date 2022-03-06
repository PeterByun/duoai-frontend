import React, {
  KeyboardEventHandler,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react'

import MultiSearchResultCard, {
  SummonerSearchResult,
} from '@/components/multiSearch-result-card/MultiSearchResultCard'
import Grid from '@/components-atoms/grid/Grid'
import Button from '@/components-atoms/button/Button'
import Loading from '@/components-atoms/loading/Loading'
import {
  MultiSearchAiAnalysisResult,
  AiAnalysisResult,
} from '@/components/multisearch/MultiSearchAiAnalysisResult'

import { StyledTextArea } from '@/components-atoms/text-area/StyledTextArea.style'
import { getMatchSummary, getMultiSearchAnalysis } from '../../utils/endpoints'
import Container from '@/components-atoms/container/Container'
import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'

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
          setSummonerSearchResults(Array.from(new Set(response.data)))
        })
    )

    getMultiSearchAnalysis
      .setData({
        summonerName: summonerNames,
      })
      .send<AiAnalysisResult>()
      .then((response) => {
        setAiAnalysisResult(response.data)
      })
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

  // Result type radio buttons
  const SEARCH_RESULT_TYPE: {
    BASIC: 'BASIC'
    AI: 'AI'
  } = {
    BASIC: 'BASIC',
    AI: 'AI',
  }

  type SearchResultTypeValues =
    typeof SEARCH_RESULT_TYPE[keyof typeof SEARCH_RESULT_TYPE]

  const [selectedSearchResultType, setSelectedSearchResultType] =
    useState<SearchResultTypeValues>(SEARCH_RESULT_TYPE.BASIC)

  const handleSearchResultTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedSearchResultType(e.target.value as SearchResultTypeValues)
  }

  const [aiAnalysisResult, setAiAnalysisResult] =
    useState<AiAnalysisResult | null>(null)

  // useEffect(() => {
  //   if (selectedSearchResultType === SEARCH_RESULT_TYPE.AI) {
  //     getMultiSearchAnalysis
  //       .setData({
  //         summonerName: summonerNames,
  //       })
  //       .send<AiAnalysisResult>()
  //       .then((response) => {
  //         setAiAnalysisResult(response.data)
  //       })
  //   }
  // }, [selectedSearchResultType])

  // Dummy
  // const aiAnalysisResult: AiAnalysisResult = {
  //   expectedWinRate: 0.4,
  //   mainLanerCount: {
  //     top: 1,
  //     jungle: 0,
  //     mid: 0,
  //     adc: 1,
  //     support: 1,
  //   },
  //   summonerProfiles: [
  //     {
  //       name: 'Josh',
  //       rank: 'gold',
  //       leaguePoints: 55,
  //       icons: [
  //         {
  //           type: '운영형',
  //           point: 1,
  //         },
  //         {
  //           type: '성장형',
  //           point: 0,
  //         },
  //       ],
  //       lane: 'mid',
  //       preferredChamps: [
  //         {
  //           champNameEng: 'Garen',
  //           champNameKor: '가렌',
  //         },
  //         {
  //           champNameEng: 'Alistar',
  //           champNameKor: '알리스타',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Peter',
  //       rank: 'grandmaster',
  //       leaguePoints: 55,
  //       lane: 'jungle',
  //       icons: [
  //         {
  //           type: '공격형',
  //           point: 0,
  //         },
  //         {
  //           type: '방어형',
  //           point: 0,
  //         },
  //       ],
  //       preferredChamps: [
  //         {
  //           champNameEng: 'Nunu',
  //           champNameKor: '누누',
  //         },
  //         {
  //           champNameEng: 'Quinn',
  //           champNameKor: '퀸',
  //         },
  //       ],
  //     },
  //   ],
  // }

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
        {summonerSearchResults && (
          <Container width="100%">
            <div>
              <label>
                <input
                  type="radio"
                  value={SEARCH_RESULT_TYPE.BASIC}
                  checked={
                    selectedSearchResultType === SEARCH_RESULT_TYPE.BASIC
                  }
                  onChange={handleSearchResultTypeChange}
                />
                검색결과
              </label>
              <label>
                <input
                  type="radio"
                  value={SEARCH_RESULT_TYPE.AI}
                  checked={selectedSearchResultType === SEARCH_RESULT_TYPE.AI}
                  onChange={handleSearchResultTypeChange}
                />
                AI분석
              </label>
            </div>

            {selectedSearchResultType === SEARCH_RESULT_TYPE.BASIC ? (
              <Grid
                gridTemplateColumns="repeat(auto-fit, minmax(5rem, 20rem))"
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
              <StyledFlexBox width="90%">
                {aiAnalysisResult && (
                  <MultiSearchAiAnalysisResult
                    aiAnalysisResult={aiAnalysisResult}
                  ></MultiSearchAiAnalysisResult>
                )}
              </StyledFlexBox>
            )}
          </Container>
        )}
      </Loading>
    </>
  )
}

export default MultiSearchMain
