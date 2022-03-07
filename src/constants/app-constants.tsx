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
  champion: {
    name: '챔피언',
    path: '/champion',
    children: {
      analysis: {
        name: '분석',
        path: 'analysis',
        children: {
          build: {
            name: '빌드',
            path: 'build',
          },
          counter: {
            name: '카운터',
            path: 'counter',
          },
          sabermetrics: {
            name: '세이버매트릭스',
            path: 'sabermetrics',
          },
        },
      },
      tier: {
        name: '챔피언 티어',
        path: 'tier',
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
    disabled: false,
    children: {
      analysis: {
        index: true,
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
        index: true,
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
        index: true,
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
    index: true,
    name: '소환사',
    path: '/summoner',
    invisible: true,
    children: {
      summonerSearch: {
        index: true,
        name: '소환사 검색',
        path: 'search',
      },
    },
  },
})
