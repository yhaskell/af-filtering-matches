import { Action } from '../action'
import { MatchFilter } from '../../data/person'

const defaultFilter: MatchFilter = {
    age: { from: 18, to: null },
    compatibility_score: { from: 1, to: 99},
    distance: null,
    has_photo: null,
    height: { from: 135, to: null },
    in_contact: null,
    is_favourite: null
}

export default (state: MatchFilter = defaultFilter, action: Action<'SET_FILTER', MatchFilter>) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}