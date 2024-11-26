const Subgroup = require('../models/subGroup')
const Student = require('../models/students')
const Lecturegroup = require('../models/lectureGroup')
const APIPASS = 'api123'
const Query = require('../models/query')
const Announcement = require('../models/announcements')

const getSubgroupGrDetails = async (req, res) =>{
    if(!req.params.pass == APIPASS)
        return res.json({status : 0})
    else 
    {
        console.log(req.params.name)
        const subgroup = await Subgroup.findOne({name : req.params.name})
        if(!subgroup)
            return res.json({status : 2})
        else 
            return res.json({status : 1, subgroup : subgroup})
    }
}

const updateSubgroupGr = async (req, res) =>{
    console.log(req.params.name)
    console.log(req.body)
    if(!req.params.name)
        return res.json({status : 0})
    const subgroup = await Subgroup.findOne({name : req.params.name})
    if(!subgroup)
        return res.json({status : 2, message : "Subgroup Not Found"})
    const student = await Student.findOne({rollNo : req.body.gr, subgroup : subgroup.name})
    if(!student)
        return res.json({status : 3, message : "Student not Found"})
    const updatedSubgroup = await Subgroup.updateOne(
        {name : req.params.name},
        { $set : {gr : req.body.gr}},
        {new : true}
    )
    console.log(updatedSubgroup)
    return res.json({status : 1})
}

const getLecturegroupCrDetails = async (req, res) =>{
    console.log(req.params)
    if(!req.params.pass == APIPASS)
        return res.json({status : 0})
    else 
    {
        console.log(req.params.name)
        const lecturegroup = await Lecturegroup.findOne({name : req.params.name})
        if(!lecturegroup)
            return res.json({status : 2})
        else 
            return res.json({status : 1, lecturegroup : lecturegroup})
    }
}

const updateLecturegroupCr = async (req, res) =>{
    // console.log(req.params.name)
    // console.log(req.body)
    if(!req.params.name)
        return res.json({status : 0})
    const lecturegroup = await Lecturegroup.findOne({name : req.params.name})
    if(!lecturegroup)
        return res.json({status : 2, message : "Lecture group Not Found"})
    const student = await Student.findOne({rollNo : req.body.cr, lecturegroup : lecturegroup.name})
    if(!student)
        return res.json({status : 3, message : "Student not Found"})
    const updatedLecturegroup = await Lecturegroup.updateOne(
        {name : req.params.name},
        { $set : {cr : req.body.cr}},
        {new : true}
    )
    console.log(updatedLecturegroup)
    return res.json({status : 1})
}

const deleteQuery = async (req, res) =>{
    if(req.body.pass != APIPASS)
        return res.json({status : "API Password is Wrong"})
    console.log(req.params.id)
    const result = await Query.deleteOne({_id : req.params.id})
    if(result.deletedCount != 1)   
        return res.json({status : 1, messgae : "Query not Deleted"})
    return res.json({status : 0, message : "Successfully Deleted"})
}

const deleteAnnouncement = async (req, res) =>{
    if(req.body.pass != APIPASS)
        return res.json({status : "API Password is Wrong"})
    console.log(req.params.id)
    const result = await Announcement.deleteOne({_id : req.params.id})
    if(result.deletedCount != 1)   
        return res.json({status : 1, messgae : "Announcement not Deleted"})
    return res.json({status : 0, message : "Successfully Deleted"})
}

module.exports = {
    deleteAnnouncement,
    getSubgroupGrDetails,
    deleteQuery,
    updateSubgroupGr,
    getLecturegroupCrDetails,
    updateLecturegroupCr
}