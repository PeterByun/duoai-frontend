import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from './components/Navigator'
import Loading from './components/Loading'

const Landing = lazy(() => import('./pages/Landing'))
const Champion = lazy(() => import('./pages/Champion'))
const LiveMatches = lazy(() => import('./pages/LiveMatches'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const MultiSearch = lazy(() => import('./pages/MultiSearch'))

const ChampionInfo = lazy(() => import('./pages/Champion/ChampionInfo'))
const ChampionStats = lazy(() => import('./pages/Champion/ChampionStats'))
const ChampionBanPick = lazy(() => import('./pages/Champion/ChampionBanPick'))

const SummonerRanking = lazy(
  () => import('./pages/Leaderboard/SummonerRanking')
)
const ExpertRanking = lazy(() => import('./pages/Leaderboard/ExpertRanking'))
const SummonerStats = lazy(() => import('./pages/Leaderboard/SummonerStats'))

const LiveMatchesAnalysis = lazy(
  () => import('./pages/LiveMatches/LiveMatchesAnalysis')
)

const MultiSearchMain = lazy(
  () => import('./pages/MultiSearch/MultiSearchMain')
)

const SummonerSearch = lazy(() => import('./pages/Summoner/SummonerSearch'))

import { Page } from './types/app-types'
import { GlobalStyle } from './components/App/AppGlobalStyle'
import { Global } from '@emotion/react'

import { routes } from './constants/app-constants'
const championInfoRoutes = routes.champion.children
const leaderboardRoutes = routes.leaderboard.children
const liveMatchesRoutes = routes.liveMatches.children
const multiSearchRoutes = routes.multiSearch.children

import {
  loadChampionThumbnails,
  loadItemIcons,
} from './redux/slices/assetSlice'
import Summoner from './pages/Summoner'

const getChildrenPath = (page: Page): string => {
  if (page.children) {
    const child = Object.values(page.children)[0]
    child.path = page.path + child.path
    return getChildrenPath(child)
  } else {
    return page.path
  }
}

let pages: Page[] = [...Object.values(routes)]
pages = pages.map((page) => {
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
          <Route
            path={routes.champion.path}
            element={<Loading resultComponent={<Champion />} />}
          >
            <Route
              path={championInfoRoutes.info.path}
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
              path={liveMatchesRoutes.analysis.path}
              element={<Loading resultComponent={<LiveMatchesAnalysis />} />}
            />
          </Route>

          <Route
            path={routes.multiSearch.path}
            element={<Loading resultComponent={<MultiSearch />} />}
          >
            <Route
              path={multiSearchRoutes.multiSearchMain.path}
              element={<Loading resultComponent={<MultiSearchMain />} />}
            />
          </Route>

          <Route
            path={routes.leaderboard.path}
            element={<Loading resultComponent={<Leaderboard />} />}
          >
            <Route
              path={leaderboardRoutes.summonerRanking.path}
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
              path="*"
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
