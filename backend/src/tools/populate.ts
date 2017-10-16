import connectToDb from '../db'

import { default as People, Person } from '../db/person'

async function populate() {
    console.log("Connecting to DB...")
    connectToDb()
    console.log("Populating matches...")

    // await People.remove({})

    const { matches }: { matches: Person[] } = require('../../../data/matches.json')
    const mm = matches.map((u: Person) => ({...u, location: [u.city.lon, u.city.lat]}))
    const result = await People.insertMany(mm)
    console.log('Done.')
}


populate().then(() => process.exit(0))