const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN} = require('../config/jwt');
const logger = require('../util/logger');

function resolveError(error) {
  let code;
  if (error.name === 'TokenExpiredError') {
    code = 'EXPIRED_TOKEN';
  } else {
    code = error.codeString || 'INVALID_TOKEN';
  }
  return {code};
}

module.exports = {
  jwtParser: async (req, res, next) => {
    const token = req.headers['x-authorization'];
    if (token) {
      try {
        res.locals.decodedToken = jwt.verify(token, ACCESS_TOKEN.secretKey, ACCESS_TOKEN.verifyOptions);
        req.user = res.locals.decodedToken && res.locals.decodedToken.user;
        next();
      } catch (error) {
        const {code} = resolveError(error);
        res.status(403).json({
          result: 'ERR',
          data: {
            code,
          },
        });
        logger.codeString(error, code);
        logger.error(error);
      }
    } else {
      next();
    }
  },
};
