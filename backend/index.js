const {connectToMongo} = require('./connect.js')

//connect mongoDB
connectToMongo()
.then(() => {console.log('MongoDB connected')})
.catch((err) => {console.log('Error : ', err)})

const express = require('express')
const env = require('dotenv/config')

const app = express()

//Middlewares
app.use(express.urlencoded({extended : true}))

//Routes
const studentRouter = require('./routes/students')
const subGroupRouter = require('./routes/subGroup')

app.use('/student', studentRouter)
app.use('/subgroup', subGroupRouter)

app.get('/', (req, res) =>{
    res.send('Hello')
})


app.listen(process.env.PORT, () =>{
    console.log('listening on Port : ', process.env.PORT)
})