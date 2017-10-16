/**
 * Parse a string value (or undefined) to a number.
 * Instead of default behaviour of parseInt, returns undefined instead of NaN when number isn't parsed.
 * 
 * @param value Value to parse.
 */
export default function (value?: string) {
    if (typeof value !== 'string') return undefined
    
    const number = parseInt(value)
    if (isNaN(number)) return undefined

    return number
}