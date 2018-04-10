var mqtt = require('mqtt');

var host = "eu.thethings.network";
var port = "1883";

var TTN_APPLICATION_ID = "fox_lora_meter"
var TTN_APPLICATION_ACCESS_KEY = "ttn-account-v2.RDViDzHErZlfgWGDdMNdNNme2WBVc7BPoxUXHdAr06I"
var TTN_DEVICE_ID = "meter_node_0"

var options = {
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: TTN_APPLICATION_ID,
  password: TTN_APPLICATION_ACCESS_KEY
};

const client  = mqtt.connect("mqtt://" + host + ":" + port, options);

module.exports = {
  client: client,
  TTN_APPLICATION_ID: TTN_APPLICATION_ID,
  TTN_DEVICE_ID: TTN_DEVICE_ID
};
