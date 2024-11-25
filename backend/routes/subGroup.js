const express = require('express')
const mongoose = require('mongoose')
const subGroupHelper = require('../controllers/subGroup')
const Student = require('../models/students')
const Announcements = require('../models/announcements')
const Queries = require('../models/query')
const SubGroup = require('../models/subGroup')

const router = express.Router()

router.route('/')
.post(subGroupHelper.postSubGroupInfo)
.get( async (req, res) => {
    const student = await Student.findOne({email : req.user.email})
    if(!student)
        return res.render('subgroup/Home.ejs', {status : 0, user : student, announcements : {}})
    const subgroup = await SubGroup.findOne({name : student.subgroup})
    if(student.rollNo == subgroup.gr)
        student.gr = 1
    const announcements = await Announcements.find({postedIn : student.subgroup})
    return res.render('subgroup/Home.ejs', {status : 1, user : student, announcements : announcements})
})

router.route('/queries')
.get(async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    if(!student)
        return res.render('subgroup/Home.ejs', {status : 0, user : student, queries : {}})
    const subgroup = await SubGroup.findOne({name : student.subgroup})
    if(student.rollNo == subgroup.gr)
        student.gr = 1
    const queries = await Queries.find({postedIn : student.subgroup})
    return res.render('subgroup/Query.ejs', {status : 1, user : student, queries : queries})
})

router.route('/post-query')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const subgroup = await SubGroup.findOne({name : student.subgroup})
    if(student.rollNo == subgroup.gr)
        student.gr = 1
    console.log(student)
    return res.render('subgroup/postQuery', {user : student})
})
.post(subGroupHelper.postQuerySubgroup)

router.route('/post-announcement')
.get( async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const subgroup = await SubGroup.findOne({name : student.subgroup})
    if(student.rollNo == subgroup.gr)
        student.gr = 1
    console.log(student)
    return res.render('subgroup/postAnnouncement', {user : student})
})
.post(subGroupHelper.postAnnouncementSubgroup)

router.route('/addstudents')
.post(subGroupHelper.addStudentsToSubgroup)

router.route('/students/:name')
.get(subGroupHelper.getStudentsInSubgroup)

router.route('/testroute')
.post(subGroupHelper.testRoute)

module.exports = router
