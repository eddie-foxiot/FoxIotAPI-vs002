const mongoose = require ('mongoose');
const config = require('../config/database');

const DatattnSchema = mongoose.Schema({
    app_id: {
        type: String,
        required: true
    },
    device:{
        type: String,
        required: true
    },
    accumulated_energy: {
        type: Number,
        required: true
    },
    counter: {
        type: Number,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    line_current_a: {
        type: Number,
        required: true
    },
    line_current_b:{
        type: Number,
        required: true
    },
    line_current_c: {
        type: Number,
        required: true
    },
    line_voltage_a:{
        type: Number,
        required: true
    },
    line_voltage_b: {
        type: Number,
        required: true
    },
    line_voltage_c: {
        type: Number,
        required: true
    },
    power_factor_a: {
        type: Number,
        required: true
    },
    power_factor_b:{
        type: Number,
        required: true
    },
    power_factor_c: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
});

const DataPaper = module.exports = mongoose.model('DataPaper', DatattnSchema);

module.exports = DatattnSchema;

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByAppID = function(id, callback){
    const query = {app_id: AppId};
    DataPaper.findOne(query, callback);
};

module.exports.getUserBydevice = function(id, callback){
    const query = {device: device};
    DataPaper.findOne(query, callback);
};

module.exports.getUserByday = function(id, callback){
    const query = {day: day};
    DataPaper.findOne(query, callback);
};

module.exports.getUserBydevice = function(id, callback){
    const query = {month: month};
    DataPaper.findOne(query, callback);
};

module.exports.getUserBydevice = function(id, callback){
    const query = {year: year};
    DataPaper.findOne(query, callback);
};

module.exports.addDataDevice = function(newCompany, callback){
    res.json({sucess: true, msg: 'ser function addDataDevice'});
}