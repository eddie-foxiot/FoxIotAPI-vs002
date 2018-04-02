import express from 'express';

//libs
const   bodyParser = require('body-parser'),
        consolidate = require('consolidate'),
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert'),
        app = express(),
        path = require('path'),
        cors = require('body-parser'),
        passport =require ('passport'),
        mongoose = require('mongoose'),
        config = require('./config/database');

//local settings
const   users = require('./routes/users'),
        routes = require('./routes/routes');

//mongoose connect
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to database'+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('database error '+ err);
});

//set Static Folders
app.use(express.static(path.join(__dirname,'public')));

//set app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use('/users', users);
app.use('/r', routes);

//use app.use to static folders always be used
app.use("/img",express.static(__dirname + "/public/images"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/lib", express.static(__dirname + "/assets/js/lib"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('login');
});
  
export default app;