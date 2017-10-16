import * as mongoose from 'mongoose'
import * as config from '../config'
import * as log from '../lib/logger'

export default function connect(toLog: boolean = true) {
  (<any>mongoose).Promise = global.Promise

  mongoose.connect(config.dbUrl, {
    useMongoClient: true
  });

  const db = mongoose.connection;

  db.on('error', (err: Error) => {
    console.error(err)
    if (toLog) { 
      log.fatal(err.message, { type: 'mongo' })
      process.exit(1) 
    } 
  })

  return db
}