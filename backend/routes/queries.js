const express = require('express')
const Query = require('../models/query')
const queryHelper = require('../controllers/query')

const router = express.Router()

router.route('/')
.post(queryHelper.postQuery)

router.route('/:id/comment')
.post(queryHelper.postComment)

module.exports = router
