const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const creditHandler = require('./handler/credit');

const run = async () => {
  try {
    const looleh = await LoolehFactory.create('wallet', LoolehFactory.TYPES.RMQ, loolehConfig);
    await looleh.define('wallet.balance.get', creditHandler.getBalance);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
