const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        type : {
            body : {
                type : String, 
            },
            upvotes : {
                type : Number
            },
            replies : [{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'comment',
                unique : true,
                default : [],
            }]
        },
        _id : false,
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'students'
    }
})

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment