import React, { useEffect } from 'react'

import {
    SelectBarStyle,
    OptionStyle,
} from '../../components-styled/StyledSelectBar.style'

import Container from '../../components/Container'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Table from '../../components/Table'

import { SummonerRank } from '../../types/rank-types'

import { getSummonerRanking } from '../../utils/endpoints'
import { champions, tiers, expertCriteria } from '../../constants/rank-constants'

const summonerRankingsTableHeadItems = [
    {
        name: '순위',
        key: 'rank',
    },
    {
        name: '소환사 이름',
        key: 'championName',
    },
    {
        name: '점수',
        key: 'strength',
    },
    {
        name: '티어',
        key: 'tier',
    },
]

export const ExpertRanking = () => {
    let searchInputVal: string | null = null

    const [selectedChampion, setSelectedChampion] = React.useState<
        string | null
    >(null)

    const [selectedTier, setSelectedTier] = React.useState<string | null>(null)

    const [selectedExpertCriteria, setSelectedExpertCriteria] = React.useState<
        string | null
    >(null)

    const [summonerRankings, setSummonerRankings] = React.useState<
        SummonerRank[] | null
    >(null)

    useEffect(() => {
        async function fetchSummonerRankings() {
            getSummonerRanking.send<SummonerRank[]>().then((res) => {
                setSummonerRankings(res.data)
            })
        }
        fetchSummonerRankings()
    }, [])

    const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const element = e.currentTarget as HTMLInputElement
        searchInputVal = element.value
        if (e.key === 'Enter') onSearchSummoner()
    }

    const onSearchSummoner = (
        e?: React.MouseEvent<HTMLButtonElement>
    ): void => {
        if (searchInputVal && summonerRankings) {
            setSummonerRankings(
                summonerRankings.filter(
                    (summoner) =>
                        searchInputVal &&
                        summoner.name
                            .toLowerCase()
                            .includes(searchInputVal.toLowerCase())
                )
            )
        } else {
            setSummonerRankings(summonerRankings)
        }
    }

    const onChampionClick =
        (championValue: string) =>
        (e: React.MouseEvent<HTMLButtonElement>): void => {
            setSelectedChampion(championValue)
        }

    const onTierClick =
        (tierValue: string) =>
        (e: React.MouseEvent<HTMLButtonElement>): void => {
            setSelectedTier(tierValue)
        }

    const onExpertCriteriaClick =
        (criteraValue: string) =>
        (e: React.MouseEvent<HTMLButtonElement>): void => {
            setSelectedExpertCriteria(criteraValue)
        }

    return (
        <Container childrenMarginBottom="10px" flexDirection={'column'}>
            <SearchBar width="1000px" height="100px">
                <Input label="소환사 검색" onKeyUp={onInputKeyUp} />
                <Button
                    width="80px"
                    height="40px"
                    onClick={onSearchSummoner}
                >
                    검색
                </Button>
            </SearchBar>

            <SelectBarStyle width="1000px" height="80px" depth={1}>
                {Object.values(champions).map((champion) => (
                    <OptionStyle
                        value={champion.value}
                        key={champion.name}
                        active={selectedChampion === champion.value}
                        onClick={onChampionClick(champion.value)}
                    >
                        {champion.name}
                    </OptionStyle>
                ))}
            </SelectBarStyle>

            <SelectBarStyle width="1000px" height="80px" depth={0}>
                {Object.values(tiers).map((tier) => (
                    <OptionStyle
                        value={tier.value}
                        key={tier.name}
                        active={selectedTier === tier.value}
                        onClick={onTierClick(tier.value)}
                    >
                        {tier.name}
                    </OptionStyle>
                ))}
            </SelectBarStyle>

            <SelectBarStyle width="1000px" height="80px" depth={2}>
                {Object.values(expertCriteria).map((criteria) => (
                    <OptionStyle
                        value={criteria.value}
                        key={criteria.name}
                        active={selectedExpertCriteria === criteria.value}
                        onClick={onExpertCriteriaClick(criteria.value)}
                    >
                        {criteria.name}
                    </OptionStyle>
                ))}
            </SelectBarStyle>

            <Table
                headItems={summonerRankingsTableHeadItems}
                items={summonerRankings}
            />
        </Container>
    )
}

export default ExpertRanking
