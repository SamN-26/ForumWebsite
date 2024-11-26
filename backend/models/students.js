const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true,
    },
    rollNo : {
        type : String,
        //required : true,
        unique : true,
    },
    email : {
        type : String,
        //required : true,
        unique : true,
    },
    password : {
        type : String,
        //required : true,
    },
    subgroup : {
        type : String,
    },
    lecturegroup : {
        type : String,
    },
    // starredQueries :{
    //     type : [mongoose.Schema.Types.ObjectId],
    //     ref : 'comments'
    // }
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
