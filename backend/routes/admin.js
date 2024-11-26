const express = require('express')
const LectureGroup = require('../models/lectureGroup')
const SubGroup = require('../models/subGroup')
const Students = require('../models/students')
const { studentExistCheck } = require('../helper')

const router = express.Router()

router.route('/')
.get((req, res) =>{
    return res.render('adminportal/home.ejs')
})

router.route('/logout')
.get( (req, res) =>{
    res.clearCookie('token')
    return res.redirect('/login/admin')
})

router.route('/update-student')
.get( (req, res) =>{
    return res.render('adminportal/updateStudent.ejs')
})

// router.route('/update-student-detials')
// .get( (req, res) =>{
//     console.log('Helo')
//     return res.json({status : 1})
// })

router.route('/get-subgroup')
.get( (req, res) =>{
    return res.render('adminportal/showSubgroups.ejs')
})

router.route('/get-subgroup/:name')
.get( async (req, res) =>{
    console.log(req.params.name)
    const lecturegroup = await LectureGroup.findOne({name : req.params.name})
    let groups
    if(!lecturegroup)
        groups = []
    else 
        groups = lecturegroup.subGroup
    return res.json({status : 1, message : "Successfull", groups : groups})
})

router.route('/get-students')
.get( (req, res) =>{
    return res.render('adminportal/showStudents.ejs')
})

router.route('/get-student/:name')
.get( async (req, res) =>{
    console.log(req.params.name)
    const subgroup = await SubGroup.findOne({name : req.params.name})
    let students
    if(!subgroup)
        students = []
    else 
        students = await Students.find({rollNo : {$in : subgroup.students}})
    return res.json({status : 1, message : "Successfull ", students : students})
})

router.route('/update-gr')
.get( (req, res) =>{
    return res.render('adminportal/updateGrDetails.ejs')
})

router.route('/update-cr')
.get( (req, res) =>{
    return res.render('adminportal/updateCrDetails.ejs')
})

module.exports = router