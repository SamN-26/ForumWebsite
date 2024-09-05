const mongoose = require('mongoose')

const lectureGroupSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    contents : [{
        subGroup : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'subGroup',
        },
        students : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'students'
        }
            
        ]
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