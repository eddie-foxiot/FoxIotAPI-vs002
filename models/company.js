import bcrypt from 'bcryptjs';

const mongoose = require ('mongoose');
const config = require('../config/database');

//user Schema
const CompanySchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    CNPJ: {
        type: Number,
        required: true
    },
    webpage: {
        type: String,
        require: true
    },
    telephone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
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
    },
    password: {
        type: String,
        require: true
    }
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

module.exports.getUserById = function(id, callback){
    Company.findById(id, callback);
};

module.exports.getCompanyByName = function(company, callback){
    const query = {company: company}
    Company.findOne(query, callback)
};

module.exports.addCompany = function(newCompany, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
            newCompany.password = hash;
            newCompany.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){
            console.log(err);
        }
        callback(null, isMatch);
    }) ;
}