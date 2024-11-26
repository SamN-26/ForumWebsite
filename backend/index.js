const {attemptConnection} = require('./connect.js')
//connect mongoDB
attemptConnection()

//imports
const path = require('path')
const express = require('express')
const env = require('dotenv/config')
const cookieParser = require('cookie-parser')
const Authmiddlewares = require('./middlewares/auth.js')

const app = express()

//view Engine 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cookieParser())
app.use(Authmiddlewares.checkForAuthentication)
app.use(express.static(path.join(__dirname, 'public')));

//Routes
const studentRouter = require('./routes/students')
const subGroupRouter = require('./routes/subGroup')
const lectureGroupRouter = require('./routes/lectureGroup')
const queryRouter = require('./routes/queries')
const commentRouter = require('./routes/comment.js')
const staticRouter = require('./routes/staticrouter.js')
const adminRouter = require('./routes/admin.js')
const apiRouter = require('./routes/api.js')
const { stat } = require('fs/promises')


app.use('/api', apiRouter)
app.use('/student', studentRouter)
app.use('/subgroup', Authmiddlewares.restrictTo, subGroupRouter)
app.use('/lecturegroup', Authmiddlewares.restrictTo, lectureGroupRouter)
app.use('/query', Authmiddlewares.restrictTo, queryRouter)
app.use('/comment', Authmiddlewares.restrictTo, commentRouter)
app.use('/admin', Authmiddlewares.restrictToAdmin ,adminRouter)
app.use('/', staticRouter)


app.listen(process.env.PORT, () =>{
    console.log('listening on Port : ', process.env.PORT)
})