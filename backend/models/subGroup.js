const mongoose = require('mongoose')
const helper = require('../helper')

const subGroupSchema = new mongoose.Schema({
    students : {
        //rollNo
        type : [String],
    },
    gr : {
        //Roll no
        type : String,
    },
    name : {
        type : String, 
    }
})

const SubGroup = mongoose.model('subGroup', subGroupSchema)

module.exports = SubGroup