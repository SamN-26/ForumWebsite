const mongoose = require('mongoose')
const helper = require('../helper')

const lectureGroupSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    subGroup : {
        type : [String],       
    },

    cr : {
        type : String,
    },
    name : {
        type : String, 
    },
    branch : {
        type : String,
    },
    passoutYear : {
        type : Number,
    }
})

const lectureGroup = mongoose.model('lectureGroup', lectureGroupSchema)
module.exports = lectureGroup