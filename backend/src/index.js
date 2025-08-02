import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
  path: './.env'
})

connectDB()
  .then(() => {
    app.on('error', err => {
      console.log('ERRRR', err)
      throw error
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :http://${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log('MONGO db connection failed !', err)
  })
