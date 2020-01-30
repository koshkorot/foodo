const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const restaurantHandler = require('./handler/restaurant');

const run = async () => {
  try {
    const looleh = await LoolehFactory.create('restaurant', LoolehFactory.TYPES.RMQ, loolehConfig);
    await looleh.define('restaurant.search', restaurantHandler.searchRestaurant);
    await looleh.define('restaurant.menu.get', restaurantHandler.getMenu);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
