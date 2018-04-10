const express = require('express');
const router = express.Router();

router.get('/data', (req, res, next) => {
    res.render('data_reading');
});

router.get('/error', (req, res, next) => {
    res.render('error');
});

router.get('/home', (req, res, next) => {
    res.render('home');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/setting', (req, res, next) => {
    res.render('settings');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.get('/contact', (req, res, next) => {
    res.render('contact');
});

module.exports = router;
