///////////////////////
/// __dir: /routes/register.js

var pool        = require('./../utils/mysql'),
    log         = require('./../utils/log'),
    config      = require('./../config'),
    jwt         = require('jsonwebtoken'),
    mysql       = require('mysql');

module.exports = function(request, response) {
    let name            = request.body.name,
        birthdate       = request.body.birthdate,
        phone_number    = request.body.phone_number,
        gender          = request.body.gender,
        device_id       = request.body.device_id,
        avatar          = request.body.photo;

    if (!name || !birthdate || !phone_number || !gender || !device_id) {
        response.status(403).json({
            status: 'Forbidden',
            message: 'Not all fields exist'
        });
        return;
    }

    pool.query("INSERT INTO Profile (`name`, `birthdate`, `phone_number`, `gender`, `device_id`) " +
        "VALUES (" + 
        mysql.escape(name) + ", " + mysql.escape(birthdate) + ", " + 
        mysql.escape(phone_number) + ", " + 
        mysql.escape(gender) + ", " + mysql.escape(device_id) + ");\n" + "INSERT "
        + "INTO Profile_photo (user_id, avatar) VALUES (LAST_INSERT_ID(), ?);", mysql.escape(avatar), 
        function (err, result, fields) {
            if (err) {
                log.error(phone_number + ' ' + err);
                response.status(403).json({
                    status: 'Forbidden',
                    message: 'User exists'
                });
            }
            else {
                log.info(phone_number + result);
                response.status(200).json({
                    status: 'Success',
                    token: jwt.sign({ _id: phone_number}, config.get('secret'))
                });
            }
        });
}
