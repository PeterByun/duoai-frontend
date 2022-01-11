import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from './components/navigator/Navigator'
import Loading from './components/loading/Loading'

const Landing = lazy(() => import('./pages/Landing'))
const Champion = lazy(() => import('./pages/champion/Champion'))
const LiveMatches = lazy(() => import('./pages/liveMatches/LiveMatches'))
const Leaderboard = lazy(() => import('./pages/leaderboard/Leaderboard'))
const MultiSearch = lazy(() => import('./pages/multiSearch/MultiSearch'))

const ChampionInfo = lazy(() => import('./pages/champion/ChampionInfo'))
const ChampionStats = lazy(() => import('./pages/champion/ChampionStats'))
const ChampionBanPick = lazy(() => import('./pages/champion/ChampionBanPick'))

const SummonerRanking = lazy(
  () => import('./pages/leaderboard/SummonerRanking')
)
const ExpertRanking = lazy(() => import('./pages/leaderboard/ExpertRanking'))
const SummonerStats = lazy(() => import('./pages/leaderboard/SummonerStats'))

const LiveMatchesAnalysis = lazy(
  () => import('./pages/liveMatches/LiveMatchesAnalysis')
)

const MultiSearchMain = lazy(
  () => import('./pages/multiSearch/MultiSearchMain')
)

const SummonerSearch = lazy(() => import('./pages/summoner/SummonerSearch'))

import { Page } from './types/app-types'
import { GlobalStyle } from './components/app/AppGlobalStyle'
import { Global } from '@emotion/react'

import { routes } from './constants/app-constants'
const championInfoRoutes = routes.champion.children
const leaderboardRoutes = routes.leaderboard.children

import {
  loadChampionThumbnails,
  loadItemIcons,
} from './redux/slices/assetSlice'
import Summoner from './pages/summoner/Summoner'

const pages: Page[] = [...Object.values(routes)]

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
          <Route
            path={routes.champion.path}
            element={<Loading resultComponent={<Champion />} />}
          >
            <Route
              index
              element={<Loading resultComponent={<ChampionInfo />} />}
            />
            <Route
              path={championInfoRoutes.stats.path}
              element={<Loading resultComponent={<ChampionStats />} />}
            />
            <Route
              path={championInfoRoutes.banPick.path}
              element={<Loading resultComponent={<ChampionBanPick />} />}
            />
          </Route>

          <Route
            path={routes.liveMatches.path}
            element={<Loading resultComponent={<LiveMatches />} />}
          >
            <Route
              index
              element={<Loading resultComponent={<LiveMatchesAnalysis />} />}
            />
          </Route>

          <Route
            path={routes.multiSearch.path}
            element={<Loading resultComponent={<MultiSearch />} />}
          >
            <Route
              index
              element={<Loading resultComponent={<MultiSearchMain />} />}
            />
          </Route>

          <Route
            path={routes.leaderboard.path}
            element={<Loading resultComponent={<Leaderboard />} />}
          >
            <Route
              index
              element={<Loading resultComponent={<SummonerRanking />} />}
            />

            <Route
              path={leaderboardRoutes.expertRanking.path}
              element={<Loading resultComponent={<ExpertRanking />} />}
            />

            <Route
              path={leaderboardRoutes.summonerStats.path}
              element={<Loading resultComponent={<SummonerStats />} />}
            />
          </Route>

          <Route
            path={routes.summoner.path}
            element={<Loading resultComponent={<Summoner />} />}
          >
            <Route
              index
              element={<Loading resultComponent={<SummonerSearch />} />}
            />
          </Route>

          <Route path="*" element={<Loading resultComponent={<Landing />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
