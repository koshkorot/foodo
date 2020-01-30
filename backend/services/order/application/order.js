const orderDataAccess = require('../dataAccess/order');
const notificationService = require('../services/notification');
const restaurantService = require('../services/restaurant');
const validator = require('validator');

function calculatePurchasePrice(itmes) {
  return itmes.reduce((total, item) => total + (item.price * item.count), 0);
}

module.exports = {
  async submit(userId, restaurantId, items) {
    validator.notNullOrEmpty(userId);
    validator.notNullOrEmpty(restaurantId);
    const menuItems = await restaurantService.getMenu(restaurantId);
    console.log(menuItems);
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
      createdAt: new Date(),
    };
    const reference = await orderDataAccess.insert(order);
    notificationService.sendNotification(userId, `خرید شما با شماره پیگیری ${reference} ثبت شد.`);
    return reference;
  }
};
