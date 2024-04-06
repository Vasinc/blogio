const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLoginPage);

router.get('/sign-up', authController.getSignUpPage);

module.exports = router;