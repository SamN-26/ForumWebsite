const mongoose = require('mongoose')

const lectureGroupSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    members : [{
        subGroup : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'subGroup',
        },
        students : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'students'
        },
        _id : false,
    }],
    cr : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student'
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