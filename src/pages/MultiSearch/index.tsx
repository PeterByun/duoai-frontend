import React from "react"
import {
    Outlet,
} from 'react-router-dom'

import NavigationBar from '@/components/Navigator'

import { Page } from '../../types/app-types'

import { routes } from '../../constants/app-constants'
const multiSearchRoutes = routes.multiSearch.children
const pages:Page[] = [...Object.values(multiSearchRoutes)]

const MultiSearch = () => {
    return (
        <>
            <NavigationBar
                pages={pages}
                nested={true}
                depth={1}
            />
            <Outlet/>
        </>
    )
}

export default MultiSearch