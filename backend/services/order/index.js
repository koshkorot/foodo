const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const orderHandler = require('./handler/order');

const run = async () => {
  try {
    const looleh = await LoolehFactory.create('order', LoolehFactory.TYPES.RMQ, loolehConfig);
    await looleh.define('order.submit', orderHandler.submit);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
