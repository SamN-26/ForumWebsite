const mongoose = require('mongoose')
const helper = require('../helper')

const subGroupSchema = new mongoose.Schema({
    students : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'student',
        // validate : {
        //     validator : helper.ValidateuniqueValueArray,
        //     message : 'Students already Exists',
        // }
    },
    gr : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student'
    },
    name : {
        type : String, 
    }
})

const SubGroup = mongoose.model('subGroup', subGroupSchema)

module.exports = SubGroup