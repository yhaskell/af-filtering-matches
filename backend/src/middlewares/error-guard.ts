import * as express from 'express'
import * as log from '../lib/logger'

export function errorGuard(processError: (err: Error) => any) {
    return (err: Error, req: express.Request, rsp: express.Response, next: express.NextFunction) => {
        log.error(err.message, { url: req.url, stack: err.stack })

        return rsp.status(500)
            .json(processError(err))
    }
}
