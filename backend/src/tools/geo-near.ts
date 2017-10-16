import connect from '../db'
import { default as People, Person } from '../db/person'


async function geoNear() {
    connect(false)

    await new Promise(r => setTimeout(r, 1000))
    console.log("Connected to the db. Getting data...")

    const people = await People.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [-4.629179, 55.458565],
                },
                $maxDistance: 600 * 1000,

            }
        }
    })

    console.log(`Got data, ${people.length} records got`)

    for (let person of people) {
        console.log(person.display_name, person.city.name)
    }

}

geoNear().then(() => process.exit(0)).catch((err) => {
    console.error(err)
    process.exit(1)
})
