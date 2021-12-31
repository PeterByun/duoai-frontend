import React from 'react'

import Heading from '../components/Heading'

import { StyledText } from '../components-styled/StyledText.style'
import { FlexBoxStyle } from '../components-styled/StyledFlexBox.style'
import { StyledHr } from '../components-styled/StyledHr.style'
import ImgChampion from './ImgChampion';
import Strong from '../components/Strong'
import Container from '../components/Container'

import { useChampionImages, } from '../hooks/use-champion-images';

import { toPercentage, formatKda, getHowOldFromNow, getStreakMessage } from '../utils/string-utils'

export type SummonerSearchResult = {
    summonerName: string,
    mainPosition: string,
    mainPositionPickRate: number,
    mainPositionWinRate: number,
    subPosition: string,
    subPositionPickRate: number,
    subPositionWinRate: number,
    streakInfo: string,
    streakResult: number,
    playedGameInfoList: {
        kills: number,
        deaths: number,
        assists: number,
        date: string,
        championId: string,
        championNameKor: string,
        championNameEng: string,
        win: boolean
    }[]
}

type MultiSearchResultCardProps = {
    summonerSearchResult: SummonerSearchResult
}

const MultiSearchResultCard = (props: MultiSearchResultCardProps) => {
    const { getChampionImage } = useChampionImages()

    return (
        <Container flexDirection='column' justify='flex-start' width='16rem' gap='1rem' padding='1rem' margin='0'>
                <FlexBoxStyle flexDirection='row'>
                    <Heading level={2}>{props.summonerSearchResult.summonerName}</Heading>
                </FlexBoxStyle>

                <FlexBoxStyle flexDirection='row' border='0px 0px 1px 0px solid black' padding="0 1rem">
                    <StyledText>{props.summonerSearchResult.mainPosition}</StyledText>
                    <FlexBoxStyle flexDirection='column' align='flex-start'>
                        <StyledText margin='0'>• 전체 게임의 <Strong color='blue'>{toPercentage(props.summonerSearchResult.mainPositionPickRate)}</Strong> </StyledText> 
                        <StyledText margin='0'>• 승률 <Strong color='blue'>{toPercentage(props.summonerSearchResult.mainPositionWinRate)}</Strong> </StyledText>
                    </FlexBoxStyle>    
                </FlexBoxStyle>

                <FlexBoxStyle flexDirection='row'>
                    <StyledText>{props.summonerSearchResult.subPosition}</StyledText>
                    <FlexBoxStyle flexDirection='column' align='flex-start'>
                    <StyledText margin='0'>• 전체 게임의 <Strong color='blue'>{toPercentage(props.summonerSearchResult.subPositionPickRate)}</Strong> </StyledText> 
                    <StyledText margin='0'>• 승률 <Strong color='blue'>{toPercentage(props.summonerSearchResult.subPositionWinRate)}</Strong> </StyledText>
                    </FlexBoxStyle>    
                </FlexBoxStyle>

                { props.summonerSearchResult.streakResult > 0 && <FlexBoxStyle flexDirection='row'>
                    {`${props.summonerSearchResult.streakResult} ${getStreakMessage(props.summonerSearchResult.streakInfo)}`}
                </FlexBoxStyle>}
                
                <StyledHr></StyledHr>

                    { props.summonerSearchResult.playedGameInfoList ? 
                        <FlexBoxStyle flexDirection='column' align='flex-start' width='100%'>
                            {
                                props.summonerSearchResult.playedGameInfoList.map((gameRecord) => {
                                    return (
                                        <FlexBoxStyle key={gameRecord.date} flexDirection='row' width='100%'>
                                            <ImgChampion
                                                width="1.5rem"
                                                height="1.5rem"
                                                borderRadius="100%"
                                                border='1px solid var(--white)'
                                                isNameHidden
                                                image={
                                                    {
                                                        name: gameRecord.championNameKor,
                                                        src: getChampionImage(gameRecord.championNameEng),
                                                    }
                                                }
        
                                            />
                                            &nbsp;
                                            {
                                                formatKda({
                                                    kills: gameRecord.kills,
                                                    deaths: gameRecord.deaths,
                                                    assists: gameRecord.assists
                                                }).formattedKda
                                            }
                                            <StyledText margin='0 0 0 auto'>{getHowOldFromNow(gameRecord.date)}</StyledText>
                                        </FlexBoxStyle>
                                    )
                                })
                            }
                        </FlexBoxStyle>
                    : null}
            </Container>
    )
}

export default MultiSearchResultCard