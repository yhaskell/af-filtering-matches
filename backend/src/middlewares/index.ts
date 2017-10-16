import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyparser from 'body-parser'

import { errorGuard } from './error-guard'
import processError from './process-error'

import * as config from '../config'

export function configureMiddlewares(app: express.Application) {
    if (config.env !== 'test')
        app.use(morgan('dev'))
    
    app.use(express.static('static'))
    app.use(bodyparser.json())
}

export function configureErrorMiddlewares(app: express.Application) {
    app.use(errorGuard(processError))
}