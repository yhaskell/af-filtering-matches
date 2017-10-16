import * as express from 'express'
import * as matches from './matches'

const catchAsyncErrors = (fn: Function) => (...args: any[]) => fn(...args).catch(args[2]);

export function configureRoutes(app: express.Application) {
    // app.get('/api/always-fail', (req, rsp) => {
    //     throw new Error('This should always fail')
    // })

    app.get('/api/matches', catchAsyncErrors(matches.getAll))
    app.post('/api/matches', catchAsyncErrors(matches.bySearchTerms))
    app.get('/api/matches/:id', catchAsyncErrors(matches.byId))

}
