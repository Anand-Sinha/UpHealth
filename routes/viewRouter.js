const express = require('express');
const viewController = require('../controller/viewController')

const router = express.Router();

router.get('/',viewController.renderHomePage)
router.get('/login',viewController.renderLoginPage)
router.get('/signup',viewController.renderSignupPage)
router.get('/upload',viewController.renderUploadPage)
router.get('/track',viewController.renderTrackPage)
router.get('/TC',viewController.renderTCPage)
module.exports = router;
