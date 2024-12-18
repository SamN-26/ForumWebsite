const mongoose = require('mongoose')
const Student = require('../models/students')
const SubGroup = require('../models/subGroup')
const AuthService = require('../service/auth')
const { subgroupExistCheck } = require('../helper')

//function to post a new Student
const postStudentInfo = async (req, res) =>{
    // const subGroup = SubGroup.find({name : req.body.subgroup})
    // console.log(subGroup._id)
    student = new Student({
        name : req.body.name,
        email : req.body.email,
        rollNo : req.body.rollNo,
        password : req.body.password,
        subgroup : req.body.subgroup,
        lecturegroup : req.body.lecturegroup,
    })
    student.save()
    .then( obj => {
        console.log('Student Inserted : ', obj)
    })
    .catch(err =>{
        console.log(err)
    })
    return res.send("Done")
}

const handleStudentLogin = async (req, res) =>{
    console.log(req.body)
    const student = await Student.findOne({rollNo : req.body.rollNo, password : req.body.password})
    if(!student)
        return res.redirect('/login')
    else 
        res.cookie('token', AuthService.setUser({
            email : student.email,
        }))
    return res.redirect('/')
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

const updateStudentDetails = async (req, res) =>{
    console.log(req.body)

    const targetstudent = await Student.findOne({rollNo : req.body.studentID})
    const targetOldSubgroup = await SubGroup.findOne({name : targetstudent.subgroup})
    newStudentArray = targetOldSubgroup.students
    newStudentArray = newStudentArray.filter(item => item != (targetstudent.rollNo))
    gr = targetOldSubgroup.gr
    if(targetOldSubgroup.gr && targetOldSubgroup.gr == targetstudent.rollNo)
        gr = null
    const oldSubgroup = await SubGroup.updateOne(
        {name : targetstudent.subgroup},
        { $set : {students : newStudentArray, gr : gr}},
        {new : true}
    )
    const student = await Student.updateOne(
        {rollNo : req.body.studentID},
        { $set : {name : req.body.studentName, subgroup : req.body.studentGroup}},
        {new : true}
    )
    const newSubgroup = await SubGroup.findOne({name : req.body.studentGroup})
    newSubgroup.students.push(targetstudent.rollNo)

    newSubgroup.save()
    .then( () =>{
        console.log('Updated new Subgroup')
    })
    .catch((err) =>{
        console.log('Error')
    })

    // console.log(newSubgroup)
    // console.log(oldSubgroup)
    // console.log(student)
    return res.json({status : 1})
}

module.exports = {updateStudentDetails, handleStudentLogin, postStudentInfo, getAllStudentInfo, getStudentFromRollNo}