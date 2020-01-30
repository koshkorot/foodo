let orders = [];

module.exports = {
  async insert(order) {
    order.id = Math.floor(Math.random() * 100000000);
    orders.push(order);
    return order.id;
  },

  async fetchByReference(reference) {
    return orders.find(o => o.id === parseInt(reference));
  },

  async remove(reference) {
    orders = orders.filter(o => o.id !== parseInt(reference));
  }
};