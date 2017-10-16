import { Document, Schema, model, DocumentQuery } from 'mongoose'
import { Person } from '../../../data/person'
export { Person } from '../../../data/person'

const PersonSchema = new Schema({
    display_name: String,
    age: Number,
    job_title: String,
    height_in_cm: Number,
    city: {
        name: String,
        lat: Number,
        lon: Number
    },
    location: {
        type: [Number],
        index: '2dsphere'
    },
    main_photo: String,
    compatibility_score: Number,
    contacts_exchanged: Number,
    favourite: Boolean,
    religion: String
})

export type PersonDocument = Person & Document
export type PersonQuery = DocumentQuery<PersonDocument[], PersonDocument>

export default model<Person & Document>("People", PersonSchema, "people")
