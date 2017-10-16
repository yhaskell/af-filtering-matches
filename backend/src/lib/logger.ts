import * as log from 'winston'
import * as config from '../config'

try {
    if (config.env !== 'test') log.add(log.transports.File, { filename: config.logfile })
    log.remove(log.transports.Console)
} catch (e) {}

export const fatal = log.error
export const error = log.error
export const warn = log.warn
export const info = log.info