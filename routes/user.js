const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/users');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        "name": req.body.name,
        "username": req.body.username,
        "email": req.body.email,
        "AccountType": req.body.AccountType,
        "password": req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({sucess: false, msg: 'Failed to Register company'});
        } else {
            res.json({sucess: true, msg: 'User registered'})
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = require.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg: 'User not found'})
        }

        User.camparePassWord(password, user.passport, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 6048000 //1 week
                });

                res.json({
                    success: true,
                    token: 'Jwt '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        AccountType: user.AccountType,
                        password: password.password
                    }
                });
            }
        });
    })
})