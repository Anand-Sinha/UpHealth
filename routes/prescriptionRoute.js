const express = require('express')
const authController = require('../controller/authController')
const prescriptionController = require('../controller/prescriptionController');

const router = express.Router();

router.get('/my-prescriptions',authController.protect,prescriptionController.myPrescriptions)
router.get('/my-dataunion-stats',authController.protect, prescriptionController.myDataUnionStats)
router.post('/upload-file',authController.protect, prescriptionController.uploadPrescription,prescriptionController.uploadFile)

module.exports = router