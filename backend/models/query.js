const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    postedBy : {
        type : String,
    },
    postedIn : {
        type : String,
    },
    content : {
        _id : false,
        type : {
            title : {
                type : String,
            }, 
            body : {
                type : String,
            },
            upvotes : {
                type : Number,
            },
            upvotedBy: {
                type : [String],
                default : [],
            },
            comments : [{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'comments',
            }]
        }
    },
})

querySchema.index(
    { "content.comments": 1 }, // First parameter: Fields to index
    { unique: true, partialFilterExpression: { "content.comments": { $exists: true, $not: { $size: 0 } } } } // Second parameter: Index options
);

const Query = mongoose.model('query', querySchema)

module.exports = Query
