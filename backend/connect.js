const env = require('dotenv/config')
const uri = process.env.mongoURL;
const mongoose = require('mongoose')

async function connectToMongo() {
  console.log('Attempting connection to mongo...')
  return mongoose.connect(uri)
}

async function attemptConnection(){
  connectToMongo()
  .then( () => {console.log('Connected to Mongo')})
  .catch((err) => {
  console.log('Error on Connecting to mongo')
  console.log('Retrying ...')
  setTimeout(attemptConnection, 1000);
  }) 
}

module.exports = {attemptConnection}
