const mongoose = require('mongoose')
const Student = require('../models/students')

const postStudentInfo = async (req, res) =>{
    student = new Student({
        name : req.body.name,
        email : req.body.email,
        rollNo : req.body.rollNo,
        password : req.body.password,
    })
    console.log(student)
    student.save()
    .then( obj => {
        console.log('Student Inserted : ', obj)
    })
    .catch(err =>{
        console.log(err)
    })
    return res.send('Posted')
}

const getAllStudentInfo = async (req, res) =>{
    const allStudents = await Student.find()
    console.log(allStudents)
    return res.json(allStudents)
}
module.exports = {postStudentInfo, getAllStudentInfo}