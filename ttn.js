//https://github.com/mqttjs/MQTT.js
//https://www.thethingsnetwork.org/docs/applications/mqtt/api.html
var mqtt = require('mqtt')

var host = "eu.thethings.network"
var port = "1883"

var TTN_APPLICATION_ID = "fox_lora_meter"
var TTN_APPLICATION_ACCESS_KEY = "ttn-account-v2.RDViDzHErZlfgWGDdMNdNNme2WBVc7BPoxUXHdAr06I"
var TTN_DEVICE_ID = "meter_node_0"

var options = {
  keepalive: 60,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: TTN_APPLICATION_ID,
  password: TTN_APPLICATION_ACCESS_KEY,
}

var client  = mqtt.connect("mqtt://" + host + ":" + port, options);

client.on('connect', function () {
  client.subscribe(TTN_APPLICATION_ID + "/devices/" + TTN_DEVICE_ID + "/up");
  console.log("Connected of TTN");
  //client.publish('presence', 'Hello mqtt')
});

client.on('message', function (topic, message) {
  
  // Parse JSON
  let payload_raw_obj = JSON.parse(message);
  let payload_fields = payload_raw_obj["payload_fields"];

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
  console.log("")
  //client.end()
});

//https://jsoneditoronline.org
/*
{
  "app_id": "fox_lora_meter",
  "dev_id": "meter_node_0",
  "hardware_serial": "4050602030\r\n405061",
  "port": 1,
  "counter": 1659,
  "is_retry": true,
  "payload_raw": "VFZUw1RkDCAKUQRDA\r\nGIAYgBfF3AXAAAAAAAABns=",
  "payload_fields": {
    "accumulated_energy": "0.000",
    "bytes": 29,
    "cn_frame": "1659",
    "frequency": "60.00",
    "line_current_a": "31.04",
    "line_current_\r\nb": "26.41",
    "line_current_c": "10.91",
    "line_voltage_a": "215.90",
    "line_voltage_b": "\r\n216.99",
    "line_voltage_c": "216.04",
    "power_factor_a": "0.98",
    "power_factor_b": "0.98\r\n",
    "power_factor_c": "0.95",
    "temperature": "23"
  },
  "metadata": {
    "time": "2018-04-03T14:\r\n43:34.485607476Z",
    "frequency": 916.8,
    "modulation": "LORA",
    "data_rate": "SF10BW125",
    "airtime": 534528000,
    "coding_rate": "4/5",
    "gateways": [
      {
        "gtw_id": "eui-5ccf7fffff817\r\n80d",
        "timestamp": 3672991492,
        "time": "2018-04-03T12:43:33Z",
        "channel": 0,
        "rssi": -54,
        "snr": 9,
        "rf_chain": 0,
        "latitude": -29.72424,
        "longitude": -53.71324,
        "altitude": 116
      },
      {
        "gtw_id": "eui-b827ebfffe290d18",
        "timestamp": 1914061116,
        "time": "2018-04-03T14:4\r\n3:34.37297Z",
        "channel": 0,
        "rssi": -112,
        "snr": 2,
        "rf_chain": 0,
        "latitude": -29.72074,
        "\r\nlongitude": -53.71473,
        "altitude": 116
      }
    ]
  }
}
*/