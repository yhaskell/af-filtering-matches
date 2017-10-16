import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { default as People, Person } from '../db/person'
import { validateFilter, setFilters, setDistanceFilter } from '../filter'
import * as response from './response'
import * as log from '../lib/logger'


/**
 * Returns all matches that are available in the DB
 */
export const getAll: RequestHandler = async (req, rsp, next) => {
    const people = await People.find()

    response.success(rsp, people)
}

/**
 * Returns one match that corresponds to the Id specified 
 */
export const byId: RequestHandler = async (req, rsp, next) => {
    const id = req.params.id

    if (!Types.ObjectId.isValid(id))
        return response.error(rsp, 400, "Incorrect Id format")

    const person = await People.findById(id)

    return person != null
        ? response.success(rsp, [person])
        : response.error(rsp, 404, "Match not found")
}

/**
 * Returns the list of matches that actually match the search terms.
 * We have the following parameters that we have to check:
 * Has photo	        Boolean
 * In contact	        Boolean
 * Favourite	        Boolean
 * Compatibility Score  Range from 1% to 99%
 * Age                  Range from 18 years old until > 95 years old
 * Height               Range from 135cm to > 210cm
 * Distance in km       Single selection: lower bound < 30 km, upper bound > 300 km
 */
export const bySearchTerms: RequestHandler = async (req, rsp, next) => {
    if (!req.body || typeof req.body !== "object")
        return response.error(rsp, 400, "No query provided")


    try {

        const filter = validateFilter(req.body)
        
        const queryWithFilters = setFilters(filter)

        if (filter.distance !== null) 
            setDistanceFilter(queryWithFilters, filter.distance, req.body.location)

        
        const people = await queryWithFilters.exec()

        return response.success(rsp, people)

    } catch (err) {
        log.error(err.message, { url: req.url })
        return response.error(rsp, 400, err.message)
    }

}