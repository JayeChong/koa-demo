import mongoose from 'mongoose'
import config from '../config'
require('./schema/info')
require('./schema/student')
// 链接mongodb
export const database = () => {
  mongoose.set('debug', true)

  // 版本问题
  mongoose.Promise = global.Promise;
  mongoose.connect(config.dbPath, {
    // 版本问题
    useMongoClient: true,
  })

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.dbPath)
  })
}
