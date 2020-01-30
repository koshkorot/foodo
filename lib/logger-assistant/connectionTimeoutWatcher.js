const pm2 = require('pm2');

const PM_ID = process.env.pm_id;

const CONNECTION_TIMEOUT_ERROR = 'Knex: Timeout acquiring a connection.';
const CONNECTION_TIMEOUT_HISTORY = new Set();
const CONNECTION_TIMEOUT_WINDOW = 30; //seconds
const CONNECTION_TIMEOUT_RESTART_DELAY = 1000; //milliseconds
let restartCommandSent = false;

const privates = {
  logConnectionTimeoutHistory: function () {
    let timestampInSeconds = Math.round(new Date().getTime() / 1000);
    CONNECTION_TIMEOUT_HISTORY.add(timestampInSeconds);
  },

  checkConnectionTimeoutError: function (logger, originalMethod) {
    let timestampInSeconds = Math.round(new Date().getTime() / 1000);
    for (let i=1; i<=CONNECTION_TIMEOUT_WINDOW; i++) {
      if (!CONNECTION_TIMEOUT_HISTORY.has(timestampInSeconds-i)) {
        return;
      }
    }
    if (restartCommandSent)
      return;
    restartCommandSent = true;
    privates.doRestartProcess(logger, originalMethod);
  },

  doRestartProcess: function (logger, originalMethod) {
    originalMethod.call(logger, 'connectionTimeoutWatcher::doRestartProcess');
    setTimeout(pm2.restart, CONNECTION_TIMEOUT_RESTART_DELAY, PM_ID);
  }
};

const functions = {
  check: function (message, logger, originalMethod) {
    if (message && message.includes(CONNECTION_TIMEOUT_ERROR)) {
      privates.logConnectionTimeoutHistory();
      privates.checkConnectionTimeoutError(logger, originalMethod);
    }
  },
};

module.exports = functions;