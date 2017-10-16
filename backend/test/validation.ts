import { assert } from 'chai'
import { validate } from '../src/lib/validation'


describe('validation', () => {
    it('validates undefined when it not required', () => {
        assert.doesNotThrow(() => validate(undefined, { type: Number, required: false, nullable: false }))
    })

    it('validates undefined when it required', () => {
        assert.throws(() => validate(undefined, { type: Number, required: true, nullable: false }))
    })

    it('validates null when nullable', () => {
        assert.doesNotThrow(() => validate(undefined, { type: Number, required: false, nullable: true }))
    })
    
    it('validates null when not nullable', () => {
        assert.throws(() => validate(null, { type: Number, required: false, nullable: false }))
    })

    it ('validates types when they are correct', () => {
        assert.doesNotThrow(() => validate(5, { type: Number, required: false, nullable: false }))
    })

    it ('validates types when they are incorrect', () => {
        assert.throws(() => validate(5, { type: Object, required: false, nullable: false }))
    })

    it('validates lower boundaries for Number', () => {
        assert.throw(() => validate(5, { type: Number, min: 9 }))
    })

    it('validates NaN when not ok', () => {
        assert.throws(() => validate(NaN, { type: Number, canBeNaN: false }))
    })

    it('validates NaN when ok', () => {
        assert.doesNotThrow(() => validate(NaN, { type: Number, canBeNaN: true }))
    })

    it('validates lower boundaries for Number when ok', () => {
        assert.throws(() => validate(5, { type: Number, max: 1 }))
    })

    it('validates upper boundaries for Number when not ok', () => {
        assert.doesNotThrow(() => validate(5, { type: Number, max: 9 }))
    })

    it('validates upper boundaries for Number', () => {
        assert.throw(() => validate(5, { type: Number, max: 1 }))
    })

    it('validates empty object schema', () => {
        assert.doesNotThrow(() => validate({}, { type: Object }))
    })

    it('validates unfound key', () => {
        assert.throws(() => validate({}, { type: Object, fields: { a: { type: Number, required: true }}}))
    })
    
    it('validates unfound key', () => {
        assert.doesNotThrow(() => validate({}, { type: Object, fields: { a: { type: Number, required: false }}}))
    })

    it('validates primitive fields', () => {
        assert.throws(() => validate({ a: 5}, { type: Object, fields: { a: { type: Number, min: 42 }}}))
        assert.doesNotThrow(() => validate({ a: 5}, { type: Object, fields: { a: { type: Number, min: 0 }}}))
    })

    it('validates subschemas', () => {
        assert.doesNotThrow(() => validate({ a: { a: 1 }}, { type: Object, fields: { a: { type: Object, fields: { a: { type: Number }}}}}))
        assert.throws(() => validate({ a: { a: 1 }}, { type: Object, fields: { a: { type: Object, fields: { a: { type: Object }}}}}))
    })
})