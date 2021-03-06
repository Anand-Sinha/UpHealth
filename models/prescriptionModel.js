const mongoose = require('mongoose')
const User = require('./userModel')

const prescriptionSchema = new mongoose.Schema({
  createdAt:{
      type:Date,
      default:Date.now,      
  } ,
  user:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:[true,'Prescription must belong to an User']
  } ,
  name:{
      type:String,
      required:[true,'Uploaded file must have a name']
  },
  path:{
      type:String,
      required:[true,'Uploaded file must have a name'],
  },
  description:{
      type:String,
      required:false
  }
})

const Prescription = mongoose.model('Prescription',prescriptionSchema)

module.exports = Prescription