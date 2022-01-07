import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from './components/Navigator'

import Champion from './pages/Champion'
import LiveMatches from './pages/LiveMatches/index'
import Leaderboard from './pages/Leaderboard/index'
import Landing from './pages/Landing'
import MultiSearch from './pages/MultiSearch'

import ChampionInfo from './pages/Champion/ChampionInfo'
import ChampionStats from './pages/Champion/ChampionStats'
import ChampionBanPick from './pages/Champion/ChampionBanPick'

import SummonerRanking from './pages/Leaderboard/SummonerRanking'
import ExpertRanking from './pages/Leaderboard/ExpertRanking'
import SummonerStats from './pages/Leaderboard/SummonerStats'

import LiveMatchesAnalysis from './pages/LiveMatches/LiveMatchesAnalysis'

import MultiSearchMain from './pages/MultiSearch/MultiSearchMain'

import SummonerSearch from "./pages/Summoner/SummonerSearch"

import { Page } from './types/app-types'
import { GlobalStyle } from './components/App/AppGlobalStyle'
import { Global } from '@emotion/react'

import { routes } from './constants/app-constants'
const championInfoRoutes = routes.champion.children
const leaderboardRoutes = routes.leaderboard.children
const liveMatchesRoutes = routes.liveMatches.children
const multiSearchRoutes = routes.multiSearch.children

import { loadChampionThumbnails, loadItemIcons } from './redux/slices/assetSlice'
import Summoner from './pages/Summoner'

const getChildrenPath = (page: Page): string => {
    if(page.children) {
        const child = Object.values(page.children)[0]
        child.path = page.path + child.path
        return getChildrenPath(child)
    } else {
        return page.path
    }
}

let pages: Page[] = [...Object.values(routes)]
pages = pages.map(page => {
    page.path = getChildrenPath(page)
    return page 
})

function App() {
    const dispatch = useDispatch()
    dispatch(loadChampionThumbnails())
    dispatch(loadItemIcons())

    return (
        <>
            <Global styles={GlobalStyle} />

            <BrowserRouter>
                <NavigationBar pages={pages} nested={false} depth={0} />

                <Routes>
                    <Route path={routes.champion.path} element={<Champion />}>
                        <Route path={championInfoRoutes.info.path} element={<ChampionInfo />}/>
                        <Route path={championInfoRoutes.stats.path} element={<ChampionStats />} />
                        <Route path={championInfoRoutes.banPick.path} element={<ChampionBanPick />} />
                    </Route>

                    <Route path={routes.liveMatches.path} element={<LiveMatches />}>
                        <Route path={liveMatchesRoutes.analysis.path} element={<LiveMatchesAnalysis />} />
                    </Route>

                    <Route path={routes.multiSearch.path} element={<MultiSearch />} >
                        <Route path={multiSearchRoutes.multiSearchMain.path} element={<MultiSearchMain />} />
                    </Route>

                    <Route path={routes.leaderboard.path} element={<Leaderboard />}>
                        <Route
                            path={leaderboardRoutes.summonerRanking.path}
                            element={<SummonerRanking />}
                        />
                            
                        <Route
                            path={leaderboardRoutes.expertRanking.path}
                            element={<ExpertRanking />}
                        />
                            
                        <Route
                            path={leaderboardRoutes.summonerStats.path}
                            element={<SummonerStats />}
                        />
                            
                    </Route>

                    <Route path={routes.summoner.path} element={<Summoner />}>
                        <Route
                            path='*'
                            element={<SummonerSearch/>}
                        />
                    </Route>

                    <Route path="*" element={<Landing />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
