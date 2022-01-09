import { Request } from './axios-utils'
import { httpMethods } from '../constants/app-constants'

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
// Multi-search
const matchSummaryUrl = '/api/match/summary'
export const getMatchSummary = new Request(matchSummaryUrl, httpMethods.get)

// Summoner search
const matchListUrl = '/api/match/list'
export const getMatchList = new Request(matchListUrl, httpMethods.get)

// Live pro matches
// fetch pro players list
const getProSummonersUrl = '/api/match/pro'
export const getProSummoners = new Request(getProSummonersUrl, httpMethods.get)

// Get match info to request analyze match after swap participants.
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

/**
 * API server endpoints to add
 */
// Virtual ban-pick page
const analyzeBanPickUrl = '/api/analysis/pickban'
export const analyzeBanPick = new Request(analyzeBanPickUrl, httpMethods.post)
