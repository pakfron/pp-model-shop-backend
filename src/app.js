require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const authRoute = require('./route/auth-route')
const { pathNotFound } = require('./middlewares/not-found')
const middlewareError = require('./middlewares/error')
app.use(express.json())

app.use(cors())
app.use('/auth',authRoute)

app.use(pathNotFound)
app.use(middlewareError)
const PORT = process.env.PORT || 8888
app.listen(PORT,()=>console.log('run port: '+PORT))