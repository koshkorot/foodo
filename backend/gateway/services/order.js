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

  async getOrder(userId, reference) {
    const looleh = LoolehFactory.get();
    const data = {
      userId, reference,
    };
    const {error, order} = await looleh.call('order.getByReference', data);
    if (error) {
      throw error;
    }
    return order;
  },

  async cancelOrder(userId, reference) {
    const looleh = LoolehFactory.get();
    const data = {
      userId, reference,
    };
    const {error} = await looleh.call('order.cancel', data);
    if (error) {
      throw error;
    }
  }
};