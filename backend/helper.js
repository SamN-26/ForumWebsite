
const ValidateuniqueValueArray = function(value)
{
    return Array.isArray(value) && (value.length === 0 || new Set(value).size === value.length);
}

const getStudentObjectIdFromRollNo = async (rollNo) =>{
    const target = await Student.findOne({rollNo : rollNo})
    return target._id;
}

const studentExistCheck = async (rollNo) =>{
    const Student = require('./models/students')
    const student = await Student.findOne({rollNo : rollNo})
    console.log("check", student)
    if(!student)
        return false
    else 
        return true
}

const subgroupExistCheck = async (name) =>{
    const SubGroup = require('./models/subGroup')
    const subgroup = await SubGroup.findOne({name : name})
    if(!subgroup)
        return false
    else 
        return true
}

const lecturegroupExistCheck = async (name) =>{
    const LectureGroup = require('./models/lectureGroup');
    const lecturegroup = await LectureGroup.findOne({name : name})
    if(!lecturegroup)
        return false
    else 
        return true
}



module.exports = {
    lecturegroupExistCheck,
    studentExistCheck, 
    subgroupExistCheck, 
    ValidateuniqueValueArray, 
    getStudentObjectIdFromRollNo
}