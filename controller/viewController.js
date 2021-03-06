const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const StreamrClient = require('streamr-client')

exports.renderHomePage = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        res.status(200).render('home')
    } else{
        res.status(200).render('homelogout')
    }

})

exports.renderLoginPage = catchAsync(async(req,res,next)=>{
    res.status(200).render('login')
})

exports.renderSignupPage = catchAsync(async(req,res,next)=>{
    res.status(200).render('signup')
})

exports.renderUploadPage = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        res.status(200).render('login')
    } else{
        res.status(200).render('upload')
    }

})

exports.renderTrackPage = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        res.status(200).render('login')
    } else{
        res.status(200).render('track')
    }

})
exports.renderTCPage = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt){
        res.status(200).render('TC')
    } else{
        res.status(200).render('TC')
    }

})
