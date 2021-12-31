export const numToPx = (num:number):string => {
    return `${num}px`
}

export const capitalize = (val: string): string => {
    return val ? val[0].toUpperCase() + val.substring(1) : ''
}

export const pathToName = (path: string): string => {
    const pathSplited = path.split('/')
    return pathSplited[pathSplited.length-1].split('.')[0] ?? pathSplited[pathSplited.length]
}

export const toPercentage = (ratio: number): string => {
    if(typeof ratio !== 'number' || ratio < 0) return '0%'

    const length = Math.floor(ratio).toString().length

    if(length === 1) {
        return `${Math.floor(ratio * 100)}%`
    } else if(length === 2) {
        return `${Math.floor(ratio)}%`
    } else {
        return '100%'
    }
}

export const formatKda = (kdaData: {
    kills: number,
    deaths: number,
    assists: number
}): {
    formattedKda: string,
    kdaRatio: string
} => {
    let kdaRatio = (kdaData.kills && kdaData.deaths && kdaData.assists)  ? ((kdaData.kills + kdaData.assists) / kdaData.deaths).toFixed(1) : '0'
    if(String(kdaRatio).endsWith('.0')) kdaRatio = kdaRatio.replace('.0', '')

    return {
        formattedKda: `${kdaData.kills} / ${kdaData.deaths} / ${kdaData.assists}`,
        kdaRatio
    }
}

export const getHowOldFromNow = (oldDateSecs: number|string) => {
    const now = new Date()
    const oldDate = new Date(Number(oldDateSecs))

    let howOld = ''

    if(now.getFullYear() > oldDate.getFullYear()) howOld += `${now.getFullYear() - oldDate.getFullYear()}년 `
    if(now.getMonth() > oldDate.getMonth()) howOld += `${now.getMonth() - oldDate.getMonth()}개월 `
    if(now.getDate() > oldDate.getDate()) howOld += `${now.getDate() - oldDate.getDate()}일 `

    return howOld + '전'
}

export const getStreakMessage = (streakInfo: string) => {
    return streakInfo === 'win' ? '연승 🔥' : `연패 💧`
}