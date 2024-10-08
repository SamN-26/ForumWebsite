const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true,
    },
    rollNo : {
        type : String,
        //required : true,
    },
    email : {
        type : String,
        //required : true,
    },
    password : {
        type : String,
        //required : true,
    },
    subgroup : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subGroup'
    }
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
