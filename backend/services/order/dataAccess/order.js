const orders = [];

module.exports = {
  async insert(order) {
    order.id = Math.floor(Math.random() * 100000000);
    orders.push(order);
    return order.id;
  },
};