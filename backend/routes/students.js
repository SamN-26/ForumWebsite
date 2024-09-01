const express = require('express')
const studentHelper = require('../controllers/student')

const router = express.Router()

router.route('/')
.post(studentHelper.postStudentInfo)
.get(studentHelper.getAllStudentInfo)

module.exports = router;