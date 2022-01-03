import React, { useEffect } from 'react'

import {
    SelectBarStyle,
    OptionStyle,
} from '../../components/SelectBar/StyledSelectBar.style'

import Container from '../../components/Container'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Table from '../../components/Table'

import { SummonerRank } from '../../types/rank-types'

import { roles } from '../../constants/rank-constants'
import { getSummonerRankingByRole } from '../../utils/endpoints'

type SummonerRanksByRole = { [char: string]: SummonerRank[] }

const SummonerRanking = () => {
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

    let searchInputValue: string | null = null

    const [selectedRole, setSelectedRole] = React.useState<string | null>(null)

    const [summonerRankings, setSummonerRankings] = React.useState<
        SummonerRank[] | null
    >(null)

    const [summonerRankingsByRole, setSummonerRankingsByRole] =
        React.useState<SummonerRanksByRole | null>(null)

    useEffect(() => {
        async function fetchSummonerRanking() {
            const data =
                await (await getSummonerRankingByRole.send<SummonerRanksByRole>()).data
            if (data) {
                setSummonerRankingsByRole(data)
                setSummonerRankings(data.top)
            }
        }
        fetchSummonerRanking()
    }, [])

    const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const element = e.currentTarget as HTMLInputElement
        searchInputValue = element.value
        if (e.key === 'Enter') onSearchSummoner()
    }

    const onSearchSummoner = (
        e?: React.MouseEvent<HTMLButtonElement>
    ): void => {
        if (searchInputValue && summonerRankings) {
            setSummonerRankings(
                summonerRankings.filter(
                    (summoner) =>
                        searchInputValue &&
                        summoner.name
                            .toLowerCase()
                            .includes(searchInputValue.toLowerCase())
                )
            )
        } else {
            setSummonerRankings(summonerRankings)
        }
    }

    const onRoleClick =
        (roleValue: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
            setSelectedRole(roleValue)

            if (summonerRankingsByRole && roleValue)
                setSummonerRankings(summonerRankingsByRole[roleValue])
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

            <SelectBarStyle width="1000px" height="80px" depth={0}>
                {Object.values(roles).map((role) => (
                    <OptionStyle
                        value={role.value}
                        key={role.name}
                        active={selectedRole === role.value}
                        onClick={onRoleClick(role.value)}
                    >
                        {role.name}
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

export default SummonerRanking
