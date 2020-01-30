const bodyParser = require('body-parser');
const jwt = require('./jwt');

const init = (app) => {
  app.use(bodyParser.json());
  app.use(jwt.jwtParser);
};

module.exports = init;
