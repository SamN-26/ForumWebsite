const express = require('express')

const router = express.Router()

router.route('/')
.get((req, res) =>{
    return res.render('adminportal/home.ejs')
})

router.route('/logout')
.get( (req, res) =>{
    res.clearCookie('token')
    return res.redirect('/login/admin')
})

router.route('/update-student')
.get( (req, res) =>{
    return res.render('adminportal/updateStudent.ejs')
})

// router.route('/update-student-detials')
// .get( (req, res) =>{
//     console.log('Helo')
//     return res.json({status : 1})
// })

router.route('/update-gr')
.get( (req, res) =>{
    return res.render('adminportal/updateGrDetails.ejs')
})

router.route('/update-cr')
.get( (req, res) =>{
    return res.render('adminportal/updateCrDetails.ejs')
})

module.exports = router