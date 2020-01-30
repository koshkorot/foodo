const Promise = require('bluebird');
const orderDataAccess = require('../dataAccess/order');
const notificationService = require('../services/notification');
const restaurantService = require('../services/restaurant');
const userService = require('../services/user');
const validator = require('validator');

function calculatePurchasePrice(itmes) {
  return itmes.reduce((total, item) => total + (item.price * item.count), 0);
}

module.exports = {
  async submit(userId, restaurantId, items) {
    validator.notNullOrEmpty(userId);
    validator.notNullOrEmpty(restaurantId);
    // QUALITY_ATTRIBUTES Performance Parallel processing
    const [addresses, menuItems] = await Promise.all([
      userService.getAddress(userId),
      restaurantService.getMenu(restaurantId),
    ]);
    items.forEach((item) => {
      if(!menuItems.find(mi => mi.id === item.id)){
        const error = new Error();
        error.codeString = 'ITEM_NOT_FOUND';
        throw error;
      }
    });
    const price = calculatePurchasePrice(items);
    const order = {
      userId,
      restaurantId,
      payed: false,
      items,
      price,
      address: addresses[0],
      createdAt: new Date(),
    };
    const reference = await orderDataAccess.insert(order);
    notificationService.sendNotification(userId, `خرید شما با شماره پیگیری ${reference} ثبت شد.`);
    return reference;
  }
};
