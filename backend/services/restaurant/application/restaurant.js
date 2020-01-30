const restaurantsDataAccess = require('../dataAccess/restaurant');

function menuGenerator(itemCount) {
  const menu = [];
  for (let i = 0; i < itemCount; i+=1) {
    menu.push({
      name: `غذای شماره ${i+1}`,
      price: 1000 * (i + 1),
      id: Math.floor(Math.random() * 10000000000),
    });
  }
  return menu;
}

module.exports = {
  async getByQuery(query) {
    return restaurantsDataAccess.find(query);
  },
  async getMenu(restaurantId) {
    const restaurant = await restaurantsDataAccess.getById(parseInt(restaurantId));
    return restaurant.menu || menuGenerator(restaurantId);
  }
};
