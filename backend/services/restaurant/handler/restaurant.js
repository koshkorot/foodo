const restaurantApplication = require('../application/restaurant');

const errorHandler = require('../util/errorHandler');

module.exports = {
  async searchRestaurant(message) {
    try {
      const { query } = message;
      message.restaurants = await restaurantApplication.getByQuery(query);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },

  async getMenu(message) {
    try {
      const { restaurantId } = message;
      message.menu = await restaurantApplication.getMenu(restaurantId);
      return message;
    } catch (error) {
      return errorHandler.handleError(error, message);
    }
  },
};

