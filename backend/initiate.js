const LectureGroup = require('./models/lectureGroup')
const Student = require('./models/students')
const Subgroup = require('./models/subGroup')

const lecturegroups = [
    {
        id : 1,
        subgroup : ["CO1", "CO2", "CO3", "CO4", "CO5"],
        name : "CO1-CO5",
        branch : "Computer Engineering",
    },
    {
        id : 6,
        subgroup : ["CO6", "CO7", "CO8", "CO9", "CO10"],
        name : "CO6-CO10",
        branch : "Copmuter Engineering",
    }
]

const studentsCO1 = [
    {
        "name": "John Doe",
        "rollNo": "102203001",
        "email": "john.doe@example.com",
        "password": "password123",
        "subgroup": "CO1",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Jane Smith",
        "rollNo": "102203002",
        "email": "jane.smith@example.com",
        "password": "password123",
        "subgroup": "CO1",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Alice Johnson",
        "rollNo": "102203003",
        "email": "alice.johnson@example.com",
        "password": "password123",
        "subgroup": "CO1",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Bob Brown",
        "rollNo": "102203004",
        "email": "bob.brown@example.com",
        "password": "password123",
        "subgroup": "CO2",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Charlie Green",
        "rollNo": "102203005",
        "email": "charlie.green@example.com",
        "password": "password123",
        "subgroup": "CO2",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Diana White",
        "rollNo": "102203006",
        "email": "diana.white@example.com",
        "password": "password123",
        "subgroup": "CO2",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Evan Black",
        "rollNo": "102203007",
        "email": "evan.black@example.com",
        "password": "password123",
        "subgroup": "CO3",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Fiona Blue",
        "rollNo": "102203008",
        "email": "fiona.blue@example.com",
        "password": "password123",
        "subgroup": "CO3",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "George White",
        "rollNo": "102203009",
        "email": "george.white@example.com",
        "password": "password123",
        "subgroup": "CO3",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Hannah Violet",
        "rollNo": "102203010",
        "email": "hannah.violet@example.com",
        "password": "password123",
        "subgroup": "CO4",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Ian Gray",
        "rollNo": "102203011",
        "email": "ian.gray@example.com",
        "password": "password123",
        "subgroup": "CO4",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Jack Black",
        "rollNo": "102203012",
        "email": "jack.black@example.com",
        "password": "password123",
        "subgroup": "CO4",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Karen Yellow",
        "rollNo": "102203013",
        "email": "karen.yellow@example.com",
        "password": "password123",
        "subgroup": "CO5",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Liam Gold",
        "rollNo": "102203014",
        "email": "liam.gold@example.com",
        "password": "password123",
        "subgroup": "CO5",
        "lecturegroup": "CO1-CO5"
    },
    {
        "name": "Mia Red",
        "rollNo": "102203015",
        "email": "mia.red@example.com",
        "password": "password123",
        "subgroup": "CO5",
        "lecturegroup": "CO1-CO5"
    }
]

const studentsCO6 = [
    {
        "name": "Noah Brown",
        "rollNo": "102203016",
        "email": "noah.brown@example.com",
        "password": "password123",
        "subgroup": "CO6",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Olivia Green",
        "rollNo": "102203017",
        "email": "olivia.green@example.com",
        "password": "password123",
        "subgroup": "CO6",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Emma Blue",
        "rollNo": "102203018",
        "email": "emma.blue@example.com",
        "password": "password123",
        "subgroup": "CO6",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Liam White",
        "rollNo": "102203019",
        "email": "liam.white@example.com",
        "password": "password123",
        "subgroup": "CO7",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Sophia Violet",
        "rollNo": "102203020",
        "email": "sophia.violet@example.com",
        "password": "password123",
        "subgroup": "CO7",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "William Gray",
        "rollNo": "102203021",
        "email": "william.gray@example.com",
        "password": "password123",
        "subgroup": "CO7",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Ethan Black",
        "rollNo": "102203022",
        "email": "ethan.black@example.com",
        "password": "password123",
        "subgroup": "CO8",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Ava Yellow",
        "rollNo": "102203023",
        "email": "ava.yellow@example.com",
        "password": "password123",
        "subgroup": "CO8",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Isabella Red",
        "rollNo": "102203024",
        "email": "isabella.red@example.com",
        "password": "password123",
        "subgroup": "CO8",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "James Gold",
        "rollNo": "102203025",
        "email": "james.gold@example.com",
        "password": "password123",
        "subgroup": "CO9",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Charlotte Silver",
        "rollNo": "102203026",
        "email": "charlotte.silver@example.com",
        "password": "password123",
        "subgroup": "CO9",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Benjamin Orange",
        "rollNo": "102203027",
        "email": "benjamin.orange@example.com",
        "password": "password123",
        "subgroup": "CO9",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Amelia Pink",
        "rollNo": "102203028",
        "email": "amelia.pink@example.com",
        "password": "password123",
        "subgroup": "CO10",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Mason Purple",
        "rollNo": "102203029",
        "email": "mason.purple@example.com",
        "password": "password123",
        "subgroup": "CO10",
        "lecturegroup": "CO6-CO10"
    },
    {
        "name": "Harper Brown",
        "rollNo": "102203030",
        "email": "harper.brown@example.com",
        "password": "password123",
        "subgroup": "CO10",
        "lecturegroup": "CO6-CO10"
    }
]

const subgroups = [
    {
        "name": "CO1",
        "students": ["102203001", "102203002", "102203003"],
        "gr": "102203001"
    },
    {
        "name": "CO2",
        "students": ["102203004", "102203005", "102203006"],
        "gr": "102203004"
    },
    {
        "name": "CO3",
        "students": ["102203007", "102203008", "102203009"],
        "gr": "102203007"
    },
    {
        "name": "CO4",
        "students": ["102203010", "102203011", "102203012"],
        "gr": "102203010"
    },
    {
        "name": "CO5",
        "students": ["102203013", "102203014", "102203015"],
        "gr": "102203013"
    },
    {
        "name": "CO6",
        "students": ["102203016", "102203017", "102203018"],
        "gr": "102203016"
    },
    {
        "name": "CO7",
        "students": ["102203019", "102203020", "102203021"],
        "gr": "102203019"
    },
    {
        "name": "CO8",
        "students": ["102203022", "102203023", "102203024"],
        "gr": "102203022"
    },
    {
        "name": "CO9",
        "students": ["102203025", "102203026", "102203027"],
        "gr": "102203025"
    },
    {
        "name": "CO10",
        "students": ["102203028", "102203029", "102203030"],
        "gr": "102203028"
    }
]


const initiateStudent = (req, res) =>{
    Student.insertMany(studentsCO6)
    .then( () =>{
        console.log('Inserted')
    })
    .catch((err) =>{
        console.log("Error", err)
    })
    return res.json({status : 1})
}

const initiateSubgroup = (req, res) =>{
    Subgroup.insertMany(subgroups)
    .then( () =>{
        console.log('Inserted')
    })
    .catch((err) =>{
        console.log("Error", err)
    })
    return res.json({status : 1})
}

const initiateLecture = (req, res) =>{
    LectureGroup.insertMany(lecturegroups)
    .then( () =>{
        console.log('Inserted')
    })
    .catch((err) =>{
        console.log("Error", err)
    })
    return res.json({status : 1})
}

module.exports = {initiateLecture, initiateStudent, initiateSubgroup}


