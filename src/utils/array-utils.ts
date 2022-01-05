export const peek = (arr:any) => {
    return arr[0]
}

export const getValueOrDefaultFromObject = (obj: { [key: string]: string }, name?: string|number) => {
    if(name) {
        name = String(name)
    } else {
        name = 'default'
    }

    return obj[name]
}