const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const indexRoute = require('./routes/indexRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoute);

mongoose.connect('mongodb+srv://DaniZeu:NtOPCucGQN8u3Epy@cluster0.w4cjk7i.mongodb.net/blogio?retryWrites=true')   // BLUR THIS LINE
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err))