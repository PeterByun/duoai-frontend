import { Method } from '@/types/app-types'

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

export const routes = Object.freeze({
  champion: {
    name: '챔피언',
    path: '/champion',
    children: {
      info: {
        name: '정보',
        path: 'info',
      },
      stats: {
        name: '통계',
        path: 'stats',
        disabled: true,
      },
      banPick: {
        name: '가상밴픽',
        path: 'ban-pick',
      },
    },
  },
  liveMatches: {
    name: '프로경기',
    path: '/live-matches',
    children: {
      analysis: {
        name: '분석',
        path: 'analysis',
      },
    },
  },
  multiSearch: {
    name: '소환사 멀티서치',
    path: '/multi-search',
    children: {
      multiSearchMain: {
        name: '메인',
        path: 'main',
      },
    },
  },
  leaderboard: {
    name: '랭킹',
    path: '/leaderboard',
    disabled: true,
    children: {
      champRanking: {
        name: '챔피언 랭킹',
        path: 'champ',
      },
      summonerRanking: {
        name: '소환사 랭킹',
        path: 'summoner',
      },
      expertRanking: {
        name: '장인 랭킹',
        path: 'expert',
      },
      summonerStats: {
        name: '소환사 통계',
        path: 'summoner-stats',
      },
    },
  },
  summoner: {
    name: '소환사',
    path: '/summoner',
    invisible: true,
  },
})
