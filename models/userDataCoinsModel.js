const mongoose = require('mongoose');
const User = require('./userModel');

const statsSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now,      
    } ,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Prescription must belong to an User']
    } ,
    stats:{
        type:Object,
        required:[true, 'Each user must have data-coins']
    },
})

const DataCoins = mongoose.model('DataCoins',statsSchema)

module.exports = DataCoins