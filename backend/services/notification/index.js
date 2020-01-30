const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const notificationHandler = require('./handler/notification');

const run = async () => {
  try {
    const looleh = await LoolehFactory.create('notification', LoolehFactory.TYPES.RMQ, loolehConfig);
    await looleh.define('notification.send', notificationHandler.send);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
