exports.get404 = (req, res , next) => {
    if(req.session.isLoggedIn) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken(),
            user: req.user
        });
    } else {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
        });
    }
};

exports.get500 = (req, res, next) => {
    if(req.session.isLoggedIn) { 
        res.status(500).render('500', {
            pageTitle: 'Error',
            isAuthentiated: req.session.isLoggedIn,
            csrfToken: req.csrfToken(),
            user: req.user
        });
    } else {
        res.status(500).render('500', {
            pageTitle: 'Error',
            isAuthentiated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
        });
    }
};