import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

//asyncstorage fake little db. getting calendar data.
export function fetchCalendarResults () {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}


//to make entry into local async storage on phone and merge it into existing storage
export function submitEntry ({ entry, key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

//to remove, first get everything at that location, then parse it, then delete it, then reset local storage
export function removeEntry (key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}