import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import NavigationBar from '@/components-atoms/navigator/Navigator'
import LoadingComponent from '@/components-atoms/loading/LoadingComponent'

const Landing = lazy(() => import('./pages/Landing'))
const LiveMatches = lazy(() => import('./pages/liveMatches/LiveMatches'))

const LiveMatchesAnalysis = lazy(
  () => import('./pages/liveMatches/LiveMatchesAnalysis')
)

import { Page } from './types/app-types'
import { GlobalStyle } from './components-commons/app/GlobalStyle'
import { Global } from '@emotion/react'

import { routes } from './constants/app-constants'

import {
  loadChampionThumbnails,
  loadItemIcons,
  loadRankIcons,
  loadsummonerTraitIcons,
} from './redux/slices/asset-slice'

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
