const userApplication = require('../application/user');
const errorHandler = require('../util/errorHandler');

module.exports = {
  async getAddress(message) {
    try {
      const { userId } = message;
      message.addresses = await userApplication.getAddress(userId);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },
};