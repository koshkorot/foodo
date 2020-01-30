const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async searchRestaurant(query) {
    const looleh = LoolehFactory.get();
    const data = {
      query,
    };
    const {error, restaurants} = await looleh.call('restaurant.search', data);
    if (error) {
      throw error;
    }
    return restaurants;
  },

  async getMenu(restaurantId) {
    const looleh = LoolehFactory.get();
    const data = {
      restaurantId,
    };
    const {error, menu} = await looleh.call('restaurant.menu.get', data);
    if (error) {
      throw error;
    }
    return menu;
  },
};

