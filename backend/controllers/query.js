const Query = require('../models/query')
const Student = require('../models/students')
const SubGroup = require('../models/subGroup')
const LectureGroup = require('../models/lectureGroup')
const Comment = require('../models/comment')

//funciton for posting the Query
const postQuery = async (req, res) =>{

    console.log(req.body)
    const reqData = req.body
    //extracting the student who made the query from roll Number
    const postedBy = await Student.findOne({rollNo : reqData.rollNo})
    
    //extracting the group id of the query loc = 0 is for subgroup and loc = 1 is for lecture group
    const loc = reqData.postedIn.loc
    const grp = reqData.postedIn.grp
    const grpId = loc == 0 ? 
    await SubGroup.findOne({name : grp}) :
    await LectureGroup.findOne({id : Number(grp)});
    console.log(grpId._id)

    //creating a new Query instance
    const query = new Query({
        postedBy : postedBy._id,
        postedIn : {
            loc : loc,
            grpId : grpId._id,
        },
        content : {
            title : reqData.title,
            body : reqData.body,
            upvotes : 0,
            comments : [],
        }
    })
    console.log(query)
    //saving the Query
    await query.save()
    .then(() => {
        console.log('Query Posted')
    })
    .catch( (err)=> {
        console.log('Error in posting Query')
    })
    // console.log((await Student.findById(query.postedBy)).name)
    // console.log((await LectureGroup.findById(query.postedIn.grpId)).name)
    return res.send('Posted Query')
}

//function for posting the Comments
const postComment = async (req, res) =>{

    //cleaning the inputs
    const type = req.params.id[0]
    const objId = req.params.id.substr(1)
    // console.log(objId)
    // console.log(req.body)

    //extracting the student id 
    const student = (await Student.findOne({rollNo : req.body.rollNo}))._id

    //creating the comment object
    const comment = new Comment({
        postedBy : student,
        content : {
            body : req.body.content.body,
            upvotes : 0,
            replies : [],
        }
    })
    // console.log(comment)
    comment.save()
    .then(() =>{
        console.log('Comment Posted')
    })
    .catch((err) => {
        console.log('Error ', err.message)
    })

    if(type == 'Q')
    {
        const query = await Query.findById(objId)
        query.content.comments.push(comment._id)
        // console.log(query)
        query.save()
        .then(() => {
            console.log('Query Updated')
        })
        .catch((err) =>{
            console.log('Error ', err.message)
        })
    }
    else if(type == 'C'){
        const targetComment = await Comment.findById(objId)
        targetComment.content.replies.push(comment._id)

        // console.log(targetComment)
        targetComment.save()
        .then(() =>{
            console.log('Comment Updated')
        })
        .catch((err) => {
            console.log('Error : ', err.message)
        })
    }
    return res.send("Comment Posted")
}


module.exports = {postQuery, postComment}