const express = require('express')
const Query = require('../models/query')
const queryHelper = require('../controllers/query')

const router = express.Router()

router.route('/')
.post(queryHelper.postQuery)

module.exports = router
