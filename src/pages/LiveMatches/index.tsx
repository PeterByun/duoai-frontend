import React from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from '@/components/Navigator'

import { Page } from '../../types/app-types'

import { routes } from '../../constants/app-constants'
const LiveMatchesRoutes = routes.liveMatches.children
const pages: Page[] = [...Object.values(LiveMatchesRoutes)]

const LiveMatches = () => {
  return (
    <>
      <NavigationBar pages={pages} nested={true} depth={1} />
      <Outlet />
    </>
  )
}

export default LiveMatches
