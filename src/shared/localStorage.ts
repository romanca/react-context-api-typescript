export function getLsItem(key: string, defaultValue?: any) {
    const foundItem = localStorage.getItem(key)
    if (foundItem) {
        try {
            return JSON.parse(foundItem)
        }
        catch (e) {
            return foundItem
            // The JSON was invalid, `e` has some further information
        }
    }
    return defaultValue;
}

export function setLsItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function updateLsItem(key: string, setterMethod: (...args: any[]) => any, initial: any) {
    const foundItem = getLsItem(key)
    const updated = setterMethod(foundItem || initial)
    setLsItem(key, updated)
}