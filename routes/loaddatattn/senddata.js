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
    let data_record = JSON.stringify({
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
    console.log(data_record);
  }
});
