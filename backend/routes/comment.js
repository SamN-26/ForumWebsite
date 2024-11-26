const express = require('express')
const Comment = require('../models/comment')
const Query = require('../models/query')

const router = express.Router()

const deleteAllComments = async (req, res) =>{
    await Query.updateMany(
        {"content.comments" : {$ne : [] } },
        {$set : {"content.comments" : [] }}
    )
    await Comment.deleteMany({});
    return res.send('deleted all Comments')
}

router.route('/deleteAll')
.delete(deleteAllComments)

module.exports = router