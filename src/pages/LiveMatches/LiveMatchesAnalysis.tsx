import React, { useEffect, useRef, useState } from 'react'

import { StyledText } from '@/components/Text'
import { CardStyle } from '@/components/Card/StyledCard'
import { StyledFlexBox } from '@/components/FlexBox/StyledFlexBox.style'
import { Img } from '@/components/Img'

import SearchBar from '@/components/SearchBox'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Grid from '@/components/Grid'
import MatchTable from '@/components/MatchTable'

import { getMatchList, getProSummoners } from '../../utils/endpoints'

import {
    Match,
    ParticipantWithIdentity,
    MatchList,
} from '../../types/match-types'

import { matchDataDummy } from '../../constants/match-constants'
import { useChampionImages } from '@/hooks/use-champion-images'
import Heading from '@/components/Heading'
import { StyledSvg } from '@/components/Svg/StyledSvg.style'
import Strong from '@/components/Strong'

// Merge participants with participants identities.
matchDataDummy.participants = matchDataDummy.participants.map(
    (participant: any) => {
        return {
            ...participant,
            ...matchDataDummy.participantIdentities.find(
                (identity: any) =>
                    participant.participantId === identity.participantId
            ),
        }
    }
)

const matchData: Match = { ...matchDataDummy }

matchData.teams = matchData.teams.map(team => {
    team.participants = matchData.participants.filter(participant => participant.teamId === team.teamId)
    return team
})

type Summoner = {
    summonerId: string
    summonerName: string
    championId: string
    championNameKor: string
    championNameEng: string
    src: string
}

const Stats = () => {
    const [summonerList, setSummonerList] = React.useState<Array<Summoner>>([])

    const summonerListToPreserve = useRef<Summoner[]>()

    const { getChampionImage } = useChampionImages()

    useEffect(() => {
        const requestProSummoners = async () => {
            const proSummoners = await getProSummoners.send<Array<Summoner>>().then(res => res.data)
            setSummonerList(proSummoners)
            summonerListToPreserve.current = [...proSummoners]
        }

        requestProSummoners()
    }, [])


    const [isSummonerSelected, setIsSummonerSelected] =
        React.useState<boolean>(false)

    const [selectedSommoner, setSelectedSommoner] =
        React.useState<Summoner | null>(null)

    const [matchList, setMatchList] = React.useState<MatchList>([matchData])

    const getSelectedParticipant = (
        participants: Array<ParticipantWithIdentity>,
        summonerName: string
    ) => {
        return participants.find(participant => participant.summonerName === summonerName)
    }

    const handleSummonerCardClick = (summoner: Summoner) => {
        getMatchList.setParams({summonerName: summoner.summonerName})
        .send<Match[]>().then(response => {
            const matchiListResponse = response.data.map(match => {
                // Merge participant and participant identity.
                match.participants = match.participants.map(participant => {
                    const identityMatchesParticipant = match.participantIdentities?.find(identity => identity.participantId === participant.participantId)    

                    participant = {
                        ...participant,
                        ...identityMatchesParticipant
                    }

                    return participant
                })

                // Set the selcted summoner to each matchs.
                const selectedSummonerInParticipants = getSelectedParticipant(
                    match.participants,
                    summoner.summonerName
                )

                if (selectedSummonerInParticipants) match.selectedParticipant = selectedSummonerInParticipants

                // Store a reference of participants to teams which they belong to.
                match.teams = match.teams.map(team => {
                    team.participants = match.participants.filter(participant => participant.teamId === team.teamId)
                    return team
                })

                return match
            })

            setMatchList(matchiListResponse)
            setIsSummonerSelected(true)
            setSelectedSommoner(summoner)
        })
        .catch(error => {
            // for dev
            console.error('Could not fetch a match list from the server.')
            matchData.selectedParticipant = matchData.participants[0]
            
            setIsSummonerSelected(true)
            setSelectedSommoner(summoner)
        })
    }

    const handleBackToSummonerListClick = () => {
        setIsSummonerSelected(false)
    }

    const [summonerNameToSearch, setSummonerNameToSearch] = useState<string|null>(null) 

    const handleSummonerNameToSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!summonerListToPreserve.current) return

        setSummonerNameToSearch(event.target.value)

        if(event.target.value) {
            setSummonerList(summonerListToPreserve.current.filter(summoner => summoner.summonerName.includes(event.target.value)))
        } else if(event.target.value === ''){
            setSummonerList([...summonerListToPreserve.current])
        }
    }

    const handleSearchClick = () => {
        if(!summonerListToPreserve.current) return

        if(summonerNameToSearch) {
            setSummonerList(summonerListToPreserve.current.filter(summoner => summoner.summonerName.includes(summonerNameToSearch)))
        } else if(summonerNameToSearch === ''){
            setSummonerList([...summonerListToPreserve.current])
        }
    }

    return (
        <>
            {
                (!isSummonerSelected || !selectedSommoner) && 
                <SearchBar width="30rem" height="6rem">
                    <Input label="소환사 검색" onInput={handleSummonerNameToSearchInput}/>
                    <Button width="80px" height="40px" onClick={handleSearchClick}>
                        검색
                    </Button>
                </SearchBar>
            }
            

            <Container flexDirection="column">
                <Grid
                    gridTemplateColumns={
                        isSummonerSelected ? '1fr' : 'repeat(5, 1fr)'
                    }
                    padding="1rem"
                    isChildrenClickable
                >
                    {isSummonerSelected && selectedSommoner ? (
                        <>
                            
                            <StyledFlexBox 
                                flexDirection='row'
                                justify='center'
                            >
                                <StyledSvg position="absolute" left="5rem" height="50" width="40" isButton onClick={handleBackToSummonerListClick}>
                                    <polygon points="25,0 25,40 0,20" style={{fill:'black'}} />
                                    Sorry, your browser does not support inline SVG.
                                </StyledSvg>
                                <Heading level={1} margin="0">
                                    <Strong fontSize='3rem' color="blue">
                                        {selectedSommoner.summonerName}
                                    </Strong> 
                                    님의 최근 전적
                                </Heading>
                            </StyledFlexBox>

                            <MatchTable
                                matchList={matchList}
                                setMatchList={setMatchList}
                                summonerId={selectedSommoner.summonerId}
                            />
                        </>
                    ) : (
                        summonerList.map((summoner: Summoner, idx) => (
                            <CardStyle
                                key={summoner.summonerName + idx}
                                onClick={() => {
                                 handleSummonerCardClick(summoner)
                                }}
                            >
                                <StyledFlexBox flexDirection="column" gap="1rem">
                                    <StyledText
                                        fontSize="1.5rem"
                                        fontWeight="bold"
                                    >
                                        {summoner.summonerName}
                                    </StyledText>
                                    <StyledText>{summoner.championNameKor}</StyledText>
                                    <Img
                                        width="100px"
                                        height="100px"
                                        borderRadius="100%"
                                        border='1px solid var(--white)'
                                        src={getChampionImage(summoner.championNameEng)}
                                    />
                                </StyledFlexBox>
                            </CardStyle>
                        ))
                    )}
                </Grid>
            </Container>
        </>
    )
}

export default Stats
