/////////////////////////
/// __dir: /routes/index.js

var login       = require('./login'),
    register    = require('./register'),
    middleware  = require('./../middleware');

module.exports = function(app) {
    // Login
    app.post('/api/login', function (req, res) {
        login(req, res);
    });
    // Register
    app.post('/api/register', function (req, res) {
        register(req, res);
    });
};