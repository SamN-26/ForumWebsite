const mongoose = require('mongoose')

const subGroupSchema = new mongoose.Schema({
    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student'
    }],
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