const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
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