import { Response } from 'express'

export function error(rsp: Response, status: number, message: string) {
    rsp.status(status).json({
        status,
        message
    })
}

export function success<R>(rsp: Response, payload: R) {
    rsp.status(200).json({
        status: 200,
        payload
    })
}