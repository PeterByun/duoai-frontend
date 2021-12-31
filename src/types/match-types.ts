export interface Match {
    gameId: number
    platformId: string
    gameCreation: string
    gameDuration: number
    mapId: number
    seasonId: number
    gameVersion: string
    gameMode: string
    gameType: string
    teams: TeamsEntity[]
    participants: Array<ParticipantWithIdentity>
    selectedParticipant?: ParticipantsEntity
    participantIdentities?: ParticipantIdentitiesEntity[]
}

export type ParticipantWithIdentity = ParticipantIdentitiesEntity &
    ParticipantsEntity

export interface TeamsEntity {
    teamId: number
    win: string
    firstBlood: boolean
    firstTower: boolean
    firstInhibitor: boolean
    firstBaron: boolean
    firstDragon: boolean
    firstRiftHerald: boolean
    towerKills: number
    inhibitorKills: number
    baronKills: number
    dragonKills: number
    riftHeraldKills: number
    bans?: BansEntity[] | null
    participants?: Array<ParticipantWithIdentity>
}
export interface BansEntity {
    pickTurn: number
    banChampionId: number
}
export interface ParticipantsEntity {
    teamId: number
    participantId: number
    championId: number
    championNameKor: string
    championNameEng: string
    spell1Id: number
    spell1ImagePath: string,
    spell2Id: number
    spell2ImagePath: string,
    win: boolean
    item0: number
    item1: number
    item2: number
    item3: number
    item4: number
    item5: number
    item6: number
    kills: number
    deaths: number
    assists: number
    largestKillingSpree: number
    largestMultiKill: number
    killingSprees: number
    longestTimeSpentLiving: number
    doubleKills: number
    tripleKills: number
    quadraKills: number
    pentaKills: number
    unrealKills: number
    totalDamageDealt: number
    magicDamageDealt: number
    physicalDamageDealt: number
    trueDamageDealt: number
    largestCriticalStrike: number
    totalDamageDealtToChampions: number
    magicDamageDealtToChampions: number
    physicalDamageDealtToChampions: number
    trueDamageDealtToChampions: number
    totalHeal: number
    totalUnitsHealed: number
    damageSelfMitigated: number
    damageDealtToObjectives: number
    damageDealtToTurrets: number
    visionScore: number
    timeCcingOthers: number
    totalDamageTaken: number
    magicalDamageTaken: number
    physicalDamageTaken: number
    trueDamageTaken: number
    goldEarned: number
    goldSpent: number
    turretKills: number
    inhibitorKills: number
    totalMinionsKilled: number
    neutralMinionsKilled: number
    neutralMinionsKilledTeamJungle: number
    neutralMinionsKilledEnemyJungle: number
    totalTimeCrowdControlDealt: number
    champLevel: number
    visionWardsBoughtInGame: number
    sightWardsBoughtInGame: number
    wardsPlaced: number
    wardsKilled: number
    combatPlayerScore: number
    objectivePlayerScore: number
    perk0: number
    perk0Var1: number
    perk0Var2: number
    perk0Var3: number
    perk1: number
    perk1Var1: number
    perk1Var2: number
    perk1Var3: number
    perk2: number
    perk2Var1: number
    perk2Var2: number
    perk2Var3: number
    perk3: number
    perk3Var1: number
    perk3Var2: number
    perk3Var3: number
    perk4: number
    perk4Var1: number
    perk4Var2: number
    perk4Var3: number
    perk5: number
    perk5Var1: number
    perk5Var2: number
    perk5Var3: number
    perkPrimaryStyle: number
    perkSubStyle: number
    statPerk0: number,
    statPerk0ShortDesc: string,
    statPerk0ImagePath: string,
    statPerk1: number,
    statPerk1ShortDesc: string,
    statPerk1ImagePath: string,
    statPerk2: number,
    statPerk2ShortDesc: string,
    statPerk2ImagePath: string,
    roleRiot: string
    lane: string
}
export interface ParticipantIdentitiesEntity {
    participantId: number
    platformId: string
    accountId: string
    summonerName: string
    summonerId: string
    currentPlatformId: string
    currentAccountId: string
    matchHistoryUri: string
    profileIcon: number
}

export type MatchList = Array<Match>