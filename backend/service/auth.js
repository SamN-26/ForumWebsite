const jwt = require('jsonwebtoken');
const env = require('dotenv/config')
const key = process.env.key

const setUser = (payload) =>{
    return jwt.sign(payload, key);
}

const getUser = (token) =>{
    if(!token) return null;
    try{
        return jwt.verify(token, key);
    }
    catch(error)
    {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}