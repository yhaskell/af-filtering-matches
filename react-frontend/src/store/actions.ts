import { City } from './reducers/location'
import { MatchFilter, Person } from '../data/person'
import { State } from './reducers'
import { Dispatch } from 'redux'

interface Success<P> {
    status: 200
    payload: P
}

interface Error {
    status: 400 | 404 | 500
    message: string
}

export type Response<P> = Success<P> | Error

export const getPeople = () => async (dispatch: Dispatch<State>) => {
    try {
        const result: Response<Person[]> = await fetch('/api/matches').then(data => data.json())
        if (result.status === 200) {
            dispatch({
                type: 'FETCH_PEOPLE_SUCCESS',
                payload: result.payload
            })
        } else {
            throw new Error(result.message)
        }
    } catch (err) {
        dispatch({
            type: 'FETCH_PEOPLE_ERROR',
            message: err.message
        })
    }
}

export const setFilter = (filter: MatchFilter) => ({
    type: 'SET_FILTER',
    payload: filter
})
export const filterPeople = (filter: MatchFilter) => async (dispatch: Dispatch<State>, getState: () => State) => {
    try {
        let current = getState().location
        
        const locationOk = (!!current || filter.distance === null)

        const location = current ? { lat: current.lat, lon: current.lon } : null

        const result: Response<Person[]> = await fetch(
            '/api/matches',
            {
                body: JSON.stringify({
                    ...filter,
                    location,
                    distance: locationOk ? filter.distance : null
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(data => data.json())
        if (result.status === 200) {
            dispatch({
                type: 'FETCH_PEOPLE_SUCCESS',
                payload: result.payload
            })
            if (locationOk) {
                dispatch(setFilter(filter))
            } else {
                dispatch(setFilter({ ...filter, distance: null }))
                throw new Error('Error: cannot filter by distance without location selected')
            }
        } else {
            throw new Error(result.message)
        }
    } catch (err) {
        dispatch({
            type: 'FETCH_PEOPLE_ERROR',
            message: err.message
        })
    }
}

export const setLocation = (location: City) => ({
    type: 'SET_LOCATION',
    payload: location
})