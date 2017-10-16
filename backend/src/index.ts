import * as express from 'express'
import * as config from './config'

import { configureErrorMiddlewares, configureMiddlewares } from './middlewares'
import { configureRoutes } from './routes'

import connectToDb from './db'

const app = express()

configureMiddlewares(app)
configureRoutes(app)
configureErrorMiddlewares(app)

export const dbConnection = connectToDb()


export function start() {
    return app.listen(
        config.port, 
        config.hostname, 
        () => console.log(config.startMessage)
    )
}

if (config.env !== 'test') start()

export default app