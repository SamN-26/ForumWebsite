const express = require('express')
const studentHelper = require('../controllers/student')
const authMiddlewares = require('../middlewares/auth')
const Student = require('../models/students')
const adminHelper = require('../controllers/admin')

const router = express.Router()

router.route('/')
.get(authMiddlewares.restrictTo, async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    console.log(student)
    return res.render('forum', {user : student})
})

router.route('/login/admin')
.get( (req ,res) =>{
    return res.render('adminportal/login.ejs')
})
.post(adminHelper.handleAdminLogin)

router.route('/signout')
.post( (req, res) =>{
    res.clearCookie('token')
    return res.redirect('/login')
})

router.route('/login')
.post(studentHelper.handleStudentLogin)
.get((req, res) =>{
    return res.render('login')
})

module.exports = router