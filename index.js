////////////////////////////////////
/// __dir: /index.js

var express     = require('express')
    app         = express(),
    config      = require('./config'),
    logger      = require('./utils/log'),
    router      = require('./routes'),
    bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);
app.listen(config.get('port'), function() {
    logger.info('Server started on port ' + config.get('port'));
});