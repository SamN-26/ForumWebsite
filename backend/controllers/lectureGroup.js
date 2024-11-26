const LectureGroup = require('../models/lectureGroup')
const SubGroup = require('../models/subGroup')
const Query = require('../models/query')
const Announcement = require('../models/announcements')
const helper = require('../helper')
const Student = require('../models/students')
const lectureGroup = require('../models/lectureGroup')

//posting the Lecture Group
// const postLectureGroup = async (req, res) =>{
//     // console.log(req.body)

//     const range = req.body.name.split('-')
//     const prefix = range[0].match(/[a-zA-Z]+/)[0];  // "CO"
//     const startNum = parseInt(range[0].match(/\d+/)[0], 10);  // 6
//     const endNum = parseInt(range[1].match(/\d+/)[0], 10);    // 10

//     //creating subgroup
//     const lectureGroup = new LectureGroup({
//         name : req.body.name,
//         branch : req.body.branch,
//         id : startNum,
//     })

//     // Generate the sequence of strings
//     const result = [];
//     for (let i = startNum; i <= endNum; i++) {
//         result.push(`${prefix}${i}`);
//     }

//     //extracting groups if any

//     const groupsId = await (await SubGroup.find({ name : {$in : result}}))
//     const groups = groupsId.map((obj) => {
//         return obj.name
//     })
//     lectureGroup.subGroup = []
//     if(groups)
//     {
//         for(let i = 0; i<groups.length; i++)
//         {
//             lectureGroup.subGroup.push(groups[i])
//         }
//     }
//     console.log(lectureGroup)

//     //saving the lecture group
    
//     lectureGroup.save()
//     .then(obj => {
//         console.log('Lecture Group Posted : ', obj)
//     })
//     .catch(err =>{
//         console.log('Error in inserting')
//         return res.send('Error in Inserting')
//     })
//     return res.send('Lecture Group Posted')
// }

//manually adding a new subgroup to the lecture Group
const addSubgroupToLecturegroup = async (req, res) =>{

    if(!(await helper.subgroupExistCheck(req.body.name)))
        return res.send("Subgroup not found")
    const lectureGroup = await LectureGroup.findOne({id : req.body.LGid})
    if(!lectureGroup)
        return res.send("Invalid Lecture Group id")

    if(lectureGroup.subGroup.includes(req.body.name))
        return res.send('SubGroup already exists')

    if(lectureGroup.subGroup.length == 0)
        lectureGroup.subGroup = []
    lectureGroup.subGroup.push(req.body.name)
    console.log(lectureGroup)

    // saving lecture group
    lectureGroup.save()
    .then(obj =>{
        console.log('Subgroup added ', obj)
    })
    .catch(err =>{
        console.log('Error ', err)
    })
    return res.send("Subgroup Added")
}

const getsubGroup = async (req, res) =>{
    console.log(req.body.lgId)
    const lectureGroup = await LectureGroup.findOne({id : req.body.lgId})
    console.log(lectureGroup)
    return res.json(lectureGroup.subGroup)
}

const postQueryLecture = async (req, res) =>{
    
    console.log(req.user)

    const student  = await Student.findOne({email : req.user.email});
    //checking whether student exists
    if(!student)
        return res.send('Student Not found')

    const grpName = student.lecturegroup
    const lecturegroup = await LectureGroup.findOne({name : student.lecturegroup})
    if(!lecturegroup)
        return res.send('Lecture Group Not Found')

    //creating a new Query instance
    const query = new Query({
        postedBy : student.rollNo,
        postedIn : student.lecturegroup,
        content : {
            title : req.body.title,
            body : req.body.body,
            upvotes : 0,
            comments : [],
        }
    })
    console.log(query)

    // saving the Query
    
    await query.save()
    .then(() => {
        console.log('Query Posted')
    })
    .catch( (err)=> {
        console.log('Error in posting Query',err)
        return res.render('lecturegroup/PostQuery', {user : student, status : 0})
    })
    console.log(lecturegroup)
    if(lecturegroup.cr == student.rollNo)
        student.cr = 1
    console.log(student)
    return res.render('lecturegroup/PostQuery', {status : 1, user : student})
}

const postAnnouncementLecture = async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const lecturegroup = await LectureGroup.findOne({name : student.lecturegroup})
    if(student.rollNo == lecturegroup.cr)
        student.cr = 1
    if(!student)
        return res.json({status : 2, message : "Student not Found"})
    const announcement = new Announcement({
        postedBy : student.rollNo,
        postedIn : student.lecturegroup,
        content : {
            title : req.body.title,
            body : req.body.body,
        }
    })
    console.log(announcement)
    announcement.save()
    .then(() =>{
        console.log('Announcement Posted')
    })
    .catch((err) =>{
        console.log('Error in posting announcement ', err)  
        return res.render('lecturegroup/postAnnouncement', {status : 0, user : student})
    })
    return res.render('lecturegroup/postAnnouncement', {status : 1, user : student})
}

module.exports = {postAnnouncementLecture, postQueryLecture, getsubGroup, addSubgroupToLecturegroup}
