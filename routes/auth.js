const express = require('express');

const User = require('../models/user');

const { check, body } = require('express-validator'); 

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLoginPage);

router.get('/sign-up', authController.getSignUpPage);

router.post('/login', [
                        body('username', `The username or the password doesn't exist!`)
                        .isLength({min: 5})
                        .isAlphanumeric()
                        .trim(),

                        body('password', `The username or the password doesn't exist!`)
                        .isLength({min: 8})
                        .isAlphanumeric()
                        .trim()
                      ], authController.postLogin);

router.post('/sign-up', [
                            body('username', 'Please enter an username that has at least 5 characters and uses only letters and numbers!')
                            .isLength({min: 5})
                            .isAlphanumeric()
                            .withMessage('Please enter an username that has at least 5 characters and uses only letters and numbers!')
                            .custom( (value, {req}) => {
                                return User.findOne({ username: { $regex: new RegExp('^' + value + '$', 'i') } })
                                .then(userDoc => {
                                    if (userDoc) {
                                        return Promise.reject('Username already exists!')
                                    }
                                })
                            })
                            .trim(),                   

                            check('email')
                            .isEmail()
                            .withMessage('Please enter a valid email!')
                            .custom( (value, {req}) => {
                                return User.findOne({email: value.toLowerCase()})
                                .then(userDoc => {
                                    if (userDoc) {
                                        return Promise.reject('Email already exists!')
                                    }
                                })
                            }),

                            body('password', 'Please enter a password that has at least 8 characters and uses only letters and numbers!')
                            .isLength({min: 8})
                            .isAlphanumeric()
                            .trim(),

                            body('confirmPassword')
                            .custom( (value, {req}) => {
                                if (value !== req.body.password) {
                                    throw new Error(`The passwords don't match!`)
                                }
                                return true;
                            })
                            .trim()
                        ], authController.postSignUp);

router.post('/logout', authController.postLogout)

module.exports = router;