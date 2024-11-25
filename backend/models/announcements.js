const mongoose = require('mongoose')

const announcementsSchema = new mongoose.Schema({
    content : {
        title : {
            type : String,
        },
        body : {
            type : String, 
        },
        _id : false,
    },
    postedBy : {
        type : String,
    },
    postedIn : {
        type : String,
    }
})

const Announcement = mongoose.model('announcements', announcementsSchema)

module.exports = Announcement