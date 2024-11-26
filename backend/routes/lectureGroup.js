const express = require('express')
const lectureGroupHelper = require('../controllers/lectureGroup')
const Student = require('../models/students')
const Query = require('../models/query')
const Comment = require('../models/comment')
const lectureGroup = require('../models/lectureGroup')
const Announcements = require('../models/announcements')

const router = express.Router()

//.post(lectureGroupHelper.postLectureGroup)

router.route('/')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const lecturegroup = await lectureGroup.findOne({name : student.lecturegroup})
    if(student.rollNo == lecturegroup.cr)
        student.cr = 1
    console.log(student)
    const announcements = await Announcements.find({postedIn : student.lecturegroup}) 
    return res.render('lecturegroup/Home.ejs', {user : student, announcements : announcements})
})

router.route('/queries')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const lecturegroup = await lectureGroup.findOne({name : student.lecturegroup})
    if(student.rollNo == lecturegroup.cr)
        student.cr = 1
    console.log(student)
    const queries = await Query.find({postedIn : student.lecturegroup})
    if(!queries)
        queries = []
    return res.render('lecturegroup/Query.ejs', {user : student, queries : queries})
})  

router.route('/post-announcement')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const lecturegroup = await lectureGroup.findOne({name : student.lecturegroup})
    if(student.rollNo == lecturegroup.cr)
        student.cr = 1
    console.log(student)
    return res.render('lecturegroup/postAnnouncement', {user : student})
})
.post(lectureGroupHelper.postAnnouncementLecture)

router.route('/post-query')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const lecturegroup = await lectureGroup.findOne({name : student.lecturegroup})
    if(student.rollNo == lecturegroup.cr)
        student.cr = 1
    console.log(student)
    return res.render('lecturegroup/postQuery', {user : student})
})
.post(lectureGroupHelper.postQueryLecture)

router.route('/addSubgroup')
.post(lectureGroupHelper.addSubgroupToLecturegroup)

router.route('/getSubgroup')
.get(lectureGroupHelper.getsubGroup)

module.exports = router
