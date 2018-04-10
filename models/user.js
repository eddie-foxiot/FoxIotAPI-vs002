import bcrypt from 'bcryptjs';

const mongoose = require ('mongoose');
const config = require('../config/database');

//user Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    AccountType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.compareUserPassword = function(condidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) console.log(err);
        callback(null, isMatch);
    }) ;
}

