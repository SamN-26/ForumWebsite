const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'students',
    },
    postedIn : {
        type : {
            loc : {
                type : Boolean,
            },
            grpId : {
                type : mongoose.Schema.Types.ObjectId,
            }
        }
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
            comments : [{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'comments',
            }]
        }
    },
})

const Query = mongoose.model('query', querySchema)

module.exports = Query
