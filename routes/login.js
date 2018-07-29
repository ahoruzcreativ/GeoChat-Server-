//////////////////////
/// __dir: /routes/login.js

var config      = require('./../config'),
    log         = require('./../utils/log'),
    pool        = require('./../utils/mysql'),
    jwt         = require('jsonwebtoken'),
    mysql       = require('mysql');

module.exports = function(request, response) {
    let phone_number    = request.body.phone_number,
        device_id       = request.body.device_id;

    if (!phone_number || !device_id) {
        response.status(403).json({
            status: 'Forbidden',
            message: 'Not all fields exist'
        });
        return;
    }

    pool.query("SELECT DISTINCT * FROM Profile WHERE phone_number = " + mysql.escape(phone_number), 
        function (err, result, fields) {
            if (err) log.error(err);
            if (!result) {
                response.status(200).json({
                    status: 'Succeed',
                    message: 'User not found, use /api/register'
                });
                return;
            }
            if (result[0].device_id == device_id) {
                log.info('Access granted to ' + phone_number);
                response.status(200).json({
                    status: 'Succeed',
                    message: '',
                    token: jwt.sign({ _id: phone_number}, config.get('secret'))
                });
            } else {
                log.info(phone_number + ' need to be proved');
                response.status(403).json({
                    status: 'Forbidden',
                    message: 'Prove your account with sms verification'
                });
            }
        });
}