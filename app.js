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
const   company = require('./routes/company'),
        //user = require('./routes/user'),
        routes = require('./routes/routes')
        //data_record = require('./routes/datattn')

//set folders access
app.use('/company', company);
app.use('/r', routes);
//app.use('/user', user);

//import models
const DatattnSchema = require('./models/datattn').DatattnSchema

//local settings ttn
const   client = require('./config/connections/ttn').client
const   TTN_APPLICATION_ID = require('./config/connections/ttn').TTN_APPLICATION_ID
const   TTN_DEVICE_ID = require('./config/connections/ttn').TTN_DEVICE_ID

client.on('connect', function () {
  client.subscribe(TTN_APPLICATION_ID + "/devices/" + TTN_DEVICE_ID + "/up")
  console.log("Connected of TTN");
});

client.on('message', function (topic, message) {
  // Parse JSON
  let payload_raw_obj = JSON.parse(message)
  let payload_fields = payload_raw_obj["payload_fields"];
  let app_id = payload_raw_obj["app_id"];
  let dev_id = payload_raw_obj["dev_id"];

  if(payload_fields == null){
    console.log("payload_fields null");
  } else {
    let test = require('assert');

    MongoClient.connect('mongodb://localhost:27017/foxiotdb', (err, client) => {
    // Use the admin database for the operation
    let foxdb = client.db('datattn');
    foxdb.collection('datattn').insert({
      app_id : app_id,
      dev_id: dev_id,
      counter: payload_raw_obj["counter"],
      accumulated_energy : payload_fields["accumulated_energy"],
      line_voltage_a : payload_fields["line_voltage_a"],
      line_voltage_b : payload_fields["line_voltage_b"],
      line_voltage_c : payload_fields["line_voltage_c"],
      line_current_a : payload_fields["line_current_a"],
      line_current_b : payload_fields["line_current_b"],
      line_current_c : payload_fields["line_current_c"],
      power_factor_a : payload_fields["power_factor_a"],
      power_factor_b : payload_fields["power_factor_b"],
      power_factor_c : payload_fields["power_factor_c"],
      frequency :  payload_fields["frequency"],
      day : ((new Date()).getDay()),
      month : (new Date()).getMonth()+1,
      year : (new Date()).getFullYear()
    });

      // Close the DB
      client.close();
    })
  }
})

//

app.post('/recording/ttn', (req, res) => {
  res.send(data_record);
});

//mongoose connect
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('connected to database'+ config.database)
});
mongoose.connection.on('error', (err) => {
    console.log('database error '+ err)
});

//set Static Folders
app.use(express.static(path.join(__dirname,'public')))

//set app bodyparcer
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

//set app passport
app.use(passport.initialize())
app.use(passport.session());
require("./config/passport")(passport);

//set cors
app.use(cors());

//use app.use to static folders always be used
app.use("/img",express.static(__dirname + "/public/images"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/lib", express.static(__dirname + "/assets/js/lib"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('login')
});

export default app;