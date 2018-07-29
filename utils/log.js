////////////////////////////////
/// __dir: /utils/log.js

var log = require('log4js');
log.configure({
    appenders: { 'file': {type: 'file', filename: 'logs/logfile.log'}},
    categories: { default: {appenders: ['file'], level: 'debug'}}
});

var logger = log.getLogger('logfile');

module.exports = logger;