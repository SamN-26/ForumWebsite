const SubGroup = require('../models/subGroup')
const Student = require('../models/students')

const postSubGroupInfo = async (req, res) =>{
    const students = await Student.find({
        rollNo : { $in : req.body.students}
    })
    const grId = await Student.findOne({rollNo : req.body.gr})
    
    objId = students.map((student) =>{
        return student._id;
    })
    // console.log(objId)
    // console.log(grId._id)
    const subGroup = new SubGroup({
        name : req.body.name,
        students : objId,
        gr : grId
    })
    subGroup.save()
    .then(obj =>{
        console.log('SubGroup Added ', obj)
    })
    .catch(err =>{
        console.log('Error ', err)
    })
    return res.send('Subgroup post')
}

module.exports = {postSubGroupInfo}