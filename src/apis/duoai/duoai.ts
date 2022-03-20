import { Request } from '@/utils/http-utils'
import { httpMethods } from '../../constants/app-constants'

/**
 * Ranking pages dummy endpoints
 */
const champRankingsByTierUrl = '/champ-ranking-by-tier'
const summonerRankingUrl = '/summoner-ranking'
const summonerRankingByRoleUrl = '/summoner-ranking-by-role'
const totalUserByTierUrl = '/total-user-by-tier'

export const getChampRankingsByTier = new Request(
  champRankingsByTierUrl,
  httpMethods.get
)
export const getSummonerRanking = new Request(
  summonerRankingUrl,
  httpMethods.get
)
export const getSummonerRankingByRole = new Request(
  summonerRankingByRoleUrl,
  httpMethods.get
)
export const getTotalUserByTier = new Request(
  totalUserByTierUrl,
  httpMethods.get
)

/**
 * API server endpoints
 */
// Summoner search
const matchListUrl = '/api/match/list'
export const getMatchList = new Request(matchListUrl, httpMethods.get)

// Multi-search
const matchSummaryUrl = '/api/match/multi-search'
export const getMatchSummary = new Request(matchSummaryUrl, httpMethods.get)

// Multi-search Analysis
const multiSearchAnalysisUrl = '/api/analysis/multi-search'
export const getMultiSearchAnalysis = new Request(
  multiSearchAnalysisUrl,
  httpMethods.post
)

// Live pro matches
const getProSummonersUrl = '/api/match/pro'
export const getProSummoners = new Request(getProSummonersUrl, httpMethods.get)

const getSwitchedMatchUrl = '/api/match/switch'
export const getSwitchedMatch = new Request(
  getSwitchedMatchUrl,
  httpMethods.get
)

const analyzeSwappedMatchUrl = '/api/analysis/switch'
export const analyzeSwappedMatch = new Request(
  analyzeSwappedMatchUrl,
  httpMethods.post
)

// Virtual ban-pick page
const analyzeBanPickUrl = '/api/analysis/pickban'
export const analyzeBanPick = new Request(analyzeBanPickUrl, httpMethods.post)
