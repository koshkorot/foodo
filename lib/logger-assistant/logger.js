'use strict';

const bunyan = require('bunyan');

const connectionTimeoutWatcher = require('./connectionTimeoutWatcher')

const processEnv = process.env.NODE_ENV;
const clusterName = process.env.CLUSTER_NAME;
const consoleLogLevel = process.env.CONSOLE_LOG_LEVEL;

const defaultCodeString = 'UNKNOWN_ERROR';

const loggers = {};

function isArray (input) {
  return Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
  if (input === Object(input) && Object.prototype.toString.call(input) !== '[object Array]') {
    return true;
  }
  return false;
}

function getFinalArgumentKey(key, idx) {
  if (idx === 0) {
    return key;
  } else {
    return key+idx;
  }
}

function sendDogStat(logger, type, finalArgument) {
  try {
    let service = logger.fields.name;
    let codeString = finalArgument.codeString;
    let tags = [];
    tags.push('env:' + processEnv);
    tags.push('cluster:' + clusterName);
    tags.push('service:' + service);
    tags.push('type:' + type);
    tags.push('code:' + codeString);
  } catch (error) {
    console.error(error);
  }
}

function getFinalArgument(args, originalMethod, logger) {
  try {
    let finalArgument = {};

    for (let i=0 ; i<args.length ; i++) {
      let arg = args[i];
      if (isObject(arg)) {
        let keys = Object.keys(arg);
        keys.forEach(function(key){
          let theKey = getFinalArgumentKey(key, i);
          finalArgument[theKey] = arg[key];
        });
        if (arg.message) {
          connectionTimeoutWatcher.check(arg.message, logger, originalMethod);
          let key = getFinalArgumentKey('message', i);
          finalArgument[key] =  arg.message;
        }
        if (arg.stack) {
          let key = getFinalArgumentKey('stack', i);
          finalArgument[key] = arg.stack;
        }
      } else {
        let key = getFinalArgumentKey('argument', i);
        finalArgument[key] = arg;
      }
    }

    if (!finalArgument.codeString) {
      finalArgument.codeString = defaultCodeString;
    }

    return finalArgument;
  } catch (loggerError) {
    originalMethod.call(logger, 'error in logger - getFinalArgument', loggerError);
    return args;
  }
}

function addPrivateFunctions(logger) {

  logger.tag = function (error, tag) {
    try {
      if (isArray(error.loggerTags)) {
        error.loggerTags.push(tag);
      } else {
        error.loggerTags = [tag];
      }
    } catch (loggerError) {
      logger.error('error in logger - tag', loggerError);
    }
  };

  logger.data = function (error, data) {
    try {
      if (error.data) {
        Object.assign(error.data, data);
      } else {
        error.data = data;
      }
    } catch (loggerError) {
      logger.error('error in logger - data', loggerError);
    }
  };

  logger.codeString = function (error, code) {
    try {
      error.codeString = code;
    } catch (loggerError) {
      logger.error('error in logger - codeString', loggerError);
    }
  };


  let methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
  methods.forEach(function(method){
    let originalMethod = logger[method];
    logger[method] = function () {
      let args = Array.prototype.slice.call(arguments);
      let finalArgument = getFinalArgument(args, originalMethod, logger);
      if (isArray(finalArgument)) {
        originalMethod.apply(logger, finalArgument);
      } else {
        sendDogStat(logger, method, finalArgument);
        originalMethod.call(logger, finalArgument);
      }
    };
  });
}

let loggerCreator = function (loggerConfig) {
  let config = loggerConfig;
  let name = config.loggerName;
  if ((name in loggers) === false) {
    let options = {};
    options.name = config.loggerName;

    options.serializers = {
      req: bunyan.stdSerializers.req,
      err: bunyan.stdSerializers.err
    };

    options.streams = [];
    if(config.consoleStream) {
      options.streams.push({
        level: consoleLogLevel || config.consoleLogLevel,
        stream: process.stdout
      });
    }
    if(config.fileStream) {
      options.streams.push({
        level: config.fileLogLevel,
        path: config.fileName,
        type: config.rotating? 'rotating-file' : undefined,
        period: config.rotating? config.rotatingPeriod : undefined,
        count: config.rotating? config.rotatingFileCount : undefined
      });
    }

    let logger = bunyan.createLogger(options);
    addPrivateFunctions(logger);
    loggers[name] = logger;
  }
  return loggers[name];
};

module.exports = loggerCreator;