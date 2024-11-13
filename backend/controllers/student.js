const mongoose = require('mongoose')
const Student = require('../models/students')
const SubGroup = require('../models/subGroup')
const AuthService = require('../service/auth')

//function to post a new Student
const postStudentInfo = async (req, res) =>{
    // const subGroup = SubGroup.find({name : req.body.subgroup})
    // console.log(subGroup._id)
    student = new Student({
        name : req.body.name,
        email : req.body.email,
        rollNo : req.body.rollNo,
        password : req.body.password,
    })
    student.save()
    .then( obj => {
        console.log('Student Inserted : ', obj)
    })
    .catch(err =>{
        console.log(err)
    })
    const payload = {
        email : student.email,
        password : student.password,
        role : 'Student',
    }
    const token = AuthService.setUser(payload)
    res.cookie('token', token);
    return res.send('Student Posted')
}

//function to return info of all students
const getAllStudentInfo = async (req, res) =>{
    const allStudents = await Student.find()
    console.log(allStudents)
    return res.json(allStudents)
}

const getStudentFromRollNo = async(req, res) =>{
    console.log(req.params.rollno)
    const targetStudent = await Student.findOne({rollNo : req.params.rollno})
    console.log(targetStudent)
    return res.json(targetStudent)
}

module.exports = {postStudentInfo, getAllStudentInfo, getStudentFromRollNo}