const userApplication = require('../application/user');

const errorHandler = require('../util/errorHandler');

module.exports = {
  async login(message) {
    try {
      const { username, password } = message;
      const { user, token } = await userApplication.login(username, password);
      return Object.assign(message, {user, token});
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },

  async signUp(message) {
    try {
      const {username, firstName, lastName, password, email, phoneNumber, addresses} = message;
      const { user, token } =
        await userApplication.signUp(username, firstName, lastName, password, email, phoneNumber, addresses);
      return Object.assign(message, {user, token});
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  }
};

