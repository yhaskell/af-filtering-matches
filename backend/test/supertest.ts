import { Server } from 'http'
import * as express from 'express'
import * as request from 'supertest'

import { default as app, dbConnection } from '../src'

let server: Server

// close DB connection after tests are finished
after(() => dbConnection.close())

/**
 * Test rig. It accepts url and method, and returns a promise to returned data
 * @param app express application to test
 */
export const get = (url: string) => new Promise<request.Response>(
    (ok, fail) => request(app).get(url).end((err, data) => {
        if (err) fail(err)
        ok(data)
    })
)
export const post = (url: string, body: any) => new Promise<request.Response>(
    (ok, fail) => request(app).post(url).send(body).end((err, data) => {
        if (err) fail(err)
        ok(data)
    })
)
