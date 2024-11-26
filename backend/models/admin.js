const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    id : {
        type : Number,
        unique : true,
    },
    _id : false
})

const Admin = mongoose.model('admin', AdminSchema)

module.exports = Admin
