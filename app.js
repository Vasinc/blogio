require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

const User = require('./models/user');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const mongoose = require('mongoose');

const errorController = require('./controllers/errorController');

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const csrfProtection = csrf();

const store = new mongoDBSession({
    uri: MONGO_URI,
    collection: 'sessions'
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
        {
            secret: SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            store: store
        }
    )
)
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        if (!user) {
            return next();
        }
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(indexRoute);
app.use(authRoute);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error',
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
    });
})

mongoose.connect(MONGO_URI)   
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err))