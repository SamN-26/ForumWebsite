const {attemptConnection} = require('./connect.js')

//connect mongoDB
attemptConnection()

const express = require('express')
const env = require('dotenv/config')

const app = express()

//Middlewares
app.use(express.urlencoded({extended : true}))

//Routes
const studentRouter = require('./routes/students')
const subGroupRouter = require('./routes/subGroup')
const lectureGroupRouter = require('./routes/lectureGroup')
const queryRouter = require('./routes/queries')

app.use('/student', studentRouter)
app.use('/subgroup', subGroupRouter)
app.use('/lecturegroup', lectureGroupRouter)
app.use('/query', queryRouter)

app.get('/', (req, res) =>{
    res.send('Hello')
})


app.listen(process.env.PORT, () =>{
    console.log('listening on Port : ', process.env.PORT)
})