const { LoolehFactory } = require('@tapsi/looleh');
const loolehConfig = require('./config/looleh');

const authenticationHandler = require('./handler/authentication');
const proflieHandler = require('./handler/profile');

// QUALITY_ATTRIBUTES Modifiability Increase Cohesion
// All task related to user should be owned by this service
// Ex. Authentication, SignUp, Block, etc.
const run = async () => {
  try {
    const looleh = await LoolehFactory.create('user', LoolehFactory.TYPES.RMQ, loolehConfig);
    // QUALITY_ATTRIBUTES Interoperability locate tactic
    // QUALITY_ATTRIBUTES Modifiability Publish-subscribe
    await looleh.define('user.login', authenticationHandler.login);
    await looleh.define('user.signUp', authenticationHandler.signUp);
    await looleh.define('user.address.get', proflieHandler.getAddress);
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();
