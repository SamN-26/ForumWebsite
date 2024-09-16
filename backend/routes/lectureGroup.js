const express = require('express')
const lectureGroupHelper = require('../controllers/lectureGroup')

const router = express.Router()

router.route('/')
.post(lectureGroupHelper.postLectureGroup)

router.route('/addsubgroup')
.post(lectureGroupHelper.addSubgroupToLecturegroup)

module.exports = router