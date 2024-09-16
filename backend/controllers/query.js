const Query = require('../models/query')
const Student = require('../models/students')
const SubGroup = require('../models/subGroup')
const LectureGroup = require('../models/lectureGroup')


const postQuery = async (req, res) =>{
    console.log(req.body)
    const reqData = req.body
    const postedBy = await Student.findOne({rollNo : reqData.rollNo})
    const loc = reqData.postedIn.loc
    const grp = reqData.postedIn.grp
    const grpId = loc == 0 ? 
    await SubGroup.findOne({name : grp}) :
    await LectureGroup.findOne({id : Number(grp)});
    console.log(grpId._id)
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
    await query.save()
    // console.log((await Student.findById(query.postedBy)).name)
    // console.log((await LectureGroup.findById(query.postedIn.grpId)).name)
    return res.send('Posted Query')
}


module.exports = {postQuery}