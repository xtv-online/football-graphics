'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/html/index.html'));
});

router.use(express.static(path.resolve(__dirname, '../../public/')));

module.exports = router;
