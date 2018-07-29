///////////////////////////////
/// __dir: /utils/mysql.js

var mysql = require('mysql'),
    config = require('../config'),
    log = require('./log');

var pool = mysql.createPool(config.get('db'));

pool.getConnection(function (err, connection) {
    log.error(err);
});

module.exports = pool;