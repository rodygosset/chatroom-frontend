export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeEachWord = (str: string) => {
    return str.split(' ').map(capitalizeFirstLetter).join(' ')
}

export const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


export const getUIDate = (dateISO?: string) => {
    if(!dateISO) return ""
    const dateString = new Date(dateISO).toLocaleDateString('en-us', dateOptions)
    return capitalizeEachWord(dateString)
}