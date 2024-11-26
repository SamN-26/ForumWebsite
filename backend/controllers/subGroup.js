const SubGroup = require('../models/subGroup')
const Student = require('../models/students')
const Query = require('../models/query')
const Announcement = require('../models/announcements')

//posting a new Subgroup 
const postSubGroupInfo = async (req, res) =>{

    //creating new Subgroup to be posted
    const subGroup = new SubGroup({
        name : req.body.name,
        students : req.body.students,
    })

    //checking whether GR details are provided or not
    if(req.body.gr != null)
    {
        subGroup.gr = req.body.gr;
        if(subGroup.students == null)
            subGroup.students = [req.body.gr]
        else 
            subGroup.students.push(req.body.gr)
    }

    //saving details
    subGroup.save()
    .then(obj =>{
        console.log('SubGroup Added ', obj)
    })
    .catch(err =>{
        console.log('Error ', err)
        return res.send("error in posting")
    })
    return res.send('Subgroup posted')
}

//manually adding students to a subgroup
const addStudentsToSubgroup = async (req, res) =>{
    
    //extract student \
    const student = await Student.findOne({rollNo : req.body.rollNo})
    if(!student)
        return res.send('Student not found')
    //extract subgroup
    const subGroup = await SubGroup.findOne({name : req.body.subgroup})
    if(!subGroup)
        return res.send('Subgroup not found')

    //checking whether students array already exists or not
    if(subGroup.students == null || subGroup.students.length == 0)
        subGroup.students = []

    //check for duplicate student entries
    if(subGroup.students.length != 0 && subGroup.students.includes(req.body.rollNo))
        return res.send('Student already exists')

    //pushing in new student
    subGroup.students.push(req.body.rollNo)

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

const getStudentsInSubgroup = async (req, res) =>{
    // console.log(req.params.name)
    const subGroup = await SubGroup.findOne({name : req.params.name})
    console.log(subGroup)
    return res.json(subGroup.students)
}

const testRoute = async (req, res) =>{
    console.log(req.body)
    return res.send('Tested')
}

const postQuerySubgroup = async (req, res) =>{
    
    console.log(req.user)
    const student  = await Student.findOne({email : req.user.email});
    //checking whether student exists
    if(!student)
        return res.render('subgroup/postQuery', { message : 'Student Not found', status : 2})

    const grpName = student.subgroup
    const subgroup = await SubGroup.findOne({name : grpName})
    if(!subgroup)
        return res.json('subgroup/postQuery', {message : 'Subgroup Group Not Found', status : 3})

    //creating a new Query instance
    const query = new Query({
        postedBy : student.rollNo,
        postedIn : student.subgroup,
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
        return res.render('subgroup/postQuery', {user : student, status : 0})
    })
    student.gr = 1

    return res.render('subgroup/postQuery', {status : 1, user : student})
}

const postAnnouncementSubgroup = async (req, res) =>{
    const student = await Student.findOne({email : req.user.email})
    const subgroup = await SubGroup.findOne({name : student.subgroup})
    if(student.rollNo == subgroup.gr)
        student.gr = 1
    if(!student)
        return res.json({status : 2, message : "Student not Found"})
    const announcement = new Announcement({
        postedBy : student.rollNo,
        postedIn : student.subgroup,
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
        return res.render('subgroup/postAnnouncement', {status : 0, user : student})
    })
    return res.render('subgroup/postAnnouncement', {status : 1, user : student})
}



module.exports = { postAnnouncementSubgroup, postQuerySubgroup, getStudentsInSubgroup ,postSubGroupInfo, addStudentsToSubgroup, testRoute}