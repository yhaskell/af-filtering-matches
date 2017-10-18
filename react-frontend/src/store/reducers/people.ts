import { Person } from '../../data/person'
import { Action } from 'redux'

interface FetchPeople extends Action {
    type: 'FETCH_PEOPLE_SUCCESS'
    payload: Person[]
}

export type PeopleAction = FetchPeople

export default (state: Person[] = [], action: PeopleAction) => {
    switch (action.type) {
        case 'FETCH_PEOPLE_SUCCESS':
            return action.payload

        default:
            return state
    }
}
