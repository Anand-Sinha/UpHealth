const express = require('express')

const authController = require('../controller/authController')

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post('/fitness',authController.protect, authController.addFitnessRecords);
router.get('/logout',authController.logout);

module.exports = router;