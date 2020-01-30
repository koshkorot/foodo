const convict = require('convict');
const fs = require('fs');

convict.addFormat({
  name: 'log-streams',
  validate(streams, schema) {
    if (!Array.isArray(streams)) {
      throw new Error('must be of type Array');
    }
    for (const stream of streams) {
      convict(schema.stream).load(stream).validate();
    }
  },
  coerce(value) {
    return JSON.parse(value);
  }
});

module.exports = (schema, configDirName) => {
  const config = convict(schema);
  const configEnvironment = config.get('env');
  const configFilePath = `${configDirName}/${configEnvironment.toLowerCase()}.js`;
  fs.accessSync(configFilePath, fs.F_OK);

  const configObject = require(configFilePath);
  config.load(configObject);
  config.validate();

  return config;
};

module.exports.types = require('./types');