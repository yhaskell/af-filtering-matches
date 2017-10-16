import { NumberValidateable, ObjectValidateable, validate } from './lib/validation'
import { default as People, PersonQuery } from './db/person'

const NumberInterval = (from: NumberValidateable, to: NumberValidateable): ObjectValidateable => ({
    type: Object,
    required: true,
    nullable: false,
    fields: {
        from,
        to
    }
})

const RequiredBoolean = { type: Boolean, required: true }

interface FilterNumberInterval {
    from: number | null
    to: number | null
}

interface Location {
    lat: number
    lon: number
}

export interface ValidationFilter {
    compatibility_score: FilterNumberInterval
    height: FilterNumberInterval
    age: FilterNumberInterval
    distance: number | null
    is_favourite: boolean | null
    in_contact: boolean | null
    has_photo: boolean | null
}

const ValidationSchema = {
    type: Object,
    fields: {
        compatibility_score: NumberInterval(
            { type: Number, nullable: true, required: true, min: 1 },
            { type: Number, nullable: true, required: true, max: 99 }),
        height: NumberInterval(
            { type: Number, nullable: true, required: true, min: 135 },
            { type: Number, nullable: true, required: true, max: 210 }),
        age: NumberInterval(
                { type: Number, nullable: true, required: true, min: 18 },
                { type: Number, nullable: true, required: true, max: 99 }),
        distance: { type: Number, nullable: true, required: true },
        is_favourite: RequiredBoolean,
        in_contact: RequiredBoolean,
        has_photo: RequiredBoolean,
    }
}

export function validateFilter(filter: any): ValidationFilter {
    validate(ValidationSchema, filter)
    return filter
}



export function setFilters(filter: ValidationFilter) {
    const query = People.find()

   if (filter.has_photo !== null) setHasPhoto(query, filter.has_photo)
   if (filter.in_contact !== null) setInContact(query, filter.in_contact)
   if (filter.is_favourite !== null) setIsFavourite(query, filter.is_favourite)

   setCompatibilityScoreFilter(query, filter.compatibility_score)
   setIntervalFilter(query, 'age', filter.age)
   setIntervalFilter(query, 'height_in_cm', filter.height)

    return query
}

function setHasPhoto(query: PersonQuery, has_photo: boolean) {
    if (has_photo)
        query.where('main_photo').ne(null)
    else 
        query.where('main_photo', null)
}

function setInContact(query: PersonQuery, in_contact: boolean) {
    if (in_contact)
        query.where('contacts_exchanged').gt(0)
    else
        query.where('contacts_exchanged').equals(0)
}

function setIsFavourite(query: PersonQuery, is_favourite: boolean) {
    query.where('favourite', is_favourite)
}

function setCompatibilityScoreFilter(query: PersonQuery, value: FilterNumberInterval) {
    setIntervalFilter(
        query, 
        'compatibility_score', 
        { 
            from: value.from && value.from / 100, 
            to: value.to && value.to / 100 
        }
    )
}

function setIntervalFilter(query: PersonQuery, field: string, value: FilterNumberInterval) {
    if (value.from)
        query.where(field).gte(value.from)
    if (value.to)
        query.where(field).lte(value.to)
}

export function setDistanceFilter(query: PersonQuery, distance: number, location: Location) {
    const { lat, lon } = location

    query.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lon, lat],
                },
                $maxDistance: distance * 1000,
            }
        }
    })
}