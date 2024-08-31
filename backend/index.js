const express = require('express')
const env = require('dotenv/config')
const {connectToMongo} = require('./connect.js')

const app = express()

//connect mongoDB
connectToMongo()
.then(() => {console.log('MongoDB connected')})
.catch((err) => {console.log('Error : ', err)})

//Middlewares


//Routes
app.get('/', (req, res) =>{
    res.send('Hello')
})


app.listen(process.env.PORT, () =>{
    console.log('listening on Port : ', process.env.PORT)
})