import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

//key in object is specific day with metrics for each given day
function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,  //want to keep state as it is
                ...action.entries  //but also merge the entries on to it
            }
        case ADD_ENTRY: 
            return {
                ...state,
                ...action.entry
            }
        default: 
            return state
    }
}

export default entries;