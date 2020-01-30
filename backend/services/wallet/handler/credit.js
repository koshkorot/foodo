const creditApplication = require('../application/credit');

const errorHandler = require('../util/errorHandler');

module.exports = {
  async getBalance(message) {
    try {
      const { userId } = message;
      message.balance = await creditApplication.getBalance(userId);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },
};

