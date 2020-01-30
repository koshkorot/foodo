const config = require('../config');

const loggerConfig = config.get('logger');
const logger = require('logger-assistant')(loggerConfig);

module.exports = logger;
