const {LoolehFactory} = require('@tapsi/looleh');

module.exports = {
  async submitOrder(userId, restaurantId, items) {
    const looleh = LoolehFactory.get();
    const data = {
      userId, restaurantId, items,
    };
    const {error, reference} = await looleh.call('order.submit', data);
    if (error) {
      throw error;
    }
    return reference;
  },
};