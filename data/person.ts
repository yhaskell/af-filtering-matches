export interface Person {
    _id?: string
    display_name: string
    age: number
    job_title: string
    height_in_cm: number
    city: {
        name: string
        lat: number
        lon: number
    },
    location: [number, number]
    main_photo: string
    compatibility_score: number
    contacts_exchanged: number
    favourite: boolean
    religion: string
}

export interface FilterNumberInterval {
    from: number | null
    to: number | null
}

export interface Location {
    lat: number
    lon: number
}

export interface MatchFilter {
    compatibility_score: FilterNumberInterval
    height: FilterNumberInterval
    age: FilterNumberInterval
    distance: number | null
    is_favourite: boolean | null
    in_contact: boolean | null
    has_photo: boolean | null

    location?: Location
}