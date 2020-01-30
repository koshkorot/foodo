const { LoolehFactory } = require('@tapsi/looleh');
const app = require('./app');
const loolehConfig = require('./config/looleh');


app.set('port', parseInt(process.env.PORT) || 3000);

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
