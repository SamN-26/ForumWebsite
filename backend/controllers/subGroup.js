const SubGroup = require('../models/subGroup')
const Student = require('../models/students')

//posting a new Subgroup 
const postSubGroupInfo = async (req, res) =>{

    //extracting students to be added if any
    const students = await Student.find({
        rollNo : { $in : req.body.students}
    })
    //extracting GR if any 
    const gr = await Student.findOne({rollNo : req.body.gr})
    //extracting object id from students array
    objId = students.map((student) =>{
        return student._id;
    })

    //creating new Subgroup to be posted
    const subGroup = new SubGroup({
        name : req.body.name,
        students : objId,
    })

    //checking whether GR details are provided or not
    if(gr != null)
    {
        subGroup.gr = gr._id;
        if(subGroup.students == null)
            subGroup.students = [gr._id]
        else 
            subGroup.students.push(gr._id)
    }

    //saving details
    subGroup.save()
    .then(obj =>{
        console.log('SubGroup Added ', obj)
    })
    .catch(err =>{
        console.log('Error ', err)
    })
    return res.send('Subgroup posted')
}

//manually adding students to a subgroup
const addStudentsToSubgroup = async (req, res) =>{
    
    //extract student 
    const student =  await Student.findOne({rollNo : req.body.rollNo})
    if(student.length == 0)
        return res.send('Student not found')
    //extract subgroup
    const subGroup = await SubGroup.findOne({name : req.body.subgroup})
    if(subGroup.length == 0)
        return res.send('Subgroup not found')

    //check for duplicate student entries
    if(subGroup.students.includes(student._id))
        return res.send('Student already exists')
    
    //checking whether students array already exists or not
    if(subGroup.students == null || subGroup.students.length == 0)
        subGroup.students = []

    //pushing in new student
    subGroup.students.push(student._id)

    //saving details
    subGroup.save()
    .then(obj => {
        console.log('Student Added : ', obj)
    })
    .catch(err =>{
        console.log('Error : ', err)
    })

    return res.send('Student added')
}

const testRoute = async (req, res) =>{
    console.log(req.body)
    return res.send('Tested')
}

module.exports = {postSubGroupInfo, addStudentsToSubgroup, testRoute}