import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from './components/navigator/Navigator'
import LoadingComponent from './components/loading/LoadingComponent'

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
  // loadRankedPositions,
  loadRankIcons,
} from './redux/slices/assetSlice'
import Summoner from './pages/summoner/Summoner'

const pages: Page[] = [...Object.values(routes)]

function App() {
  const dispatch = useDispatch()
  dispatch(loadChampionThumbnails())
  dispatch(loadItemIcons())
  dispatch(loadRankIcons())

  return (
    <>
      <Global styles={GlobalStyle} />

      <BrowserRouter>
        <NavigationBar pages={pages} nested={false} depth={0} />

        <Routes>
          <Route
            path={routes.champion.path}
            element={
              <LoadingComponent>
                <Champion />
              </LoadingComponent>
            }
          >
            <Route
              index
              element={
                <LoadingComponent>
                  <ChampionInfo />
                </LoadingComponent>
              }
            />
            <Route
              path={championInfoRoutes.stats.path}
              element={
                <LoadingComponent>
                  <ChampionStats />
                </LoadingComponent>
              }
            />
            <Route
              path={championInfoRoutes.banPick.path}
              element={
                <LoadingComponent>
                  <ChampionBanPick />
                </LoadingComponent>
              }
            />
          </Route>

          <Route
            path={routes.liveMatches.path}
            element={
              <LoadingComponent>
                <LiveMatches />
              </LoadingComponent>
            }
          >
            <Route
              index
              element={
                <LoadingComponent>
                  <LiveMatchesAnalysis />
                </LoadingComponent>
              }
            />
          </Route>

          <Route
            path={routes.multiSearch.path}
            element={
              <LoadingComponent>
                <MultiSearch />
              </LoadingComponent>
            }
          >
            <Route
              index
              element={
                <LoadingComponent>
                  <MultiSearchMain />
                </LoadingComponent>
              }
            />
          </Route>

          <Route
            path={routes.leaderboard.path}
            element={
              <LoadingComponent>
                <Leaderboard />
              </LoadingComponent>
            }
          >
            <Route
              index
              element={
                <LoadingComponent>
                  <SummonerRanking />
                </LoadingComponent>
              }
            />

            <Route
              path={leaderboardRoutes.expertRanking.path}
              element={
                <LoadingComponent>
                  <ExpertRanking />
                </LoadingComponent>
              }
            />

            <Route
              path={leaderboardRoutes.summonerStats.path}
              element={
                <LoadingComponent>
                  <SummonerStats />
                </LoadingComponent>
              }
            />
          </Route>

          <Route
            path={routes.summoner.path}
            element={
              <LoadingComponent>
                <Summoner />
              </LoadingComponent>
            }
          >
            <Route
              index
              element={
                <LoadingComponent>
                  <SummonerSearch />
                </LoadingComponent>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <LoadingComponent>
                <Landing />
              </LoadingComponent>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
