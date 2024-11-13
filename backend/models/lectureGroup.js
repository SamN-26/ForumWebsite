const mongoose = require('mongoose')
const helper = require('../helper')

const lectureGroupSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    subGroup : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'subGroup',
        // validate : {
        //     validator : helper.ValidateuniqueValueArray,
        //     message : 'Subgroup already Exists',
        // }
    },
    // members : [{
    //     subGroup : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : 'subGroup',
    //     },
    //     students : {
    //         type : [mongoose.Schema.Types.ObjectId],
    //         ref : 'students'
    //     },
    //     _id : false,
    //     // validate :{
    //     //     validator : helper.ValidateuniqueValueArray,
    //     //     message : 'Entity already exists',
    //     // }
    // }],
    cr : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'students'
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