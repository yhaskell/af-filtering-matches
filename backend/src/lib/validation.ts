export interface Validateable {
    type: any
    required?: boolean
    nullable?: boolean
}

export interface NumberValidateable extends Validateable {
    canBeNaN?: boolean
    min?: number
    max?: number
}

export interface ObjectValidateable extends Validateable {
    fields: {
        [key: string]: Validateable
    }
}

export class ValidationError extends Error {
    static create(message: string, field?: string) {
        return new ValidationError(`Validation failed: ${field + ':' || ''} ${message}`)
    }
}

export abstract class Validator<V extends Validateable> {
    constructor(protected type: V) { }
    validate(value: any, key?: string) {
        if (value === undefined) {
            if (this.type.required === true)
                throw ValidationError.create(key ? 'cannot be undefined' : 'expected value, got undefined', key)
        }
        else if (value === null) {
            if (this.type.nullable === false)
                throw ValidationError.create(key ? 'cannot be null' : 'expected value, got null', key)
        } else {
            this.validateType(value, key)
            this.validateValue(value, key)
        }
    }

    abstract validateType(value: any, key?: string): void
    abstract validateValue(value: any, key?: string): void
}

export class NumberValidator extends Validator<NumberValidateable> {
    constructor(type: NumberValidateable) { super(type); }

    validateType(value: any, key?: string) {
        if (typeof value !== 'number')
            throw ValidationError.create(key ? 'must be a number' : `expected number, got ${value}`, key)
    }
    validateValue(value: any, key?: string) {

        if (this.type.canBeNaN === false && isNaN(value))
            throw ValidationError.create('cannot be NaN', key)

        if (typeof this.type.max === 'number' && value > this.type.max)
            throw ValidationError.create(`should be no greater then ${this.type.max}`, key)

        if (typeof this.type.min === 'number' && value < this.type.min)
            throw ValidationError.create(`should be no less then ${this.type.max}`, key)
    }
}


export class BooleanValidator extends Validator<Validateable> {
    constructor(type: Validateable) { super(type); }

    validateType(value: any, key?: string) {
        if (typeof value !== 'boolean')
            throw ValidationError.create(key ? 'must be a boolean' : `expected boolean, got ${value}`, key)
    }
    validateValue(value: any, key?: string) {}
}

const validators = new Map<any, new (type: Validateable) => Validator<any>>()

export function registerValidator<P extends Validateable>(type: any, validator: new (type: Validateable) => Validator<P>) {
    validators.set(type, validator)
}


export function validate<P extends Validateable>(value: any, schema: P) {
    const UValidator = validators.get(schema.type)
    if (!UValidator) {
        throw new ValidationError(`Don't have validator for ${schema.type}`)
    }
    (new UValidator(schema)).validate(value)
}

export class ObjectValidator extends Validator<ObjectValidateable> {
    validateType(value: any, key?: string) {
        if (typeof value !== 'object')
            throw ValidationError.create(key ? 'must be an object' : `expected object, got ${value}`, key)
    }
    validateValue(value: any, key?: string): void {
        if (!this.type.fields) return

        for (const field of Object.keys(this.type.fields)) {
            validate(value[field], this.type.fields[field])
        }
    }

}

registerValidator(Number, NumberValidator)
registerValidator(Object, ObjectValidator)
registerValidator(Boolean, BooleanValidator)
