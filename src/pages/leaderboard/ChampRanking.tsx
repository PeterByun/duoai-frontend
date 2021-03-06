import React, { ReactElement, useEffect } from 'react'

import {
  StyledSelectBar,
  StyledOption,
} from '@/components-atoms/select-bar/StyledSelectBar.style'

import Container from '@/components-atoms/container/Container'
import SearchBar from '@/components-atoms/search-box/SearchBox'
import Button from '@/components-atoms/button/Button'
import Input from '@/components-atoms/input/Input'
import Table from '@/components-atoms/table/Table'

import { ChampRank } from '../../types/rank-types'

import { getChampRankingsByTier } from '@/apis/duoai/duoai'
import { tiers, roles } from '../../constants/rank-constants'

type ChampRanksByTier = { [char: string]: ChampRank[] }

export const ChampRanking = (): ReactElement => {
  let searchInputVal: string | null = null

  const champRankingTableHeadItems = [
    {
      name: '순위',
      key: 'rank',
    },
    {
      name: '챔피언',
      key: 'championName',
    },
    {
      name: '티어',
      key: 'tier',
    },
    {
      name: '장점',
      key: 'strength',
    },
    {
      name: '승률',
      key: 'winRatio',
    },
    {
      name: '골드획득(평균대비)',
      key: 'goldIncom',
    },
    {
      name: '역할',
      key: 'role',
    },
  ]

  const getChampRankingRowClass = (item: ChampRank) => {
    return item.tier === 1 ? 'emphasized' : ''
  }

  const sortGroupedChampRankings = (groupedChampRankings: ChampRanksByTier) => {
    const sortedRankings: ChampRanksByTier = {}

    for (const tier in groupedChampRankings) {
      const rankings = [...groupedChampRankings[tier]].sort(
        (a: ChampRank, b: ChampRank) => {
          if (a.rank < b.rank) {
            return -1
          } else if (a.rank > b.rank) {
            return 1
          } else {
            return 0
          }
        }
      )
      sortedRankings[tier] = rankings
    }
    return sortedRankings
  }

  const [selectedTier, setSelectedTier] = React.useState<string | null>(null)

  const [selectedRole, setSelectedRole] = React.useState<string | null>(null)

  const [champRankingsByTier, setChampRankingsByTier] =
    React.useState<ChampRanksByTier | null>(null)

  const [selectedChampRankings, setSelectedChampionRankings] = React.useState<
    ChampRank[] | null
  >(null)

  useEffect(() => {
    async function fetchChampRankings() {
      let res = await (
        await getChampRankingsByTier.send<ChampRanksByTier>()
      ).data

      if (res) {
        res = sortGroupedChampRankings(res)

        setChampRankingsByTier(res)
        setSelectedChampionRankings(res.all)
        setSelectedTier(tiers.all.value)
      }
    }

    fetchChampRankings()
  }, [])

  const handleChampionSearchInputKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    searchInputVal = e.currentTarget.value

    if (e.key === 'Enter') handleSearchChampion()
  }

  const handleSearchChampion = (
    e?: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (searchInputVal && selectedChampRankings) {
      setSelectedChampionRankings(
        selectedChampRankings.filter(
          (champ) =>
            searchInputVal &&
            champ.name.toLowerCase().includes(searchInputVal.toLowerCase())
        )
      )
    } else {
      setSelectedChampionRankings(selectedChampRankings)
    }
  }

  const onTierClick =
    (tierValue: string) =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      setSelectedTier(tierValue)
      if (champRankingsByTier && tierValue) {
        const selectedChampRankingsByRole = champRankingsByTier[
          tierValue
        ].filter((champ: ChampRank) => champ.role === selectedRole)
        setSelectedChampionRankings([...selectedChampRankingsByRole])
      }
    }

  const onRoleClick =
    (roleValue: string) =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      setSelectedRole(roleValue)
      if (selectedChampRankings && champRankingsByTier && selectedTier) {
        const selectedChampRankingsByRole = champRankingsByTier[
          selectedTier
        ].filter((champ: ChampRank) => champ.role === roleValue)
        setSelectedChampionRankings([...selectedChampRankingsByRole])
      }
    }

  return (
    <Container childrenMarginBottom="10px" flexDirection={'column'}>
      <SearchBar width="1000px" height="100px">
        <Input label="챔피언 검색" onKeyUp={handleChampionSearchInputKeyUp} />
        <Button width="80px" height="40px" onClick={handleSearchChampion}>
          검색
        </Button>
      </SearchBar>

      <StyledSelectBar width="1000px" height="80px" depth={0}>
        {Object.values(tiers).map((tier) => (
          <StyledOption
            value={tier.value}
            key={tier.name}
            active={selectedTier === tier.value}
            onClick={onTierClick(tier.value)}
          >
            {tier.name}
          </StyledOption>
        ))}
      </StyledSelectBar>

      <StyledSelectBar width="1000px" height="80px" depth={1}>
        {Object.values(roles).map((role) => (
          <StyledOption
            value={role.value}
            key={role.name}
            active={selectedRole === role.value}
            onClick={onRoleClick(role.value)}
          >
            {role.name}
          </StyledOption>
        ))}
      </StyledSelectBar>

      <Table
        headItems={champRankingTableHeadItems}
        items={selectedChampRankings}
        rowClass={getChampRankingRowClass}
      />
    </Container>
  )
}

export default ChampRanking
