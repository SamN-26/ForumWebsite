const env = require('dotenv/config')
const uri = process.env.mongoURL;
const mongoose = require('mongoose')

async function connectToMongo() {
  return mongoose.connect(uri)  
}

module.exports = {connectToMongo}