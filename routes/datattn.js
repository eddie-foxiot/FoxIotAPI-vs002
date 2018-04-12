/** rotas de registro de data - routes for data record */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DataRecord = require('../models/datattn');

//Criate set for a new_data_record -- criando novo registro de data 
router.post('/register/data', (req, res, next) => {
    let new_data_record = new DataDevice({
        app_id: req.body.app_id,
        device: req.body.device,
        accumulated_energy: req.body.accumulated_energy,
        counter: req.body.counter,
        frequency: req.body.frequency,
        line_current_a: req.body.line_current_a,
        line_current_b: req.body.line_current_b,
        line_current_c: req.body.line_current_c,
        line_voltage_a: req.body.line_voltage_a,
        line_voltage_b: req.body.line_voltage_b,
        line_voltage_c: req.body.line_voltage_c,
        power_factor_a: req.body.power_factor_a,
        power_factor_b: req.body.power_factor_b,
        power_factor_c: req.body.power_factor_c,
        dia: req.body.day,
        mes: req.body.month,
        ano: req.body.year
    });

    //
    DataRecord.addDataDevice(new_data_record, (err, data_record) => {
        if(err) {
            res.json({sucess: false, msg: 'Failed to Register data'});
        } else {
            res.json({sucess: true, msg: 'data registered'});
        }
    });

});


module.exports = router;