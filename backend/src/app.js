import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(express.static('public'))
app.use(cookieParser())

// Routes import
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

//Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

export { app }
