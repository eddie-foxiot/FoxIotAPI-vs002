const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../models/databese');

//user Schema
const UserSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    webpage: {
        type: String,
        required: true
    },
    employee: {
        type: String,
        required: true
    },
    JobRole: {
        type: String,
        required: true
    },
    AccountType: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(id, callback){
    const query = {username: username}
    User.findOne(query, callback);
}