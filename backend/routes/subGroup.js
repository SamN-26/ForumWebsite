const express = require('express')
const mongoose = require('mongoose')
const subGroupHelper = require('../controllers/subGroup')


const router = express.Router()

router.route('/')
.post(subGroupHelper.postSubGroupInfo)
.get((req, res) =>{
    console.log(req.body)
    return res.send('Get Subgroup')
})

router.route('/addstudents')
.post(subGroupHelper.addStudentsToSubgroup)


router.route('/testroute')
.post(subGroupHelper.testRoute)

module.exports = router
