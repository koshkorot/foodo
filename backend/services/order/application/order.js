const orderDataAccess = require('../dataAccess/order');
const notificationService = require('../services/notification');
const validator = require('validator');

module.exports = {
  async submit(userId, restaurantId, items) {
    validator.notNullOrEmpty(userId);
    validator.notNullOrEmpty(restaurantId);
    const menuItems =

    const order = {
      userId,
      restaurantId,
      payed: false,
      items,
      price,
      createdAt: new Date(),
    };
    const reference = await orderDataAccess.insert(order);
    notificationService.sendNotification(userId, `خرید شما با شماره پیگیری ${reference} ثبت شد.`);
    return reference;
  }
};
