const logger = require('../util/logger');

const functions = {
  handleError(error, message) {
    if (!error.codeString) {
      logger.codeString(error, 'UNKNOWN_ERROR');
    }
    message.error = {
      codeString: error.codeString,
      data: error.data,
      userPayload: error.userPayload,
      stack: error.stack,
    };
    logger.error(error);
    return message;
  },
};

module.exports = functions;
