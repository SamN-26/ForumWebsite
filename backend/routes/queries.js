const express = require('express')
const Query = require('../models/query')
const queryHelper = require('../controllers/query')

const router = express.Router()

router.route('/comments/:id')
.post(queryHelper.postCommentOnQuery)
.get(queryHelper.getCommentOnQuery)

router.route('/upvote')
.post(queryHelper.upvoteQuery)

router.route('/removeUpvote')
.post(queryHelper.removeUpvote)

router.route('/:type/:name')
.get(queryHelper.getQueryByGroup)

module.exports = router
