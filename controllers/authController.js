const crypto = require('crypto');

const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');


exports.getLoginPage = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }

    if (req.session.isLoggedIn) {
        return res.redirect('/')
    } else {
        res.render('index_page/login', {
            pageTitle: 'Login',
            errorMessage: message,
            oldInput: {username:'', password: ''}
        })
    }
    }

exports.getSignUpPage = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    if (req.session.isLoggedIn) {
        return res.redirect('/')
    } else {
        res.render('index_page/signup', {
            pageTitle: 'Sign-up',
            errorMessage: message,
            oldInput: {username: '', email: '', password: '', confirmPassword: ''},
            validationErrors: []
        })
    }
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).render('index_page/login', {
            pageTitle: 'Login',
            errorMessage: 'Username or password is wrong!',
            oldInput: {username: username, password: password}
        })
    }

    User.findOne({username: username})
    .then(user => {
        if (!user) {
            return res.status(422).render('index_page/login', {
                pageTitle: 'Login',
                errorMessage: 'Username or password is wrong!',
                oldInput: {username: username, password: password}
            })
        }
        
        bcrypt.compare(password, user.password)
        .then(isMatching => {
            if (isMatching) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/')
                })
            }
            return res.status(422).render('index_page/signup', {
                pageTitle: 'Login',
                errorMessage: 'Username or password is wrong!',
                oldInput: {username: username, password: password}
            });
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/login')
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }) 

}

exports.postSignUp = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log('failed')
        return res.status(422).render('index_page/signup', {
            pageTitle: 'Sign-up',
            errorMessage: errors.array()[0].msg,
            oldInput: {username: username, email: email, password: password, confirmPassword: confirmPassword},
            validationErrors: errors.array()
        })
    }

    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword
        })
        return user.save();
    })
    .then(result => {
        return res.redirect('/login')
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}