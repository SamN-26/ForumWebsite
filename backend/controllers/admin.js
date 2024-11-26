const env = require('dotenv/config')
const Admin = require('../models/admin')
const AuthService = require('../service/auth')

const handleAdminLogin = async (req, res) =>{
    // console.log(req.body)
    const admin = await Admin.findOne({id : req.body.id})
    if(!req.body.password == process.env.password || !admin)
        return res.redirect('/login/admin')
    else 
        res.cookie('token', AuthService.setUser({
            id : req.body.id,
            admin : 1,
        }))
    return res.redirect('/admin')
}



module.exports = {
    handleAdminLogin
}