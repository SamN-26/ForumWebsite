const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        body : {
            type : String, 
        },
        upvotes : {
            type : Number
        },
        replies : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment',
            default : [],
        }],
        _id : false,
    },
    postedBy : {
        type : {
            name : String, 
            rollNo : String,
        },
    }
})

commentSchema.index(
    { "content.replies": 1 }, // First parameter: Fields to index
    { unique: true, partialFilterExpression: { "content.comments": { $exists: true, $not: { $size: 0 } } } } // Second parameter: Index options
);

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment