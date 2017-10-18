import { Person } from '../../data/person'
import { Action } from '../action'

export interface City {
    name: string
    lat: number
    lon: number

}

export const location = (state: City | null = null, action: Action<'SET_LOCATION', City>) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return action.payload
        default:
            return state
    }
}

export const locations = (state: City[] = [], action: Action<'FETCH_PEOPLE_SUCCESS', Person[]>) => {
    switch (action.type) {
        case 'FETCH_PEOPLE_SUCCESS':
            return Array.from(new Map(
                action.payload.map(
                    ({ city }) => <[string, City]> [city.name, city]
                ).concat(state.map(
                    city =>  <[string, City]> [city.name, city]
                ))
            ).values())
        default:
            return state
    }
}