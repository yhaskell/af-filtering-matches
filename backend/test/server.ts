import { assert } from 'chai'
import * as request from 'supertest'

import app from '../src'
import * as server from './supertest'

describe('GET /api/matches', () => {
    it('returns 25 entries', async () => {
        const res = await server.get('/api/matches')

        assert.equal(res.status, 200)
        assert.equal(res.body.status, 200)
        assert.equal(res.body.payload.length, 25)
    })
})

describe('GET /api/matches/:id', () => {
    it('returns one entry when existing id is provided', async () => {
        const res = await server.get('/api/matches/59e0df951b480e2b7c44590c')

        assert.equal(res.body.status, 200)
        assert.equal(res.body.payload.length, 1)
        assert.equal(res.body.payload[0]._id, '59e0df951b480e2b7c44590c')
    })

    it('returns 404 when id is correct but inexistent', async () => {
        const res = await server.get('/api/matches/59e0d92373480e2b7c44590c')

        assert.equal(res.status, 404)
        assert.equal(res.body.status, 404)
        assert.equal(res.body.message, 'Match not found')
    })

    it('returns 400 when incorrect id is provided', async () => {
        const res = await server.get('/api/matches/johnwatson')

        assert.equal(res.status, 400)
        assert.equal(res.body.status, 400)
        assert.equal(res.body.message, 'Incorrect Id format')
    })
})

describe('POST /api/matches', () => {
    it('returns 400 when no body is passed', async () => {
        const res = await server.post('/api/matches', undefined)

        assert.equal(res.body.status, 400)
    })
    it('returns 400 when query is empty', async () => {
        const res = await server.post('/api/matches', {})

        assert.equal(res.body.status, 400)
    })

    it('returns 400 when query is incorrect', async () => {

        const query = {
            "compatibility_score": null,
            "is_favourite": null,
            "in_contact": null,
            "has_photo": null,
            "distance": null,
            "height": {
                "from": null,
                "to": null
            },
            "age": {
                "from": null,
                "to": null
            },
            "location": {
                "lon": 0,
                "lat": 0
            }

        }

        const res = await server.post('/api/matches', query)

        assert.equal(res.body.status, 400)
    })

    const defaultQuery = {
        "compatibility_score": {
            "from": 1,
            "to": 99
        },
        "is_favourite": null,
        "in_contact": null,
        "has_photo": null,
        "distance": null,
        "height": {
            "from": 135,
            "to": null
        },
        "age": {
            "from": 18,
            "to": null
        },
        "location": {
            "lon": 0,
            "lat": 0
        }

    }

    it('should return all entries when all filters are maximal', async () => {

        const query = defaultQuery

        const res = await server.post('/api/matches', query)

        assert.equal(res.body.status, 200)
        assert.equal(res.body.payload.length, 25)
    })

    describe('should filter by', () => {
        it('compatibility_score', async () => {
            const query = {
                ...defaultQuery, compatibility_score: {
                    from: 50,
                    to: 70
                }
            }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 1)
        })
        it('is_favourite', async () => {
            const query = { ...defaultQuery, is_favourite: true }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 6)
        })
        it('in_contact', async () => {
            const query = { ...defaultQuery, in_contact: true }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 12)
        })
        it('has_photo', async () => {
            const query = { ...defaultQuery, has_photo: true }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 22)
        })

        it('distance', async () => {
            const query = { ...defaultQuery, distance: 300, location: { lon: 0, lat: 50 } }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 18)
        })

        it('height', async () => {
            const query = {
                ...defaultQuery, height: {
                    from: 160,
                    to: 190
                }
            }


            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 12)
        })

        it('age', async () => {
            const query = {
                ...defaultQuery, age: {
                    from: 25,
                    to: 40
                }
            }

            const res = await server.post('/api/matches', query)

            assert.equal(res.body.status, 200)
            assert.equal(res.body.payload.length, 14)
        })
    })
})