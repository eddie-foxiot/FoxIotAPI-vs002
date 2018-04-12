const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Company = require('../models/company');

//register
router.post('/register/company', (req, res, next) => {
    let newCompany = new Company({
        company: req.body.company,
        CNPJ: req.body.CNPJ,
        webpage: req.body.webpage,
        telephone: req.body.telephone,
        email: req.body.email,
        employee: req.body.employee,
        JobRole: req.body.JobRole,
        AccountType: req.body.AccountType,
        password: req.body.password
    });

    Company.addCompany(newCompany, (err, company) => {
        if(err) {
            res.json({sucess: false, msg: 'Failed to Register company'});
        } else {
            res.json({sucess: true, msg: 'User registered'})
        }
    });
});

//authenticate

router.post('/authenticate/company', (req, res, next) => {
    const company = req.body.company;
    const password = req.body.password;
    

    Company.getCompanyByName(company, (err, company) => {
        if(err) {
            console.log(err);
        }
        if(!company){
            return res.json({success: false, msg:"company not found"});
        }
        Company.comparePassword(password, company.password, (err, isMatch) => {
            console.log(err);
            if(isMatch) {
                const token = jwt.sign(company.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json ({
                    success: true,
                    token: 'JNT '+token,
                    company: {
                        id: company._id,
                        company: company.company,
                        CNPJ: company.CNPJ,
                        webpage: company.webpage,
                        telephone: company.telephone,
                        email: company.email,
                        employee: company.employee,
                        JobRole: company.JobRole,
                        AccountType: company.AccountType,
                        password: company.password
                    }
                });
            } else {
                return res.json({sucess: false, msg: 'Wrong password'})
            }
        })
    })

})


//Profile
router.get('/profile/company', passport.authenticate("jwt", {session: false}, (req, res, next) => {
    res.send('PROFILE');
}));

module.exports = router