export interface NumberRange {
    $lt?: number
    $gt?: number
    $gte?: number
    $lte?: number
}
export interface MatchFilter {
    has_photo: boolean | null
    in_contact: boolean | null
    is_favourite: boolean | null
    compatibility_score: NumberRange
    age: NumberRange
    height: NumberRange
    distance: number | null
}

class ValidationError extends Error {
    constructor(error: string) { super(`Search query invalid. ${error}`) }
}

/**
 * Checks if value[key] is a boolean or null and returns it
 */
function validateBoolean(value: any, key: string): boolean | null {
    if (value[key] === true || value[key] === false || value[key] === null) return value[key]
    
    throw new ValidationError(`${key} should be a boolean value or null value`)
}
/**
 * Checks if value[key] is a number of null and returns it
 */
function validateNumber(value: any, key: string) {
    if (typeof value[key] == "number" || value[key] === null) return value[key]
    throw new ValidationError(`${key} should be a number or null value`)
}

/**
 * Checks if value is number or null, using required flag to allow or forbid null value.
 * @param value Value to be checked
 * @param required Required flag. If true is passed, than only numbers will be valid.
 */
function isValidNumber(value: any, required: boolean = false) {
    if (value === null) return !required
    return (typeof value === 'number')
}

/**
 * Checks if value[key] is a correct number range. 
 * Options parameter determines if parameters should be required or not.
 * If opts provided, then parameters are required to be in provided range
 */
function validateNumberRange(value: any, key: string, opts?: { from?: number, to?: number}): NumberRange {
    opts = opts || {}
    const incorrectRange = () => new ValidationError(`${key} should be a number range`)
    
    if (typeof value[key] !== "object")
        throw incorrectRange()

    const from = value[key].from
    const to = value[key].to

    if (!isValidNumber(from, opts.from !== undefined )) throw new ValidationError(`${key}.from should be a number`)
    if (!isValidNumber(to, opts.to !== undefined )) throw new ValidationError(`${key}.to should be a number`)
    

    if (opts.from && from < opts.from) throw new ValidationError(`${key}.from should be more than ${opts.from}`)
    if (opts.to && to > opts.to) throw new ValidationError(`${key}.to should be more than ${opts.to}`)

    return { $lt: to, $gt: from }
}

/**
 * Checks if value[key] is a correct age -- 18 to > 99 years old
 */
function validateAge(value: any, key: string) {
    const res = validateNumberRange(value, key, { from: 18 })
    if (res.$lt && res.$lt > 99) throw new ValidationError(`${key}.to should be less than 99`)

    return res
}

/**
 * Checks if value[key] is a correct height -- 135cm to > 210cm
 */
function validateHeight(value: any, key: string) {
    const res = validateNumberRange(value, key, { from: 135 })
    if (res.$lt && res.$lt > 210) throw new ValidationError(`${key}.to should be less than 210`)

    return res
}

function validateCompatibilityScore(value: any, key: string) {
    const res = validateNumberRange(value, key, { from: 1, to: 99 })
    return { 
        $gte: res.$gt ? res.$gt / 100 : undefined, 
        $lte: res.$lt ? res.$lt / 100: undefined 
    }
}


/**
 * Validates input and produces a match filter
 */
export function getMatchFilter(request: any): MatchFilter {
    const res: MatchFilter = {
        compatibility_score:    validateCompatibilityScore(request, 'compatibility_score'),
        is_favourite:           validateBoolean(request, 'is_favourite'),
        in_contact:             validateBoolean(request, 'in_contact'),
        has_photo:              validateBoolean(request, 'has_photo'),
        distance:               validateNumber(request, 'distance'),
        height:                 validateHeight(request, 'height'),
        age:                    validateAge(request, 'age'),
    }

    if (res.distance && (res.distance < 30 || res.distance > 300)) {
        throw new ValidationError('distance should be a number between 30 and 300 or null value')
    }

    return res
}