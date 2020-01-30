function getSchemaModel(format, doc, defaultValue, env) {
  const schemaModel = {
    doc,
    format,
    'default': defaultValue
  };
  if (env) {
    schemaModel.env = env;
  }
  return schemaModel;
}

function getNumberModel(doc, defaultValue = 0, env) {
  return getSchemaModel(Number, doc, defaultValue, env);
}

function getStringModel(doc, defaultValue = '', env) {
  return getSchemaModel(String, doc, defaultValue, env);
}

function getBooleanModel(doc, defaultValue = false, env) {
  return getSchemaModel(Boolean, doc, defaultValue, env);
}

function getArrayModel(doc, defaultValue = [], env) {
  return getSchemaModel(Array, doc, defaultValue, env);
}

function getEnumModel(doc, possibleValues, defaultValue = '', env) {
  return getSchemaModel(possibleValues, doc, defaultValue, env);
}

function getDbConnectionConfig(docPrefix, host, user, password, database, envPrefix = 'DB') {
  return {
    host: getStringModel(`${docPrefix} host`, host, `${envPrefix}_HOST`),
    user: getStringModel(`${docPrefix} user`, user, `${envPrefix}_USER`),
    password: getStringModel(`${docPrefix} password`, password, `${envPrefix}_PASSWORD`),
    database: getStringModel(`${docPrefix} database`, database, `${envPrefix}_NAME`),
    charset: 'utf8',
  };
}


function getDbConfig(docPrefix, client, host, user, password, databaseName, acquireConnectionTimeout, poolMin, poolMax, poolRequestTimeout, queryLogger, envPrefix = 'DB') {
  return {
    client: getStringModel('Database', client),
    connection: getDbConnectionConfig(docPrefix + ' connection', host, user, password, databaseName, envPrefix),
    acquireConnectionTimeout: getNumberModel('Anonymous acquireConnectionTimeout', acquireConnectionTimeout, `${envPrefix}_ACQUIRE_CONNECTION_TIMEOUT`),
    pool: {
      min: getNumberModel('min', poolMin, `${envPrefix}_POOL_MIN`),
      max: getNumberModel('max', poolMax, `${envPrefix}_POOL_MAX`),
    },
    queryLogger: getStringModel('database query logger', queryLogger, `${envPrefix}_QUERY_LOGGER`)
  };
}

function getMongoDbConfig(docPrefix, host, port, user, password, database, charset, poolSize, envPrefix = 'MONGO') {
  return {
    host: getStringModel(`${docPrefix} mongodb host`, host, `${envPrefix}_HOST`),
    port: getNumberModel(`${docPrefix} mongodb port`, port, `${envPrefix}_PORT`),
    user: getStringModel(`${docPrefix} mongodb user`, user, `${envPrefix}_USER`),
    password: getStringModel(`${docPrefix} mongodb password`, password, `${envPrefix}_PASSWORD`),
    database: getStringModel(`${docPrefix} mongodb database`, database, `${envPrefix}_DATABASE`),
    charset: getStringModel(`${docPrefix} mongodb charset`, charset, `${envPrefix}_CHARSET`),
    poolSize: getNumberModel(`${docPrefix} mongodb poolSize`, poolSize, `${envPrefix}_POOL_SIZE`),
  };
}


function getRedisConfig(docPrefix, host, port, envPrefix = 'REDIS', isCluster = false) {
  return {
    host: getStringModel(`${docPrefix} host`, host, `${envPrefix}_HOST`),
    port: getNumberModel(`${docPrefix} port`, port, `${envPrefix}_PORT`),
    isCluster: getBooleanModel(`${docPrefix} iscluster`, isCluster, `${envPrefix}_IS_CLUSTER`)
  };
}

function getRedisClusterConfig(docPrefix, clusters, envPrefix = 'REDIS_CLUSTER') {
  return getArrayModel(`${docPrefix} config`, clusters, `${envPrefix}`);
}

function getRedisSentinelConfig(docPrefix, name, envPrefix = 'REDIS_SENTINEL') {
  return {
    name: getStringModel(`${docPrefix} name`, name, `${envPrefix}`)
  };
}

function getRabbitConfig(docPrefix, url, retry, user, password, envPrefix = 'RABBIT') {
  return {
    url: getStringModel(`${docPrefix} url`, url, `${envPrefix}_URL`),
    retry: {
      timeout: getNumberModel(`${docPrefix} rabbit events retry timeout`, retry.timeout, `${envPrefix}_RABBIT_RETRY_TIMEOUT`),
      count: getNumberModel(`${docPrefix} rabbit events retry count`, retry.count, `${envPrefix}_RABBIT_RETRY_COUNT`),
    },
    user: getStringModel(`${docPrefix} rabbit username`, user, `${envPrefix}_USER`),
    password: getStringModel(`${docPrefix} rabbit password`, password, `${envPrefix}_PASSWORD`),
  };
}


function getMinioConfig(docPrefix, endPoint, port, secure, accessKey, secretKey, publicUrl, envPrefix = 'MINIO') {
  return {
    endPoint: getStringModel(`${docPrefix} endpoint`, endPoint, `${envPrefix}_ENDPOINT`),
    port: getNumberModel(`${docPrefix} port`, port, `${envPrefix}_PORT`),
    secure: getBooleanModel(`${docPrefix} secure`, secure, `${envPrefix}_SECURE`),
    accessKey: getStringModel(`${docPrefix} accessKey`, accessKey, `${envPrefix}_ACCESS_KEY`),
    secretKey: getStringModel(`${docPrefix} secretKey`, secretKey, `${envPrefix}_SECRET_KEY`),
    publicUrl: getStringModel(`${docPrefix} publicUrl`, publicUrl, `${envPrefix}_PUBLIC_URL`),
  };
}


function getStreamConfig(docPrefix, defaultValue, env, stream) {
  const streams = getSchemaModel('log-streams', `${docPrefix} destinations`, defaultValue, env);
  streams.stream = stream;
  return streams;
}

module.exports = {
  Schema: getSchemaModel,
  String: getStringModel,
  Number: getNumberModel,
  Boolean: getBooleanModel,
  Array: getArrayModel,
  Enum: getEnumModel,
  DBConnection: getDbConnectionConfig,
  DB: getDbConfig,
  MongoDB: getMongoDbConfig,
  Redis: getRedisConfig,
  RedisCluster: getRedisClusterConfig,
  RedisSentinel: getRedisSentinelConfig,
  Rabbit: getRabbitConfig,
  Minio: getMinioConfig,
  Stream: getStreamConfig,
};
