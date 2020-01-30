const orderApplication = require('../application/order');

const errorHandler = require('../util/errorHandler');

module.exports = {
  async submit(message) {
    try {
      const { userId, restaurantId, items } = message;
      message.reference = await orderApplication.submit(userId, restaurantId, items);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },
};

