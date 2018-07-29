var jwt = require('jsonwebtoken'),
    config = require('./config'),
    log = require('./utils/log');

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Forbidden, No token!' });
        log.info('Forbidden ' + req.body.phone_number);
    }
    try {
        var tokenObj = jwt.verify(token, config.get('secret'));
        log.info('Access grant ' + req.body.phone_number);
    } catch ({ message }) {
        return res.status(400).json({message});
    }
    next();
}