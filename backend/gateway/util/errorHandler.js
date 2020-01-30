const logger = require('../util/logger');
const errors = require('../enum/error');

module.exports = {
  sendError(res, error) {
    const {code, message} = errors[error.codeString];
    res.status(code).json({
      result: 'ERR',
      data: {
        code: error.codeString,
        message,
      },
    });

    logger.error(error);
  },
};
