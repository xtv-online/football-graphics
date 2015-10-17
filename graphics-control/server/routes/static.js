'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/html/index.html'));
});

router.get('/settings/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/html/settings.html'));
});

router.get('/manual-control/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/html/manual-control.html'));
});

router.get('/stats/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/html/stats.html'));
});


router.use(express.static(path.resolve(__dirname, '../../public/')));

module.exports = router;
