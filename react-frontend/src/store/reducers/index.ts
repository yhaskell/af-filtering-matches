import { combineReducers } from 'redux'

import { location, locations, City } from './location'
import { MatchFilter, Person } from '../../data/person'
import people from './people'
import filter from './filter'
import error from './error'

export interface State {
    people: Person[]
    location: City
    locations: City[]
    filter: MatchFilter | null,
    error: string | null
}

export default combineReducers({
    people,
    location,
    locations,
    filter,
    error
})