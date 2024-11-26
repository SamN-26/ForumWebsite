const AuthService = require('../service/auth')
const Student = require('../models/students')

function checkForAuthentication (req, res, next) {
    req.user = null;
    const token = req.cookies?.token
    if(!token)
    {
        // console.log(req.user)
        return next()
    }
    req.user =  AuthService.getUser(token)
    // console.log('get User', req.user)
    next()
}


function restrictTo(req, res, next)
{
    if(!req.user || !req.user.email)
        return res.redirect('/login')
    else 
        next()
}

function restrictToAdmin(req, res, next)
{
    // console.log("user",req.user)
    if(!req.user || !req.user.admin)
        return res.redirect('/login/admin')
    else 
        next()
}

module.exports = {
    checkForAuthentication,
    restrictTo,
    restrictToAdmin,
}
