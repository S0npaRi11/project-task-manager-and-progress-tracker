if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

const app = express();

//connecting to the server

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const db = mongoose.connection

db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to the database'));

// all the app.use() here

app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname + '/public')));


//all routes here
app.use('/', require('./routes/index.js'));
app.use('/add', require('./routes/add.js'));
app.use('/delete', require('./routes/delete.js'));
app.use('/specific', require('./routes/specific.js'));
app.use('/complete', require('./routes/complete.js'));



app.listen(process.env.PORT || 3000);