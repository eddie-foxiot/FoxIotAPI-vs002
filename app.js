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
        config = require('./config/database')

//local settings
const   company = require('./routes/company'),
        routes = require('./routes/routes'),
        data_record = require('./routes/datattn')

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
  var payload_raw_obj = JSON.parse(message)
  var payload_fields = payload_raw_obj["payload_fields"]
  if(payload_fields == null){
    console.log("payload_fields null");
  } else {
  /*
  DatattnSchema.line_voltage_a = payload_fields["line_voltage_a"]
  DatattnSchema.line_voltage_b = payload_fields["line_voltage_b"]
  DatattnSchema.line_voltage_c = payload_fields["line_voltage_c"]
  DatattnSchema.line_current_a = payload_fields["line_current_a"]
  DatattnSchema.line_current_b = payload_fields["line_current_b"]
  DatattnSchema.line_current_c = payload_fields["line_current_c"]
  DatattnSchema.power_factor_a = payload_fields["power_factor_a"]
  DatattnSchema.power_factor_b = payload_fields["power_factor_b"]
  DatattnSchema.power_factor_c = payload_fields["power_factor_c"]
  DatattnSchema.frequency = payload_fields["frequency"]
  DatattnSchema.counter = payload_fields["counter"]
  */

  // message is Buffer
  console.log("*** Received uplink *** \n")
  console.log("Topic: ", topic.toString())
  console.log("")
  console.log("Tenção fase A: " + payload_fields["line_voltage_a"] + "V")
  console.log("Tenção fase B: " + payload_fields["line_voltage_b"] + "V")
  console.log("Tenção fase C: " + payload_fields["line_voltage_c"] + "V")
  console.log("Correte fase A: " + payload_fields["line_current_a"] + "A")
  console.log("Correte fase B: " + payload_fields["line_current_b"] + "A")
  console.log("Correte fase C: " + payload_fields["line_current_c"] + "A")
  console.log("FP fase A: " + payload_fields["power_factor_a"])
  console.log("FP fase B: " + payload_fields["power_factor_b"])
  console.log("FP fase C: " + payload_fields["power_factor_c"])
  console.log("Frequência: " + payload_fields["frequency"] + "Hz")
  console.log("Contador: " + payload_raw_obj["counter"])
  //console.log(payload_fields["temperature"].toString())
  console.log('');
  //client.end()

  }

  
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
app.use(passport.session())

require("./config/passport")(passport);

//set cors
app.use(cors());
//set folders access
app.use('/company', company);
app.use('/r', routes);

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