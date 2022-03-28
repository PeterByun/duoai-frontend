import { Method, PageTree } from '@/types/app-types'

export const colors: { [key: string]: string } = {
  blue: '#1aace5',
  red: '#e54e53',
}

export const httpMethods: {
  [key: string]: Method
} = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  delete: 'delete',
}

export const routes: PageTree = Object.freeze({
  liveMatches: {
    name: '프로경기',
    path: '/live-matches',
    disabled: false,
    children: {
      analysis: {
        index: true,
        name: '분석',
        path: 'analysis',
      },
    },
  },
})
