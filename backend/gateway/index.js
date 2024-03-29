const { LoolehFactory } = require('@tapsi/looleh');
const app = require('./app');
const loolehConfig = require('./config/looleh');


app.set('port', parseInt(process.env.PORT) || 3000);
// QUALITY_ATTRIBUTES Security Encrypt Data: all APIs on HTTPS when deploy on server
// QUALITY_ATTRIBUTES Usability Separate the User Interface. In this project we implement
// UI in a separate application.
let server;
const run = async () => {
  try {
    await LoolehFactory.create('server', LoolehFactory.TYPES.RMQ, loolehConfig);
    server = app.listen(app.get('port'), () => {
      const serverPort = server.address().port;
    console.log(`Server is listening at port ${serverPort}`);
  });
  } catch (error) {
    console.log(error);
    setTimeout(() => { process.exit(1); }, 3000);
  }
};
run();

module.exports = server;
