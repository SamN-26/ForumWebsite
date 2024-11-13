const {attemptConnection} = require('./connect.js')
//connect mongoDB
attemptConnection()

//imports
const express = require('express')
const env = require('dotenv/config')
const cookieParser = require('cookie-parser')
const Authmiddlewares = require('./middlewares/auth.js')

const app = express()

//Middlewares
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(Authmiddlewares.checkForAuthentication)

//app.use(Authentication.checkforA)

//Routes
const studentRouter = require('./routes/students')
const subGroupRouter = require('./routes/subGroup')
const lectureGroupRouter = require('./routes/lectureGroup')
const queryRouter = require('./routes/queries')
const commentRouter = require('./routes/comment.js')


app.use('/student', studentRouter)
app.use('/subgroup', subGroupRouter)
app.use('/lecturegroup', lectureGroupRouter)
app.use('/query', queryRouter)
app.use('/comment', commentRouter)

app.get('/', (req, res) =>{
    res.send('Hello')
})


app.listen(process.env.PORT, () =>{
    console.log('listening on Port : ', process.env.PORT)
})