import React from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from '@/components/navigator/Navigator'

import { Page } from '../../types/app-types'

import { routes } from '../../constants/app-constants'
const championInfoRoutes = routes.champion.children

const pages: Page[] = [...Object.values(championInfoRoutes)]

const Champion = () => {
  return (
    <>
      <NavigationBar pages={pages} nested={true} depth={1} />
      <Outlet />
    </>
  )
}

export default Champion
