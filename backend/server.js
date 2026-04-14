import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import cors from 'cors'
import { connectDB } from './database/database.js'
import router from './router/authRouter.js'
import passwordRouter from './router/passwordRouter.js'


const app = express()
const PORT = 4000
app.use(express.json())
app.use(cookieParser())
const allOrigins = ['http://localhost:5174', 'http://localhost:5173']
app.use(cors({origin: allOrigins ,credentials : true}))
app.get('/', (req, res)=>{
    res.send('Hello')
})

app.use('/user/auth', router)
app.use('/user/password', passwordRouter)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
})