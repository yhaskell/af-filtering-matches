import { assert } from 'chai'
import { validate } from '../src/lib/validation'


describe('validation', () => {
    it('validates undefined when it not required', () => {
        assert.doesNotThrow(() => validate({ type: Number, required: false, nullable: false }, undefined))
    })

    it('validates undefined when it required', () => {
        assert.throws(() => validate({ type: Number, required: true, nullable: false }, undefined))
    })

    it('validates null when nullable', () => {
        assert.doesNotThrow(() => validate({ type: Number, required: false, nullable: true }, undefined))
    })
    
    it('validates null when not nullable', () => {
        assert.throws(() => validate({ type: Number, required: false, nullable: false }, null))
    })

    it ('validates types when they are correct', () => {
        assert.doesNotThrow(() => validate({ type: Number, required: false, nullable: false }, 5))
    })

    it ('validates types when they are incorrect', () => {
        assert.throws(() => validate({ type: Object, required: false, nullable: false }, 5))
    })

    it('validates lower boundaries for Number', () => {
        assert.throw(() => validate({ type: Number, min: 9 }, 5))
    })

    it('validates NaN when not ok', () => {
        assert.throws(() => validate({ type: Number, canBeNaN: false }, NaN))
    })

    it('validates NaN when ok', () => {
        assert.doesNotThrow(() => validate({ type: Number, canBeNaN: true }, NaN))
    })

    it('validates lower boundaries for Number when ok', () => {
        assert.throws(() => validate({ type: Number, max: 1 }, 5))
    })

    it('validates upper boundaries for Number when not ok', () => {
        assert.doesNotThrow(() => validate({ type: Number, max: 9 }, 5))
    })

    it('validates upper boundaries for Number', () => {
        assert.throw(() => validate({ type: Number, max: 1 }, 5))
    })

    it('validates empty object schema', () => {
        assert.doesNotThrow(() => validate({ type: Object }, {}))
    })

    it('validates unfound key', () => {
        assert.throws(() => validate({ type: Object, fields: { a: { type: Number, required: true }}}, {}))
    })
    
    it('validates unfound key', () => {
        assert.doesNotThrow(() => validate({ type: Object, fields: { a: { type: Number, required: false }}}, {}))
    })

    it('validates primitive fields', () => {
        assert.throws(() => validate({ type: Object, fields: { a: { type: Number, min: 42 }}}, { a: 5}))
        assert.doesNotThrow(() => validate({ type: Object, fields: { a: { type: Number, min: 0 }}}, { a: 5}))
    })

    it('validates subschemas', () => {
        assert.doesNotThrow(() => validate({ type: Object, fields: { a: { type: Object, fields: { a: { type: Number }}}}}, { a: { a: 1 }}))
        assert.throws(() => validate({ type: Object, fields: { a: { type: Object, fields: { a: { type: Object }}}}}, { a: { a: 1 }}))
    })
})