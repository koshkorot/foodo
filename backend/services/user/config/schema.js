const { types } = require('config-manager');

const possibleEnvironments = ['production', 'development', 'test', 'PRODUCTION', 'DEVELOPMENT', 'TEST'];
module.exports = {
  logger: {
    loggerName: types.String('Server loggerName', 'SERVER'),
    consoleStream: types.Boolean('consoleStream', true, 'CONSOLE_STREAM'),
    consoleLogLevel: types.String('The application consoleLogLevel', 'error', 'CONSOLE_LOG_LEVEL'),
    fileStream: types.Boolean('fileStream', false, 'FILE_STREAM'),
    fileLogLevel: types.String('The application fileLogLevel', 'error'),
    rotating: types.Boolean('rotating', false),
    fileName: types.String('logger output fileName', 'test.log', 'FILE_NAME'),
  },

  log: {
    name: types.String('Server loggerName', 'SERVER', 'LOG_NAME'),
    streams: types.Stream('Log Stream', [
      { level: 'trace', pretty: true, type: 'stdout' },
    ], 'LOG_STREAMS', {
      level: types.Enum('Stream log level', ['silent', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'], 'trace'),
      pretty: types.Boolean('Stream pretty formatting', true, 'NEW_LOGGER_PRETTY'),
      type: types.Enum('Stream type', ['stdout', 'stderr', 'file', 'sentry'], 'stdout', 'NEW_LOGGER_TYPE'),
      path: types.String('File stream path (type is file)', 'logger.log', 'NEW_LOGGER_FILE_NAME'),
      dsn: types.String('Sentry stream dsn (type is sentry)', 'http://sentry'),
    }),
  },

  env: types.Schema(possibleEnvironments, 'The application environment', 'test', 'NODE_ENV'),
  clusterName: types.String('The application clusterName', 'A', 'CLUSTER_NAME'),
  serviceName: types.String('The service name used in event manager', 'SERVER', 'SERVICE'),
  namespace: types.String('The namespace used in event manager', 'eq'),
  timeout: types.Number('The timeout for events in event manager', 50000),

  rabbit:
    types.Rabbit(
      'events Rabbit',
      'localhost',
      {
        timeout: 5000,
        count: 3,
      },
      'guest',
      'guest',
      'EVENT_RABBIT',
    ),

  cache:
    types.Redis(
      'cache redis',
      'localhost',
      6379,
    ),

  clusterCache:
    types.RedisCluster(
      'cluster cache redis',
      [],
    ),

  accessManagementCache:
  types.RedisCluster(
    'access management cluster cache',
    [],
  ),

};
