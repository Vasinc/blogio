exports.getLoginPage = (req, res, next) => {
    res.render('index_page/login', {
        pageTitle: 'Login'
    })
}

exports.getSignUpPage = (req, res, next) => {
    res.render('index_page/signup', {
        pageTitle: 'Sign-up'
    })
}