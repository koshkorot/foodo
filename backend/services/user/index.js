const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const authenticationHandler = require('./handler/authentication');

const run = async () => {
  try {
    const looleh = await LoolehFactory.create('user', LoolehFactory.TYPES.RMQ, loolehConfig);
    await looleh.define('user.login', authenticationHandler.login);
    await looleh.define('user.signUp', authenticationHandler.signUp);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
