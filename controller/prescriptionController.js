const multer = require('multer')
const StreamrClient = require('streamr-client');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Prescription = require('../models/prescriptionModel');
const DataCoins = require('../models/userDataCoinsModel');


const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'public');
    },
    filename: (req,file,cb)=>{
        const ext = file.mimetype.split('/')[1]
        cb(null, `prescriptions/user-${file.fieldname}-${Date.now()}.${ext}`)
    }
})

// const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if (file.mimetype.startsWith('application')){
        cb(null, true)
    } else{
        cb(new AppError('Not a file! Please upload a File',400),false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter:multerFilter
})

exports.uploadPrescription = upload.single('myFile')


exports.uploadFile = catchAsync(async (req,res,next)=>{
    console.log(req.body)

    const prescription = await Prescription.create({
        user:req.user._id,
        name:req.body.name,
        path:req.file.filename,
        description:req.body.description
    })
    const prescriptionWallet = StreamrClient.generateEthereumAccount()
        console.log(prescriptionWallet)

    const streamr = new StreamrClient({
        auth:{
            privateKey: prescriptionWallet.privateKey
        },
        url: 'wss://hack.streamr.network/api/v1/ws',
        restUrl: 'https://hack.streamr.network/api/v1',        
    })
    console.log(streamr)

    streamr.joinDataUnion(process.env.DU_CONTRACT, process.env.SHARED_SECRET)
    .then((memberDetails)=>{
        console.log(memberDetails)

        streamr.getMemberStats(process.env.DU_CONTRACT, prescriptionWallet.address)
            .then((stats) => {
                console.log(stats);
                uploadDataCoinsStats(req.user._id,stats)
            })
            .catch((err) => {
                console.log(err.message);
            })
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(()=>{
        streamr.publish(process.env.STREAM_ID_PRESCRIPTIONS, { 
            patientPrescription:prescription
        })
        console.log("Data Published");
    })
    console.log(prescription)

    res.redirect('/upload')
    
})

const uploadDataCoinsStats = catchAsync(async(userID, stats)=>{
    const dataCoinStats = await DataCoins.findOneAndUpdate(userID,stats)
})

exports.myPrescriptions = catchAsync(async(req,res,next)=>{
    const user = req.user
    const prescriptions = await Prescription.find({user})

    res.status(200).json({
        status:'success',
        data:prescriptions
    })
})

exports.myDataUnionStats = catchAsync(async(req,res,next)=>{
    const user = req.user
    const myStats = await DataCoins.find({user})

    res.status(200).json({
        status:'success',
        data:myStats
    })
})