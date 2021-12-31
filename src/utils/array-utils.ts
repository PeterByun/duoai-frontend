export const peek = (arr:any) => {
    return arr[0]
}

export const getValueOrDefaultFromMap = <V> (map: Map<string, V>, name?: string | number) => {
    if(name) {
        name = String(name)
    } else {
        name = 'default'
    }

    return map.get(name) ?? 'default'
}