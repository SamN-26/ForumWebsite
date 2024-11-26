const Query = require('../models/query')
const Student = require('../models/students')
const SubGroup = require('../models/subGroup')
const LectureGroup = require('../models/lectureGroup')
const Comment = require('../models/comment')
const helper = require('../helper')

//function for posting the Comments
const postCommentOnQuery = async (req, res) =>{

    const queryId = req.params.id

    const query = await Query.findById(queryId)
    const student = await Student.findOne({rollNo : req.body.rollNo})

    if(!query)
    {
        console.log('Query not Found')
        return res.json({status : 3, message :'Query not Found'});
    }

    //creating the comment object
    const comment = new Comment({
        postedBy : {
            rollNo : req.body.rollNo,
            name : student.name
        },
        content : {
            body : req.body.text,
            upvotes : 0,
            replies : [],
        }
    })
    comment.save()
    .then(() =>{
        console.log('Comment Posted')
    })
    .catch((err) => {
        console.log('Error ', err.message)
        return res.json({status : 2, message : "Error on Posting Comment"})
    })

    query.content.comments.push(comment._id)
    // console.log(query)
    query.save()
    .then(() => {
        console.log('Query Updated')
    })
    .catch((err) =>{
        console.log('Error ', err.message)
        return res.json({status : 0, message : "Error in Upadating Query"})
    })
    console.log('Comment Posted')
    return res.json({status : 1, message : "Comment Posted"})
}

const getQueryByStudent = async (req, res) =>{
    const queries = await Query.find({postedBy : req.params.rollno})
    console.log(queries)
    return res.json(queries)
}

const getQueryByGroup = async (req, res) =>{
    if(!(req.params.type == 'subgroup' || req.params.type == 'lecturegroup'))
        return res.send('Wrong route')
    if(req.params.type == 'subgroup')
        loc = false;
    else 
        loc = true;
    console.log(loc, req.params.name)
    const queries = await Query.find({postedIn : { loc : loc, grp : req.params.name}})
    console.log(queries)
    return res.json(queries)
}

const upvoteQuery = async (req, res) =>{
    // console.log(req.body)
    // console.log(req.user)
    const student = await Student.findOne({email : req.user.email})
    console.log(student)
    const query = await Query.findById({_id : req.body.id})
    if(!query)
        return res.json({status : 0})

    if(query.content.upvotedBy.includes(student.rollNo))
        return res.json({status : 2})

    query.content.upvotes = query.content.upvotes + 1
    query.content.upvotedBy.push(student.rollNo)
    console.log(query)
    query.save()
    .then(() =>{
        console.log('Updated Query')
        return res.json({status : 1, newUpvoteCount : query.content.upvotes})
    })
    .catch((err) =>{
        return res.json({status : 0})
    })
}

const removeUpvote = async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    console.log(student)
    const query = await Query.findById({_id : req.body.id})
    if(!query)
        return res.json({status : 0})

    if(!query.content.upvotedBy.includes(student.rollNo))
        return res.json({status : 2})

    query.content.upvotes = query.content.upvotes - 1
    query.content.upvotedBy = query.content.upvotedBy.filter(item => item !== student.rollNo)
    console.log(query)
    query.save()
    .then(() =>{
        console.log('Updated Query')
        return res.json({status : 1, newUpvoteCount : query.content.upvotes})
    })
    .catch((err) =>{
        return res.json({status : 0})
    })
}

const getCommentOnQuery = async (req, res) =>{
    console.log(req.params)
    const query = await Query.findById({_id : req.params.id})
    if(!query)
        return res.json({status : 0, message : "Query not Found"})
    console.log(query.content.comments)
    const comments = await Comment.find({_id : {$in : query.content.comments}})
    console.log(comments)
    return res.json({status : 1, comments : comments})
}

module.exports = {removeUpvote, 
    getCommentOnQuery,
    upvoteQuery, 
    getQueryByGroup,
    postCommentOnQuery, 
    getQueryByStudent}