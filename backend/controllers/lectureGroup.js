const LectureGroup = require('../models/lectureGroup')
const SubGroup = require('../models/subGroup')

const postLectureGroup = async (req, res) =>{
    // console.log(req.body)

    const range = req.body.name.split('-')
    const prefix = range[0].match(/[a-zA-Z]+/)[0];  // "CO"
    const startNum = parseInt(range[0].match(/\d+/)[0], 10);  // 6
    // const endNum = parseInt(range[1].match(/\d+/)[0], 10);    // 10

    // Generate the sequence of strings
    // const result = [];
    // for (let i = startNum; i <= endNum; i++) {
    //     result.push(`${prefix}${i}`);
    // }
    // const groups = await SubGroup.find({ name : {$in : result}})

    // groupsId = groups.map((group) => {
    //     return group._id;
    // })
    // studentsId = groups.map((group) =>{
    //     return group.students
    // })
    const lectureGroup = new LectureGroup({
        name : req.body.name,
        branch : req.body.branch,
        passoutYear : req.body.year,
        id : startNum,
    })
    console.log(lectureGroup)
    lectureGroup.save()
    .then(obj => {
        console.log('Lecture Group Posted : ', obj)
    })
    .catch(err =>{
        console.log('Error in inserting')
        return res.send('Error in Inserting')
    })
    return res.send('Lecture Group Posted')
}

const addSubgroupToLecturegroup = async (req, res) =>{
    console.log(req.body)
    const subgroup = await SubGroup.find({name : req.body.name})
    console.log(subgroup)
    if(subgroup)
        return res.send("Subgroup not found")
    const lecturegroup = await LectureGroup.find({id : req.body.LGid})
    console.log(lecturegroup)
    if(!lecturegroup)
        return res.send("Invalid Lecture Group id")
    console.log(lecturegroup.subGroup)
    return res.send("Subgroup Added")
}


module.exports = {postLectureGroup, addSubgroupToLecturegroup}