const LectureGroup = require('../models/lectureGroup')
const SubGroup = require('../models/subGroup')

//posting the Lecture Group
const postLectureGroup = async (req, res) =>{
    // console.log(req.body)

    const range = req.body.name.split('-')
    const prefix = range[0].match(/[a-zA-Z]+/)[0];  // "CO"
    const startNum = parseInt(range[0].match(/\d+/)[0], 10);  // 6
    const endNum = parseInt(range[1].match(/\d+/)[0], 10);    // 10

    //creating subgroup
    const lectureGroup = new LectureGroup({
        name : req.body.name,
        branch : req.body.branch,
        passoutYear : req.body.year,
        id : startNum,
    })

    // Generate the sequence of strings
    const result = [];
    for (let i = startNum; i <= endNum; i++) {
        result.push(`${prefix}${i}`);
    }

    //extracting groups if any
    const groups = await SubGroup.find({ name : {$in : result}})

    console.log(groups)
    for(let i = 0; i<groups.length; i++)
    {
        lectureGroup.members.push({
            subGroup : groups[i]._id,
            students : groups[i].students,
        })
    }
    // console.log(lectureGroup)

    //saving the lecture group
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

//manually adding a new subgroup to the lecture Group
const addSubgroupToLecturegroup = async (req, res) =>{
    console.log(req.body)
    const subGroup = await SubGroup.findOne({name : req.body.name})
    if(!subGroup)
        return res.send("Subgroup not found")
    const lectureGroup = await LectureGroup.findOne({id : req.body.LGid})
    if(!lectureGroup)
        return res.send("Invalid Lecture Group id")

    if(lectureGroup.members.some(obj => obj.subGroup.equals(subGroup._id)))
        return res.send('Subgroup already exists');
    if(lectureGroup.members.length == 0)
        lectureGroup.members = []
    lectureGroup.members.push({
        subGroup : subGroup._id,
        students : subGroup.students,
    })
    
    //saving lecture group
    lectureGroup.save()
    .then(obj =>{
        console.log('Subgroup added ', obj)
    })
    .catch(err =>{
        console.log('Error ', err)
    })
    return res.send("Subgroup Added")
}


module.exports = {postLectureGroup, addSubgroupToLecturegroup}