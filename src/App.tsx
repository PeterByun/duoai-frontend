import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from '@/components-atoms/navigator/Navigator'
import LoadingComponent from '@/components-atoms/loading/LoadingComponent'

const Landing = lazy(() => import('./pages/Landing'))
const Champion = lazy(() => import('./pages/champion/Champion'))
const LiveMatches = lazy(() => import('./pages/liveMatches/LiveMatches'))
const Leaderboard = lazy(() => import('./pages/leaderboard/Leaderboard'))
const MultiSearch = lazy(() => import('./pages/multiSearch/MultiSearch'))

const ChampionAnalysis = lazy(
  () => import('./pages/champion/champion-analysis/ChampionAnalysis')
)
const ChampionAnalysisBuild = lazy(
  () => import('./pages/champion/champion-analysis/ChampionBuild')
)
const ChampionAnalysisCounter = lazy(
  () => import('./pages/champion/champion-analysis/ChampionCounter')
)
const ChampionAnalysisSabermetrics = lazy(
  () => import('./pages/champion/champion-analysis/ChampionSabemetrics')
)

const ChampionTier = lazy(() => import('./pages/champion/ChampionTier'))

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
import { GlobalStyle } from './components-features/app/GlobalStyle'
import { Global } from '@emotion/react'

import { routes } from './constants/app-constants'
const championInfoRoutes = routes.champion.children!
const championAnalysisRoutes = routes.champion.children!.analysis.children!
const leaderboardRoutes = routes.leaderboard.children!

import {
  loadChampionThumbnails,
  loadItemIcons,
  loadRankIcons,
  loadsummonerTraitIcons,
} from './redux/slices/asset-slice'
import Summoner from './pages/summoner/Summoner'

const pages: Page[] = [...Object.values(routes)]

function App() {
  const dispatch = useDispatch()
  dispatch(loadChampionThumbnails())
  dispatch(loadItemIcons())
  dispatch(loadRankIcons())
  dispatch(loadsummonerTraitIcons())

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
              path={championInfoRoutes.analysis.path}
              element={
                <LoadingComponent>
                  <ChampionAnalysis />
                </LoadingComponent>
              }
            >
              <Route
                path={championAnalysisRoutes.build.path}
                element={
                  <LoadingComponent>
                    <ChampionAnalysisBuild />
                  </LoadingComponent>
                }
              />

              <Route
                path={championAnalysisRoutes.counter.path}
                element={
                  <LoadingComponent>
                    <ChampionAnalysisCounter />
                  </LoadingComponent>
                }
              />

              <Route
                path={championAnalysisRoutes.sabermetrics.path}
                element={
                  <LoadingComponent>
                    <ChampionAnalysisSabermetrics />
                  </LoadingComponent>
                }
              />
            </Route>
            <Route
              path={championInfoRoutes.tier.path}
              element={
                <LoadingComponent>
                  <ChampionTier />
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
