import * as path from 'path'
import betterParseInt from '../lib/better-parse-int'
import serverStartMessage from './server-start-message'
const { PORT, HOSTNAME, NODE_ENV, LOGFILE, MONGOURL } = process.env


const DEFAULT_PORT = 8274
const DEFAULT_HOSTNAME = 'localhost'
const DEFAULT_ENV = 'development'
const DEFAULT_LOGFILE = path.resolve(__dirname, '../..', 'error.log')
const DEFAULT_MONGOURL = 'mongodb://localhost/matches'

/**
 * Port number app will host on
 */
export const port = betterParseInt(PORT) || DEFAULT_PORT
/**
 * Hostname app will host on
 */
export const hostname = HOSTNAME || DEFAULT_HOSTNAME
/**
 * Process environment
 */
export const env = NODE_ENV || DEFAULT_ENV
/**
 * Error Log file path
 */
export const logfile = LOGFILE || DEFAULT_LOGFILE

/**
 * Database connection URL (MongoDB)
 */
export const dbUrl = MONGOURL || DEFAULT_MONGOURL

/**
 * Server start message
 */
export const startMessage = serverStartMessage(hostname, port, env)
